export const type = {
	emailOrPhone: 'EMAIL_OR_PHONE',
	password: 'PASSWORD',
	repassword: 'REPASSWORD',
}

export default function (value, typeCheck, repassword) {
	console.log({ value })
	switch (typeCheck) {
		case type.emailOrPhone:
			if (/^[\d]+$/.test(value)) {
				if (value.length === 10) return ''
				return 'Số điện thoại phải là 10 chữ số !'
			}

			if (/\w+@\w+\.\w+/.test(value)) {
				return ''
			} else {
				return 'Vui lòng nhập email không hợp lệ !'
			}
		case type.password:
			if (value.length < 6) return 'Vui lòng nhập mật khẩu ít nhất 6 ký tự !'
			return ''
		case type.repassword:
			if (value === repassword) return ''
			else return 'Mật khẩu nhập lại không đúng !'
	}
}
