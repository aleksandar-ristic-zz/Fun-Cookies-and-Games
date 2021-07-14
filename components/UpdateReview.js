import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '@/config/index'
import styles from '@/styles/Review.module.css'

export default function UpdateReview({ name, review, updateReview, token }) {
	const [desc, setDesc] = useState(review.description)
	const [attend, setAttend] = useState(review.attendance)

	const onSubmit = async () => {
		const values = {
			description,
			attendance: attend,
			name
		}
		const res = await fetch(`${API_URL}/reviews/${review.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(values)
		})

		if (res.ok) {
			updateReview()
		}
	}

	return (
		<div className={styles.inputContainer}>
			<textarea
				placeholder='How did you change your mind?'
				value={desc}
				onChange={e => setDesc(e.target.value)}
			></textarea>
			<div className={styles.row}>
				<div className={styles.opinion}>
					<h4>Are you going to this party?</h4>
					<label htmlFor='go'>
						On My Way!
						<input
							type='radio'
							id='go'
							value='going'
							checked={attend === 'going'}
							onChange={e => setAttend(e.target.value)}
						/>
					</label>
					<label htmlFor='may'>
						If I can make it.
						<input
							type='radio'
							id='may'
							value='maybe'
							checked={attend === 'maybe'}
							onChange={e => setAttend(e.target.value)}
						/>
					</label>
					<label htmlFor='nein'>
						It's not for me!
						<input
							type='radio'
							id='nein'
							value='no'
							checked={attend === 'no'}
							onChange={e => setAttend(e.target.value)}
						/>
					</label>
				</div>
				<button
					className='btn btn-primary'
					type='submit'
					onClick={() => onSubmit}
				>
					Submit
				</button>
			</div>
		</div>
	)
}
