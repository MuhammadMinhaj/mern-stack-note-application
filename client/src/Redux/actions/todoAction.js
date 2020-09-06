import axios from 'axios'
import {
	changeHandle,
	drawerToggler,
	modalOnHandler,
	createdSuccess,
	errorOccurred,
	getAllNotes,
	getAllNotesServerError,
	clickEditHandler,
	fetchDataOfNote,
	clickUpdateNoteToggler,
	updateModalChangeHandler,
	updateSuccess,
	updateFailed,
	deleteSuccess,
	deleteFailed,
	noteTypeSuccess,
	noteTypeError,
	searchTerm,
	logoutHandler,
} from '../types/todo'

export const changeHandler = event => {
	event.persist()
	return dispatch => {
		dispatch({
			type: changeHandle,
			payload: event,
		})
	}
}

export const toggleHandler = event => {
	return dispatch => {
		if (event === 'modal') {
			dispatch({
				type: modalOnHandler,
			})
		} else if (event === 'sidebar') {
			dispatch({
				type: drawerToggler,
			})
		}
	}
}

export const submitHandler = event => {
	event.preventDefault()
	return async (dispatch, selector) => {
		const state = selector().todo

		let error = ''

		if (!state.note) {
			error = 'Please Provied Note Details'
		}
		if (!state.title) {
			error = 'Please Provied Title'
		}
		if (error) {
			dispatch({
				type: errorOccurred,
				payload: error,
			})
			return false
		}
		try {
			const res = await axios.post(
				'/note/create',
				{
					title: state.title,
					note: state.note,
				},
				{
					headers: {
						'x-auth-token': localStorage.getItem('auth-token'),
					},
				}
			)
			dispatch({
				type: createdSuccess,
				payload: {
					...res.data,
				},
			})
		} catch (error) {
			console.log('I was Listhen Minhaj')
			dispatch({
				type: errorOccurred,
				payload: error.message,
			})
		}
	}
}

export const getAllNotesHandler = () => {
	return async dispatch => {
		dispatch({
			type: fetchDataOfNote,
		})
		try {
			const res = await axios.get('/note/all', { headers: { 'x-auth-token': localStorage.getItem('auth-token') } })
			dispatch({
				type: getAllNotes,
				payload: res.data.notes,
			})
		} catch (e) {
			dispatch({
				type: getAllNotesServerError,
				payload: e.message,
			})
		}
	}
}

export const editHandleClick = (event, list) => {
	console.log('Showing', list)
	return dispatch => {
		dispatch({
			type: clickEditHandler,
			payload: list,
		})
	}
}

export const clickToOpenModalForUpdate = list => {
	return dispatch => {
		dispatch({
			type: clickUpdateNoteToggler,
			payload: {
				...list,
			},
		})
	}
}

export const updateModalHandleChange = event => {
	event.persist()
	return dispatch => {
		dispatch({
			type: updateModalChangeHandler,
			payload: event,
		})
	}
}

export const updateModalHandleSubmit = event => {
	event.preventDefault()
	return async (dispatch, selector) => {
		const state = selector().todo.modifyNote
		let error = ''
		if (!state.note) {
			error = 'Please Provied Note Details'
		}
		if (!state.title) {
			error = 'Please Provied Title'
		}
		if (error) {
			dispatch({
				type: updateFailed,
				payload: error,
			})
			return false
		}
		try {
			const res = await axios.put(
				`/note/update/${state._id}`,
				{
					title: state.title,
					note: state.note,
					isRunning: state.isRunning,
					isCompleted: state.isCompleted,
				},
				{
					headers: {
						'x-auth-token': localStorage.getItem('auth-token'),
					},
				}
			)
			dispatch({
				type: updateSuccess,
				payload: res.data,
			})
		} catch (e) {
			dispatch({
				type: updateFailed,
				payload: e.message,
			})
		}
	}
}

export const noteDeleteHandler = id => {
	return async dispatch => {
		try {
			const res = await axios.delete(`/note/delete/${id}`, {
				headers: {
					'x-auth-token': localStorage.getItem('auth-token'),
				},
			})
			dispatch({
				type: deleteSuccess,
				payload: res.data,
			})
		} catch (e) {
			dispatch({
				type: deleteFailed,
				payload: e.message,
			})
		}
	}
}

export const noteProgressTypeHandler = id => {
	return async dispatch => {
		try {
			const res = await axios.get(`/note/type/${id}`, { headers: { 'x-auth-token': localStorage.getItem('auth-token') } })
			dispatch({
				type: noteTypeSuccess,
				payload: res.data,
			})
		} catch (e) {
			dispatch({
				type: noteTypeError,
				payload: e.message,
			})
		}
	}
}

export const searchChangeHandler = event => {
	return dispatch => {
		dispatch({
			type: searchTerm,
			payload: event.target.value,
		})
	}
}

export const logoutHandle = () => {
	localStorage.removeItem('auth-token')
	return dispatch => {
		dispatch({
			type: logoutHandler,
		})
	}
}
