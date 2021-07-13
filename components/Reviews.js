import { useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { FaPencilAlt, FaTimes, FaUserAlt } from 'react-icons/fa'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'

export default function Reviews({ userId, name, reviews, token }) {
	const [desc, setDesc] = useState('')
	const [attendance, setAttendance] = useState('maybe')
	const router = useRouter()

	const createReview = async () => {
		const values = {
			desc,
			attendance,
			name
		}

		const res = await fetch(`${API_URL}/reviews`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(values)
		})

		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error('Please login first.')
				return
			}

			toast.error('Oh no! Something went wrong')
		} else {
			toast.success('Review added successfully!')
			await res.json()
			router.reload()
		}
	}

	const updateReview = async id => {
		const res = await fetch(`${API_URL}/reviews/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(values)
		})

		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error('Please login first.')
				return
			}

			toast.error('Oh no! Something went wrong')
		} else {
			toast.success('Review updated successfully!')
			await res.json()
			router.reload()
		}
	}

	const deleteReview = async id => {
		const res = await fetch(`${API_URL}/reviews/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error('Please login first.')
				return
			}

			toast.error('Oh no! Something went wrong')
		} else {
			toast.success('Review deleted successfully!')
			await res.json()
			router.reload()
		}
	}

	return (
		<div className={styles.reviewContainer}>
			<h3>User Reviews</h3>

			<ToastContainer position='top-center' draggable />

			{!token ? (
				<p>
					<Link href='/account/login'>
						<a className={`${styles.back} ${styles.icon}`}>
							<FaUserAlt /> <span>Login</span>
						</a>
					</Link>{' '}
					first in order to leave comments.
				</p>
			) : (
				<div className={styles.inputContainer}>
					<textarea
						placeholder='What do you think?'
						value={desc}
						onChange={e => setDesc(e.target.value)}
					></textarea>
					<div className={styles.row}>
						<div className={styles.opinion}>
							<h4>Are you going to this party?</h4>
							<label htmlFor='going'>
								On My Way!
								<input
									type='radio'
									name='attendance'
									id='going'
									value='going'
									onChange={e => setAttendance(e.target.value)}
								/>
							</label>
							<label htmlFor='maybe'>
								If I can make it.
								<input
									type='radio'
									name='attendance'
									id='maybe'
									value='maybe'
									checked={true === 'maybe'}
									onChange={e => setAttendance(e.target.value)}
								/>
							</label>
							<label htmlFor='no'>
								It's not for me!
								<input
									type='radio'
									name='attendance'
									id='no'
									onChange={e => setAttendance(e.target.value)}
								/>
							</label>
						</div>
						<button
							className='btn btn-primary'
							type='submit'
							onClick={createReview}
						>
							Submit
						</button>
					</div>
				</div>
			)}

			<div className={styles.reviewWrapper}>
				{reviews.length === 0 ? (
					<h3>No reviews yet.</h3>
				) : (
					reviews.map(review => (
						<div key={review.id} className={styles.review}>
							{userId === review.user && (
								<>
									<div className={styles.controls}>
										<a
											href='#!'
											className={`${styles.icon} ${styles.edit}`}
											onClick={updateReview(review.id)}
										>
											<FaPencilAlt /> <span>Edit</span>
										</a>
										<a
											href='#!'
											className={`${styles.delete} ${styles.icon}`}
											onClick={deleteReview(review.id)}
										>
											<FaTimes /> <span>Delete</span>
										</a>
									</div>
								</>
							)}
							<div className={styles.opinion}>"{review.description}"</div>
							<div className={styles.name}>
								{review.name} at{' '}
								<span>
									{new Date(review.created_at).toLocaleDateString('en-GB')}
								</span>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	)
}
