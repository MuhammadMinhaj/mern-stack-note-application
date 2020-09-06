import { handleChange, handleSubmit, validationForm, serverError, successForCreated } from '../types/singup'

const initValues = {
	name: '',
	username: '',
	email: '',
	phone: '',
	password: '',
	birthday: new Date(),
	country: '',
	gender: '',
	isSelect: false,
}

const initialState = {
	...initValues,
	error: {},
	isSuccess: false,
	isError: false,
	msg: '',
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case handleChange:
			if (!action.payload.target) {
				state = {
					...state,
					birthday: action.payload,
					isError: false,
					msg: '',
				}
			} else {
				if (action.payload.target.name === 'isSelect') {
					state = {
						...state,
						isSelect: !state.isSelect,
					}
				} else {
					state = {
						...state,
						[action.payload.target.name]: action.payload.target.value,
						error: {
							...state.error,
							[action.payload.target.name]: '',
						},
						isError: false,
						msg: '',
					}
				}
			}
			return state
		case validationForm:
			state = {
				...state,
				error: {
					...action.payload,
				},
				isError: true,
				msg: 'Please Provied Your All Valid Info',
			}
			return state
		case handleSubmit:
			state = {
				...state,
				error: {},
			}
			return state
		case successForCreated:
			state = {
				...initValues,
				error: {},
				isError: false,
				isSuccess: true,
				msg: action.payload,
			}
			return state
		case serverError:
			state = {
				...state,
				error: {},
				isError: true,
				msg: action.payload,
			}
			return state
		default:
			return state
	}
}

export default reducer
