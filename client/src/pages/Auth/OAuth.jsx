import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import locationHashParser from 'parse-location-hash'
import { useHistory, useParams, useLocation } from 'react-router-dom'

import ReactLoading from 'react-loading'

import userTypes from '../../redux/user/user.types'
import { toast } from 'react-toastify'

const OAuth = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const { search } = useLocation()

	const { type } = useParams()

	const loginGoogle = async () => {
		const hash = locationHashParser(window.location.hash)
		try {
			const { data } = await axios.post('/api/auth/oauth/google', {
				access_token: hash.access_token,
			})
			dispatch({
				type: userTypes.LOAD_USER_SUCCESS,
				payload: data.payload,
			})
			history.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	const loginGithub = async () => {
		try {
			const urlSearch = new URLSearchParams(search)
			const code = urlSearch.get('code')
			const { data } = await axios.post('/api/auth/oauth/github', {
				code,
			})
			if (data.status === 'FAIL') {
				toast.error(data.message, { autoClose: 7000 })
				history.push('/login')
			}
			dispatch({
				type: userTypes.LOAD_USER_SUCCESS,
				payload: data.payload,
			})
			history.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		switch (type) {
			case 'google':
				loginGoogle()
				return
			case 'github':
				loginGithub()
				return
			default:
				toast.error('OAuth type không hợp lệ')
				history.push('/login')
		}
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
