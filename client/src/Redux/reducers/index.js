import { combineReducers } from 'redux'
import singupReducer from './singupReducer'
import loginReducer from './loginReducer'
import todoReducer from './todoReducer'

const reducers = combineReducers({
    singup:singupReducer,
    login:loginReducer,
    todo:todoReducer
})

export default reducers