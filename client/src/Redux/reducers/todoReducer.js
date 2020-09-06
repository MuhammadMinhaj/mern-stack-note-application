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
const initialState = {
	title: '',
	note: '',
	msg: '',
	errorMsg: '',
	successMsg: '',
	searchTerms: '',
	isError: false,
	isSuccess: false,
	isRunning: false,
	isCompleted: false,
	isSelected: false,
	isOpen: false,
	isOnModal: false,
	isEditNav: false,
	isLoading: true,
	isLogout: false,
	noteLists: [],
	modifyNote: {
		isOpen: false,
		isError: false,
		isSuccess: false,
		msg: '',
	},
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case changeHandle:
			state = {
				...state,
				isError: false,
				isSuccess: false,
				msg: '',
				[action.payload.target.name]: action.payload.target.value,
			}
			return state
		case drawerToggler:
			state = {
				...state,
				isOpen: !state.isOpen,
			}
			return state
		case modalOnHandler:
			state = {
				...state,
				errorMsg: '',
				successMsg: '',
				isOnModal: !state.isOnModal,
			}
			return state
		case createdSuccess:
			state = {
				...state,
				noteLists: [...state.noteLists, { ...action.payload.note }],
				title: '',
				note: '',
				isError: false,
				isSuccess: true,
				msg: action.payload.message,
			}
			return state
		case errorOccurred:
			state = {
				...state,
				isError: true,
				isSuccess: false,
				msg: action.payload,
			}
			return state
		case fetchDataOfNote:
			state = {
				...state,
				isLoading: true,
			}
			return state
		case getAllNotes:
			state = {
				...state,
				noteLists: [...action.payload],
				isLoading: false,
				errorMsg: '',
			}
			return state
		case getAllNotesServerError:
			state = {
				...state,
				isLoading: false,
				errorMsg: action.payload,
			}
			return state
		case clickEditHandler:
			state = {
				...state,
				isEditNav: !state.isEditNav,
				errorMsg: '',
				successMsg: '',
				modifyNote: {
					...state.modifyNote,
					...action.payload,
				},
			}
			return state
		case clickUpdateNoteToggler:
			state = {
				...state,
				modifyNote: {
					...state.modifyNote,
					isOpen: !state.modifyNote.isOpen,
					...action.payload,
					msg: '',
					isSuccess: false,
					isError: false,
				},
			}
			return state
		case updateModalChangeHandler:
			state = {
				...state,
				modifyNote: {
					...state.modifyNote,
					isError: false,
					msg: '',
					[action.payload.target.name]: action.payload.target.value,
				},
			}
			return state
		case updateSuccess:
			state.noteLists.forEach(list => {
				if (list._id.toString() === action.payload.note._id.toString()) {
					list.title = action.payload.note.title
					list.note = action.payload.note.note
					list.isRunning = action.payload.note.isRunning
					list.isCompleted = action.payload.note.isCompleted
				}
			})
			state = {
				...state,
				modifyNote: {
					...state.modifyNote,
					msg: action.payload.message,
					isSuccess: true,
				},
			}
			return state
		case updateFailed:
			state = {
				...state,
				modifyNote: {
					...state.modifyNote,
					isError: true,
					msg: action.payload,
				},
			}
			return state
		case deleteSuccess:
			state = {
				...state,
				isEditNav: false,
				noteLists: [...state.noteLists.filter(list => list._id.toString() !== action.payload.note._id.toString())],
				successMsg: action.payload.message,
			}
			return state
		case deleteFailed:
			state = {
				...state,
				errorMsg: action.payload,
			}
			return state
		case noteTypeSuccess:
			state.noteLists.forEach(list => {
				if (list._id.toString() === action.payload.note._id.toString()) {
					list.title = action.payload.note.title
					list.note = action.payload.note.note
					list.isCompleted = action.payload.note.isCompleted
				}
			})
			state = {
				...state,
				errorMsg: '',
				successMsg: action.payload.message,
			}
			return state
		case noteTypeError:
			state = {
				...state,
				errorMsg: action.payload,
			}
			return state
		case searchTerm:
			state = {
				...state,
				searchTerms: action.payload,
			}
			return state
		case logoutHandler:
			state = {
				...state,
				isLogout: true,
			}
			return state
		default:
			return state
	}
}

export default reducer
