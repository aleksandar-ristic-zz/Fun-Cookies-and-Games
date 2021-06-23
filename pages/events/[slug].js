import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

export default function evenPage() {
	const router = useRouter()

	return (
		<Layout title='My Event | DJ Events'>
			<h1>My Event</h1>
			<h3>{router.query.slug}</h3>
			<button onClick={() => router.push('/')}>Home</button>
		</Layout>
	)
}
