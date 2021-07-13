import { parseCookies } from '@/helpers/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes, FaArrowLeft } from 'react-icons/fa'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import { useRouter } from 'next/router'

export default function EventPage({ evt, userOwned, token }) {
	console.log(evt.reviews[0])
	const router = useRouter()

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

	return (
		<Layout title='Activity | Fun, Cookies, Games'>
			<div className={styles.container}>
				<div className={styles.added}>
					<Link href='/events'>
						<a className={`${styles.back} ${styles.icon}`}>
							<FaArrowLeft /> <span>Go Back</span>
						</a>
					</Link>

					{userOwned && (
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
								<div className={styles.per}>{per}</div>
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
					<div className={styles.inputContainer}>
						<textarea placeholder='What do you think?'></textarea>
						<div className={styles.row}>
							<div className={styles.opinion}>
								<h4>Are you going to this party?</h4>
								<span>On My Way!</span>
								<span>If I can make it.</span>
								<span>It's not for me!</span>
							</div>
							<button className='btn btn-primary'>Submit</button>
						</div>
					</div>
				</div>
				<div className={styles.reviewWrapper}>
					{evt.reviews.length === 0 ? (
						<h3>No reviews yet.</h3>
					) : (
						evt.reviews.map(review => (
							<div key={review.id} className={styles.review}>
								{userOwned && (
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
		</Layout>
	)
}

export async function getServerSideProps({ query: { slug }, req }) {
	const { token } = parseCookies(req)
	let user = null
	let userOwned = false

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
		if (user.filter(u => u.id === events[0].id).length === 1) {
			userOwned = true
		}
	}

	return {
		props: {
			evt: events[0],
			userOwned,
			token
		}
	}
}
