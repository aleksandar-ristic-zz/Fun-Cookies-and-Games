import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { FaArrowLeft } from 'react-icons/fa'

export default function AddEventPage() {
	const [values, setValues] = useState({
		name: '',
		performers: '',
		venue: '',
		address: '',
		date: '',
		time: '',
		description: ''
	})
	const router = useRouter()

	const handleSubmit = e => {
		e.preventDefault()
		console.log('submitted')
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	return (
		<Layout title='Add Event | DJ Events'>
			<Link href='/events'>
				<a>
					<FaArrowLeft />
					Go Back
				</a>
			</Link>
			<h1>Add Event</h1>
			<form onSubmit={handleSubmit}>
				<div className={styles.grid}>
					<div>
						<label htmlFor='name'>Event Name</label>
						<input
							type='text'
							id='name'
							name='name'
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>
				</div>
			</form>
		</Layout>
	)
}
