import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'
import styles from '../styles/Layout.module.css'

export default function Layout({ title, keywords, description, children }) {
	const router = useRouter()

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
			</Head>

			<Header />
			{router.pathname === '/' && <Showcase />}

			<div className={styles.container}>{children}</div>
			<Footer />
		</div>
	)
}

Layout.defaultProps = {
	title: 'We find the most fun, cookies and games',
	description:
		'Find the best fun, activities, parties, stuff, events and so much cookies.',
	keywords: 'music, dj, events, fun, summer, party, activities, cookies'
}
