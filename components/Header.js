import { useContext } from 'react'
import Link from 'next/link'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import styles from '../styles/Header.module.css'
import Search from '@/components/Search'
import AuthContext from '@/context/AuthContext'

export default function Header() {
	const { user, logout } = useContext(AuthContext)

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href='/'>
					<a>DJ Events</a>
				</Link>
			</div>

			<Search />

			<nav>
				<ul>
					<li>
						<Link href='/events'>
							<a>Events</a>
						</Link>
					</li>
					{user ? (
						<>
							<li>
								<Link href='/events/add'>
									<a>Add Event</a>
								</Link>
							</li>
							<li>
								<Link href='/account/dashboard'>
									<a className='btn-secondary btn-icon'>
									Dashboard
									</a>
								</Link>
							</li>
							<li>
								<button
									className='btn-outline btn-icon'
									onClick={() => logout()}
								>
									<FaSignOutAlt /> <span>Logout</span>
								</button>
							</li>
						</>
					) : (
						<>
							<li>
								<Link href='/account/login'>
									<a className='btn-outline btn-icon'>
										<FaSignInAlt /> <span>Login</span>
									</a>
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	)
}
