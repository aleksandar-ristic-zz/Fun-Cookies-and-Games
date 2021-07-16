import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { GiPartyPopper } from 'react-icons/gi'
import { MdNotInterested } from 'react-icons/md'
import styles from '@/styles/DashboardEvent.module.css'

export default function DashboardEvent({ evt, handleDelete }) {
	let going = null
	let notGoing = null

	evt.reviews.forEach(review => {
		if (review.attendance === 'going') going++

		if (review.attendance === 'no') notGoing++
	})

	return (
		<div className={styles.event}>
			<h4>
				<Link href={`/events/${evt.slug}`}>
					<a>{evt.name}</a>
				</Link>
			</h4>
			<div>
				{going && (
					<span>
						<GiPartyPopper /> {going}
					</span>
				)}
				{notGoing && (
					<span>
						<MdNotInterested /> {notGoing}
					</span>
				)}
			</div>
			<div>
				<Link href={`/events/edit/${evt.id}`}>
					<a className={styles.edit}>
						<FaPencilAlt />
					</a>
				</Link>
				<a
					href='#!'
					className={styles.delete}
					onClick={() => handleDelete(evt.id)}
				>
					<FaTimes />
				</a>
			</div>
		</div>
	)
}
