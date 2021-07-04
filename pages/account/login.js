import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import AuthContext from '@/context/AuthContext'
import { FaUser } from 'react-icons/fa'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { login, error } = useContext(AuthContext)

	useEffect(() => error && toast.error(error), [error])

	const handleSubmit = e => {
		e.preventDefault()
		login({ email, password })
	}

	return (
		<Layout title='User Login | DJ Events'>
			<div className={styles.auth}>
				<h1 className='btn-icon'>
					<FaUser /> Log In
				</h1>
				<ToastContainer position='top-center' draggable />

				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='email'>Email Address</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>

					<input
						type='submit'
						value='Login'
						className='btn'
						disabled={password.length < 6}
					/>

					<p>
						Don't have an account ?{' '}
						<Link href='/account/register'>Register</Link>
					</p>
				</form>
			</div>
		</Layout>
	)
}
