import { useState } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from '@/helpers/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { FaPencilAlt, FaTimes, FaArrowLeft, FaUserAlt } from 'react-icons/fa'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'

export default function EventPage({ evt, usersActivity, userId, token, name }) {
	console.log(userId)
	const [desc, setDesc] = useState('')
	const [attendance, setAttendance] = useState('maybe')

	const router = useRouter()

	//* Activity func
	const deleteEvent = async () => {
		if (confirm('Are you sure?')) {
			const res = await fetch(`${API_URL}/events/${evt.id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			const data = await res.json()

			if (!res.ok) {
				toast.error(data.message)
			} else {
				toast.success('Event deleted successsfully!')
				router.push('/events')
			}
		}
	}

	//* Opinion func
	const createReview = async () => {
		const values = {
			desc,
			attendance,
			name
		}

		const res = await fetch(`${API_URL}/reviews`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(values)
		})

		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error(' Please login first.')
				return
			}

			toast.error('Oh no! Something went wrong')
		} else {
			toast.success('Review added successfully!')
			await res.json()
			router.reload()
		}
	}

	return (
		<Layout title='Activity | Fun, Cookies, Games'>
			<div className={styles.container}>
				<div className={styles.added}>
					<Link href='/events'>
						<a className={`${styles.back} ${styles.icon}`}>
							<FaArrowLeft /> <span>Go Back</span>
						</a>
					</Link>

					{usersActivity && (
						<>
							<div className={styles.controls}>
								<Link href={`/events/edit/${evt.id}`}>
									<a className={styles.icon}>
										<FaPencilAlt /> <span>Edit</span>
									</a>
								</Link>
								<a
									href='#!'
									className={`${styles.delete} ${styles.icon}`}
									onClick={deleteEvent}
								>
									<FaTimes /> <span>Delete</span>
								</a>
							</div>
						</>
					)}
				</div>

				<ToastContainer position='top-center' draggable />

				<div className={styles.card}>
					<div className={styles.cardDetails}>
						<span className={styles.date}>
							{new Date(evt.date).toLocaleDateString('en-GB')}
						</span>
						<h1>{evt.name}</h1>
						<div className={styles.infoWrapper}>
							<div className={styles.venue}>{evt.venue}</div>
							<div className={styles.address}>{evt.address}</div>
							<div className={styles.time}>{evt.time}</div>
						</div>
						<p className={styles.desc}>{evt.description}</p>
						<div className={styles.infoWrapper}>
							{evt.performers.split(',').map(per => (
								<div key={per} className={styles.per}>
									{per}
								</div>
							))}
						</div>
					</div>

					{evt.image && (
						<div className={styles.cardImg}>
							<img src={evt.image.url} alt={evt.name} />
						</div>
					)}
				</div>
				<div className={styles.reviewContainer}>
					<h3>User Reviews</h3>
					{!token ? (
						<p>
							<Link href='/account/login'>
								<a className={`${styles.back} ${styles.icon}`}>
									<FaUserAlt /> <span>Login</span>
								</a>
							</Link>{' '}
							first in order to leave comments.
						</p>
					) : (
						<div className={styles.inputContainer}>
							<textarea
								placeholder='What do you think?'
								value={desc}
								onChange={e => setDesc(e.target.value)}
							></textarea>
							<div className={styles.row}>
								<div className={styles.opinion}>
									<h4>Are you going to this party?</h4>
									<label htmlFor='going'>
										On My Way!
										<input
											type='radio'
											name='attendance'
											id='going'
											value='going'
											onChange={e => setAttendance(e.target.value)}
										/>
									</label>
									<label htmlFor='maybe'>
										If I can make it.
										<input
											type='radio'
											name='attendance'
											id='maybe'
											value='maybe'
											checked={true === 'maybe'}
											onChange={e => setAttendance(e.target.value)}
										/>
									</label>
									<label htmlFor='no'>
										It's not for me!
										<input
											type='radio'
											name='attendance'
											id='no'
											onChange={e => setAttendance(e.target.value)}
										/>
									</label>
								</div>
								<button className='btn btn-primary'>Submit</button>
							</div>
						</div>
					)}

					<div className={styles.reviewWrapper}>
						{evt.reviews.length === 0 ? (
							<h3>No reviews yet.</h3>
						) : (
							evt.reviews.map(review => (
								<div key={review.id} className={styles.review}>
									{userId === review.id && (
										<>
											<div className={styles.controls}>
												<Link href={`/events/edit/${evt.id}`}>
													<a className={styles.icon}>
														<FaPencilAlt /> <span>Edit</span>
													</a>
												</Link>
												<a
													href='#!'
													className={`${styles.delete} ${styles.icon}`}
													onClick={deleteEvent}
												>
													<FaTimes /> <span>Delete</span>
												</a>
											</div>
										</>
									)}
									<div className={styles.opinion}>"{review.description}"</div>
									<div className={styles.name}>
										{review.name} at{' '}
										<span>
											{new Date(review.created_at).toLocaleDateString('en-GB')}
										</span>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export async function getServerSideProps({ query: { slug }, req }) {
	const { token } = parseCookies(req)
	let user = null
	let name = null
	let usersActivity = false

	if (token) {
		const lu = await fetch(`${API_URL}/events/me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		user = await lu.json()
	}

	const res = await fetch(`${API_URL}/events?slug=${slug}`)
	const events = await res.json()

	if (user) {
		name = user[0].user.username
		if (user.filter(u => u.id === events[0].user.id).filter === 1) {
			usersActivity = true
		}
	}

	return {
		props: {
			evt: events[0],
			usersActivity,
			name,
			userId: user[0].user.id,
			token
		}
	}
}
