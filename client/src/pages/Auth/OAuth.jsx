import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import locationHashParser from 'parse-location-hash'
import { useHistory } from 'react-router-dom'

import ReactLoading from 'react-loading'

import userTypes from '../../redux/user/user.types'

const OAuth = () => {
	const history = useHistory()

	const dispatch = useDispatch()

	useEffect(async () => {
		const loginUser = async () => {
			const hash = locationHashParser(window.location.hash)
			try {
				const { data } = await axios.post(
					'http://localhost:5000/api/auth/oauth/google',
					{
						access_token: hash.access_token,
					},
					{
						withCredentials: true,
					}
				)
				dispatch({
					type: userTypes.LOAD_USER_SUCCESS,
					payload: data.payload,
				})

				history.push('/')
			} catch (error) {
				console.log(error)
			}
		}

		loginUser()
	}, [])

	return (
		<div
			style={{
				width: '100%',
				height: '50vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ReactLoading
				type='bars'
				color='#4267b2'
				width={'15%'}
				height={'15%'}
			/>
		</div>
	)
}

export default OAuth
