import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
	return (
		<div>
			<Head>
				<title>DJ events</title>
				<meta
					name='description'
					content='DJ Events best place for staying informed.'
				/>
			</Head>

			<h1>Home</h1>
			<Link href='/about'>About</Link>
		</div>
	)
}
