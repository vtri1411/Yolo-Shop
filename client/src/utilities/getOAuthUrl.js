const getGoogleUrl = () => {
	const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

	const options = {
		client_id:
			'1082897750063-htja233etc5m6lvaq3fq6sk9c38oeqas.apps.googleusercontent.com',
		redirect_uri:
			process.env.NODE_ENV === 'production'
				? 'https://yolo-shop.up.railway.app/oauth/google'
				: 'http://localhost:3000/oauth/google',
		response_type: 'token',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email',
		].join(' '),
		prompt: 'consent',
	}

	const qs = new URLSearchParams(options)
	return `${rootUrl}?${qs.toString()}`
}

const getGithubUrl = () => {
	const rootUrl = 'https://github.com/login/oauth/authorize'

	console.log('go inside getGithubUrl function')

	console.log({
		client_id: process.env.GITHUB_CLIENT_ID,
		redirect_uri: process.env.GITHUB_CLIENT_SECRET,
		scope: 'email user',
	})

	const options =
		process.env.NODE_ENV === 'production'
			? {
					client_id: process.env.GITHUB_CLIENT_ID,
					redirect_uri: process.env.GITHUB_CLIENT_SECRET,
					scope: 'email user',
			  }
			: {
					client_id: 'f8d9dadf3f9ed6730285',
					redirect_uri: 'http://localhost:3000/oauth/github',
					scope: 'email user',
			  }

	const qs = new URLSearchParams(options)
	return `${rootUrl}?${qs.toString()}`
}

export const googleOauthUrl = getGoogleUrl()
export const githubOauthUrl = getGithubUrl()
