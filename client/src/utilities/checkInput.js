export const type = {
	EMAIL: 'EMAIL',
	PASSWORD: 'PASSWORD',
	REPASSWORD: 'REPASSWORD',
}

export default function (value, typeCheck, repassword) {
	console.log({ value })
	switch (typeCheck) {
		case type.EMAIL:
			if (/\w+@\w+\.\w+/.test(value)) {
				return ''
			} else {
				return 'Vui lòng nhập email hợp lệ !'
			}
		case type.PASSWORD:
			if (value.length < 6) return 'Vui lòng nhập mật khẩu ít nhất 6 ký tự !'
			return ''
		case type.REPASSWORD:
			if (value === repassword) return ''
			else return 'Mật khẩu nhập lại không đúng !'
	}
}
