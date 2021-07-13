import styles from '@/styles/Footer.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				<Link href='/about'>About this project</Link>
			</p>
			<Image src='/logo_light.svg' alt='logo' width='150' height='60px' />
			<p>Copyright &copy; fun, cookies and games</p>
		</footer>
	)
}
