import { handleChange, validationForm, serverError, successRequest, handleSubmit, verifyToken, verifyTokenError } from '../types/login'
const initalState = {
	user: {
		type: '',
		password: '',
	},
	auth: {
		token: '',
		user: '',
	},

	alertMsg: '',
	errorMsg: '',
	isLogin: false,
}

const Reducer = (state = initalState, action) => {
	switch (action.type) {
		case handleChange:
			state = {
				...state,
				user: {
					...state.user,
					[action.payload.target.name]: action.payload.target.value,
				},
			}
			return state
		case validationForm:
			state = {
				...state,
				errorMsg: action.payload,
			}
			return state
		case successRequest:
			state = {
				...state,
				isLogin: action.payload,
			}
			return state
		case serverError:
			state = {
				...state,
				errorMsg: action.payload,
			}
			return state
		case handleSubmit:
			return state
		case verifyToken:
			state = {
				...state,
				auth: {
					token: action.payload.token,
					user: action.payload.user,
				},
			}
			return state
		case verifyTokenError:
			state = {
				...state,
				errorMsg: action.payload,
			}
			return state
		default:
			return state
	}
}

export default Reducer
