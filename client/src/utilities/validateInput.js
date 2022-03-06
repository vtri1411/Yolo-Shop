export const TYPE = {
	EMAIL: 'EMAIL',
	PASSWORD: 'PASSWORD',
	REPASSWORD: 'REPASSWORD',
	PHONE: 'PHONE',
}

const check = (value, checkType, password) => {
	switch (checkType) {
		case TYPE.EMAIL:
			if (/\w+@\w+\.\w+/.test(value)) {
				return ''
			} else {
				return 'Vui lòng nhập email hợp lệ !'
			}
		case TYPE.PASSWORD:
			if (value.length < 6) return 'Vui lòng nhập mật khẩu ít nhất 6 ký tự !'
			return ''
		case TYPE.REPASSWORD:
			if (value === password) return ''
			else return 'Mật khẩu nhập lại không đúng !'
		case TYPE.PHONE:
			console.log({ value })
			if (/[0-9]+$/y.test(value) && value?.length === 10) return ''
			else return 'Chỉ được phép nhập số !'
	}
}

export default function (value, checkType, password) {
	let error = ''

	if (Array.isArray(checkType) && checkType.length > 0) {
		for (const item of checkType) {
			error = check(value, item, password)

			// There is error, return now
			// Because UI just have place for 1 error

			if (error) {
				return error
			}
		}
	} else {
		return check(value, checkType, password)
	}
}
