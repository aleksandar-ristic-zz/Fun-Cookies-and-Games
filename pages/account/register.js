import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import { FaUser } from 'react-icons/fa'

export default function LoginPage() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (password !== passwordConfirm) {
			toast.error('Passwords do not match!')
			return
		}
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
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							id='username'
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
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
					<div>
						<label htmlFor='passwordConfirm'>Confirm Password</label>
						<input
							type='password'
							id='passwordConfirm'
							value={passwordConfirm}
							onChange={e => setPasswordConfirm(e.target.value)}
						/>
					</div>

					<input
						type='submit'
						value='Login'
						className='btn'
						disabled={password.length < 6}
					/>

					<p>
						Do you have an account ? <Link href='/account/login'>Login</Link>
					</p>
				</form>
			</div>
		</Layout>
	)
}
