import { parseCookies } from '@/helpers/index'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'

export default function DashboardPage({ events, token }) {
	console.log(events)
	const router = useRouter()

	const deleteEvent = async id => {
		if (confirm('Are you sure?')) {
			const res = await fetch(`${API_URL}/events/${id}`, {
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
				router.reload()
			}
		}
	}

	return (
		<Layout title='User Dashboard | Fun, Cookies and Games'>
			<div className={styles.dash}>
				<h1>Dashboard</h1>

				<ToastContainer position='top-center' draggable />

				<div className={styles.add}>
					<Link href='/events/add'>
						<a className='btn btn-secondary'>+ Add Activity</a>
					</Link>
				</div>

				<h3>My Fun</h3>

				{events.map(evt => (
					<DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
				))}
			</div>
		</Layout>
	)
}

export async function getServerSideProps({ req }) {
	const { token } = parseCookies(req)

	const res = await fetch(`${API_URL}/events/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	const events = await res.json()
	return {
		props: {
			events,
			token
		}
	}
}
