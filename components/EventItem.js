import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/EventItem.module.css'

export default function EventItem({ evt }) {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={
						evt.image
							? evt.image.formats.thumbnail.url
							: '/images/event-default.png'
					}
					width={170}
					height={100}
				/>
			</div>
			<div className={styles.details}>
				<ul>
					{evt.performers.split(',').map(performer => (
						<li>
							<span>{performer}</span>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.info}>
				<span>
					{new Date(evt.date).toLocaleDateString('en-GB')} at {evt.time}
				</span>
				<h3>{evt.name}</h3>
			</div>
			<div>
				<Link href={`/events/${evt.slug}`}>
					<a className='btn btn-outline'>Read More</a>
				</Link>
			</div>
		</div>
	)
}
