import axios from 'axios'
import { handleChange, validationForm, serverError, successRequest, handleSubmit, verifyToken, verifyTokenError } from '../types/login'

export const changeHandler = event => {
	event.persist()
	return dispatch => {
		dispatch({
			type: handleChange,
			payload: event,
		})
	}
}
export const submitHandler = (event, state) => {
	event.preventDefault()
	let error = ''

	if (!state.user.type || !state.user.password) {
		error = 'Please Provied Full Info'
	} else if (state.user.password.length > 16) {
		error = 'Password Too Long'
	}
	return async dispatch => {
		dispatch({
			type: handleSubmit,
		})
		if (error) {
			dispatch({
				type: validationForm,
				payload: error,
			})
			return false
		}
		try {
			const res = await axios.post('/auth/login', state.user)
			localStorage.setItem('auth-token', res.data.token)

			dispatch({
				type: successRequest,
				payload: true,
			})
		} catch (error) {
			dispatch({
				type: serverError,
				payload: error.message,
			})
		}
	}
}

export const  authMiddleware = () => {
	return async dispatch => {
		
		// console.log(state)
		try {
			const token = localStorage.getItem('auth-token')
			if(!token){
				return false 
			}
			const res = await axios.post('/auth/verify-token', null, {
				headers: {
					'x-auth-token': token,
				},
			})
			if (res.data) {
				const userRes = await axios.get('/auth/user', { headers: { 'x-auth-token': token } })
				dispatch({
					type: verifyToken,
					payload:{
						user:{
							...userRes.data.user 
						},
						token:userRes.data.token
					},
				})
			}
		} catch (error) {
			localStorage.removeItem('auth-token')
			dispatch({
				type: verifyTokenError,
				payload: error.message,
			})
		}
	}
}
