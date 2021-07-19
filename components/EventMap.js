import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'

export default function EventMap({ evt }) {
	const [lat, setLat] = useState(null)
	const [lng, setLng] = useState(null)
	const [loading, setLoading] = useState(true)
	const [viewport, setViewport] = useState({
		latitude: 45.267136,
		longitude: 19.833549,
		width: '100%',
		height: '450px',
		zoom: 12
	})

	useEffect(() => {
		Geocode.fromAddress(evt.address).then(
			response => {
				const { lat, lng } = response.results[0].geometry.location
				setLat(lat)
				setLng(lng)
				setViewport({ ...viewport, latitude: lat, longitude: lng })
				setLoading(false)
			},
			error => {
				console.error(error)
			}
		)
	}, [])

	Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

	if (loading) return false

	return (
		<>
			<p>{evt.address}</p>
			<ReactMapGl
				{...viewport}
				mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
				onViewportChange={vp => setViewport(vp)}
			>
				<Marker key={evt.id} latitude={lat} longitude={lng}>
					<Image src='/images/pin.svg' width={30} height={30} />
				</Marker>
			</ReactMapGl>
		</>
	)
}
