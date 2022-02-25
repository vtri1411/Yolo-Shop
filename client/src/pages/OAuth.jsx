import React, { useEffect } from 'react'
import axios from 'axios'
import locationHashParser from 'parse-location-hash'
import { useHistory } from 'react-router-dom'

const OAuth = () => {
	const history = useHistory()
	useEffect(async () => {
		const callApi = async () => {
			const hash = locationHashParser(window.location.hash)
			const { data } = await axios.post(
				'http://localhost:5000/api/auth/oauth/google',
				{
					access_token: hash.access_token,
				},
				{
					withCredentials: true,
				}
			)
			console.log({ data })
			if (data.user) {
				history.push('/')
			}
		}

		callApi()
	}, [])

	return <div>OAuth</div>
}

export default OAuth
