import Layout from '@/components/Layout'
import Link from 'next/link'

export default function AboutPage() {
	return (
		<Layout title='About fun, cookies and games'>
			<h1>About</h1>
			<p>
				This is an app to find, add and review, the latest events and fun
				activities.
			</p>
			<p>Version: 1.0.2</p>
			<h3>Changes:</h3>
			<ul>
				<li>Added reviews</li>
				<li>Added attendance</li>
				<li>You can see how many are/not coming to event</li>
				<li>A number of minor tweaks and polishes</li>
			</ul>
			<Link href='/'>Home</Link>
		</Layout>
	)
}
