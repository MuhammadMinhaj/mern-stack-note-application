import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route,Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core'
// import styled from 'styled-components'
import Singup from './Components/auth/singup'
import Login from './Components/auth/login'
import Home from './Components/Home'
import Dashboard from './Components/Dashboard'
import { authMiddleware } from './Redux/actions/loginAction'


// Privet Route
const PrivetRoute = props=>{
	return (
		<Route
			path={props.path}
			render={data=>(localStorage.getItem('auth-token')?(<props.component {...data}/>):(<Redirect to="login"/>))}
		></Route>
	)
}
const UnPrivetRoute = props =>{
	return (
		<Route
			path={props.path}
			render={data=>(localStorage.getItem('auth-token')?<Redirect to="/dashboard"/>:<props.component {...data} />)}
		/>
	)
}


const Routes = () => {
	const dispatch = useDispatch()
	useEffect(()=>{	
		dispatch(authMiddleware())
	},[dispatch])
	return (
		<Container>
			<Switch>
				<Route path="/" exact component={Home} />
				<UnPrivetRoute path="/singup" component={Singup}/>
				<UnPrivetRoute path="/login" component={Login}/>
				<PrivetRoute path="/dashboard" component={Dashboard}/>
			</Switch>
		</Container>
	)
}

export default Routes
