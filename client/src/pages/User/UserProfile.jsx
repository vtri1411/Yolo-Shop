import { useState, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import blankAvatar from '../../assets/images/blank_avt.png'

import validateInput, { TYPE } from '../../utilities/validateInput'

import { toast } from 'react-toastify'

import Button from '../../components/Button'
import { changeInfo } from '../../redux/user/user.actions'
import UserForm from '../../components/User/UserForm'
import UserFormGroup from '../../components/User/UserFormGroup'

const mapState = ({ user }) => ({ user: user.user })

const UserProfile = () => {
	const dispatch = useDispatch()

	const {
		user: { email, name, phone, address, avatar },
	} = useSelector(mapState)

	const inputFileRef = useRef(null)

	const [newName, setNewName] = useState(name ? name : '')
	const [newPhone, setNewPhone] = useState(phone ? phone : '')
	const [newAddress, setNewAddress] = useState(address ? address : '')
	const [newAvatar, setNewAvatar] = useState(avatar ? avatar : '')

	const handleUploadAvt = (event) => {
		const fileReader = new FileReader()
		fileReader.readAsDataURL(event.target.files[0])
		fileReader.onload = (e) => {
			setNewAvatar(e.target.result)
		}
		fileReader.onerror = (error) => {
			console.log(error)
		}
	}

	const handleClickUploadAvt = useCallback(() => {
		if (inputFileRef && inputFileRef.current) {
			inputFileRef.current.click()
		}
	}, [])

	const handleEditInfo = (e) => {
		e.preventDefault()
		// If user don't type phone, so ignore it
		// If user type phone, so validate it
		if (newPhone && validateInput(newPhone, TYPE.PHONE)) {
			return toast.error('Vui lòng nhập số điện thoại hợp lệ!')
		}
		dispatch(
			changeInfo({
				name: newName,
				phone: newPhone,
				avatar: newAvatar,
				address: newAddress,
			})
		)
	}

	return (
		<div className='user__content__wrapper'>
			<div className='user__content__title'>
				<div className='user__content__title__text'>Hồ Sơ Của Tôi</div>
				<div className='user__content__title__desc'>
					Quản lý thông tin hồ sơ để bảo mật tài khoản
				</div>
			</div>
			<div className='user__content__profile'>
				<UserForm
					onSubmit={handleEditInfo}
					className='user__content__profile__form'
				>
					<UserFormGroup
						label={'Email:'}
						readOnly
						type='text'
						value={email}
					/>
					<UserFormGroup
						label='Name:'
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						type='text'
					/>
					<UserFormGroup
						label='Phone:'
						value={newPhone}
						onChange={(e) => setNewPhone(e.target.value)}
						type='text'
					/>
					<UserFormGroup
						label='Address:'
						value={newAddress}
						onChange={(e) => setNewAddress(e.target.value)}
						type='text'
					/>
					<div className='user__content__profile__btn'>
						<Button className='user__content__profile__form__btn'>
							Lưu Thông Tin
						</Button>
					</div>
				</UserForm>

				<div className='user__content__profile__avatar'>
					<div
						className='user__content__profile__avatar__img'
						onClick={handleClickUploadAvt}
					>
						<img src={newAvatar || blankAvatar} alt='' />
						<div className='user__content__profile__avatar__img__tooltip'>
							<i className=' bx bx-edit-alt'></i>
						</div>
					</div>
					<input
						type='file'
						ref={inputFileRef}
						accept='image/*'
						onChange={handleUploadAvt}
					/>
					<Button onClick={handleClickUploadAvt}>Chọn ảnh</Button>
				</div>
			</div>
		</div>
	)
}

export default UserProfile
