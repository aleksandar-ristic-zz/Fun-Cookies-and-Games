import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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

	const handleSubmit = async e => {
		e.preventDefault()

		const hasEmptyFields = Object.values(values).some(element => element === '')

		if (hasEmptyFields) {
			toast.error('Please fill in all event fields')
		}

		const res = await fetch(`${API_URL}/events`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		})

		if (!res.ok) {
			toast.error('Oh no! Something went wrong')
		} else {
			toast.success('Event added successfully!')
			const evt = await res.json()
			router.push(`/events/${evt.slug}`)
		}
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

			<ToastContainer position='top-center' draggable />

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.grid}>
					<div>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							id='name'
							name='name'
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor='performers'>Performers</label>
						<input
							type='text'
							id='performers'
							name='performers'
							value={values.performers}
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor='venue'>Venue</label>
						<input
							type='text'
							id='venue'
							name='venue'
							value={values.venue}
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor='address'>Address</label>
						<input
							type='text'
							id='address'
							name='address'
							value={values.address}
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							id='date'
							name='date'
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor='name'>Time</label>
						<input
							type='text'
							id='time'
							name='time'
							value={values.time}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div>
					<label htmlFor='description'>Description</label>
					<textarea
						type='text'
						name='description'
						id='description'
						value={values.description}
						onChange={handleInputChange}
					></textarea>
				</div>

				<input type='submit' value='Add Event' className='btn' />
			</form>
		</Layout>
	)
}
