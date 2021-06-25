import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function SearchPage({ events }) {
	const router = useRouter()
	return (
		<Layout title='Search Results'>
			<Link href='/events'>
				<a>
					<FaArrowLeft /> Go Back
				</a>
			</Link>
			<h1>
				Search Results for <span>{router.query.term}</span>
			</h1>
			{events.length === 0 && (
				<>
					<h3>
						No events containing <span>{router.query.term}</span> at the moment.
					</h3>
					<p>Try searching something else.</p>
				</>
			)}

			{events.map(evt => (
				<EventItem key={evt.id} evt={evt} />
			))}
		</Layout>
	)
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify({
		_where: {
			_or: [
				{ name_contains: term },
				{ performers_contains: term },
				{ description_contains: term },
				{ venue_contains: term }
			]
		}
	})

	const res = await fetch(`${API_URL}/events?_sort=date:ASC&${query}`)
	const events = await res.json()

	return {
		props: { events }
	}
}
