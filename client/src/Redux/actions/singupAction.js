import axios from 'axios'
import { handleChange, handleSubmit, validationForm,serverError,successForCreated } from '../types/singup'

export const changeHandler = event => {
	if (event.persist) {
		event.persist()
	}
	return dispatch => {
		dispatch({
			type: handleChange,
			payload: event,
		})
	}
}

export const submitHandler = (event, state) => {
	event.preventDefault()
	const { name, username, email, phone, password,birthday, gender,country } = state

	const error = {}

	if (!name) {
		error.name = 'Please Provied Your Name'
	}
	if (!username) {
		error.username = 'Please Provied Your Username'
	}
	if (!email) {
		error.email = 'Please Provied Your Email'
	}
	if (!phone) {
		error.phone = 'Please Provied Your Phone No'
	}
	if (!password) {
		error.password = 'Please Provied Your Password'
    }
    if(!birthday){
        error.password = 'Please Select Birthday'
    }
    if(!country){
        error.country = 'Please Select Your Country'
    }
	if (!gender) {
		error.gender = 'Please Provied Your Gender'
	}
	return async dispatch => {
		if(Object.keys(error).length===0){
			try{
				const res = await axios.post('/auth/singup',state)
				dispatch({
					type:successForCreated,
					payload:res.data.message
				})
			}catch(error){
				dispatch({
					type:serverError,
					payload:error.message
				})
			}
			dispatch({
				type: handleSubmit,
			})
			
		}else{
			dispatch({
				type:validationForm,
				payload:error
			})			
		}


	}
	
}
