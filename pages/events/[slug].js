import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { parseCookies } from '@/helpers/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { FaPencilAlt, FaTimes, FaArrowLeft } from 'react-icons/fa'
import { GiPartyPopper } from 'react-icons/gi'
import { MdNotInterested } from 'react-icons/md'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import EventMap from '@/components/EventMap'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Reviews from '@/components/Reviews'

export default function EventPage({ evt, usersEvent, userId, token, name }) {
	const router = useRouter()

	const [going, setGoing] = useState(null)
	const [notGoing, setNotGoing] = useState(null)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		evt.reviews.forEach(review => {
			if (review.attendance === 'going') setGoing(going + 1)

			if (review.attendance === 'no') setNotGoing(notGoing + 1)
		})
	}, [evt.reviews])

	const deleteEvent = async () => {
		if (confirm('Are you sure?')) {
			evt.reviews.forEach(async review => {
				const res = await fetch(`${API_URL}/reviews/${review.id}`, {
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				const data = await res.json()

				if (!res.ok) {
					toast.error(data.message)
					return
				}
			})

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
		<Layout title={`${evt.name} | fun, cookies, games`}>
			<div className={styles.container}>
				<div className={styles.added}>
					<Link href='/events'>
						<a className={`${styles.back} ${styles.icon}`}>
							<FaArrowLeft /> <span>Go Back</span>
						</a>
					</Link>

					{usersEvent && (
						<>
							<div className={styles.controls}>
								<Link href={`/events/edit/${evt.id}`}>
									<a className={`${styles.icon} ${styles.edit}`}>
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
						<div className={styles.attendance}>
							{going && (
								<>
									<GiPartyPopper /> <span title='Hyped for it!'>{going}</span>{' '}
								</>
							)}
							{notGoing && (
								<>
									{' '}
									<MdNotInterested />
									<span title='Not making it.'>{notGoing}</span>
								</>
							)}
						</div>

						<h1>{evt.name}</h1>
						<div
							className={styles.infoWrapper}
							onClick={() => {
								setShowModal(true)
							}}
						>
							<div className={styles.venue}>{evt.venue}</div>
							<div className={styles.address}>
								{evt.address.length > 25
									? evt.address.substring(0, 24).concat('...')
									: evt.address}
							</div>
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
				<Modal show={showModal} onClose={() => setShowModal(false)}>
					<EventMap evt={evt} />
				</Modal>
				<Reviews
					userId={userId}
					eventId={evt.id}
					name={name}
					token={token}
					reviews={evt.reviews}
				/>
			</div>
		</Layout>
	)
}

export async function getServerSideProps({ query: { slug }, req }) {
	let { token } = parseCookies(req)
	let user = null
	let name = null
	let userId = null
	let usersEvent = false

	if (token) {
		const lu = await fetch(`${API_URL}/events/me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		user = await lu.json()
	} else {
		token = null
	}

	const res = await fetch(`${API_URL}/events?slug=${slug}`)
	const events = await res.json()

	if (user) {
		userId = user[0].user.id
		name = user[0].user.username
		if (user.filter(u => u.id === events[0].id).length === 1) {
			usersEvent = true
		}
	}

	return {
		props: {
			evt: events[0],
			usersEvent,
			name,
			userId,
			token
		}
	}
}
