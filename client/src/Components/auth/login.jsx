import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, TextField, FormControl, Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import { changeHandler, submitHandler } from '../../Redux/actions/loginAction'

const useStyle = makeStyles(theme => ({
	root: {
		maxWidth: '800px',
		margin: 'auto',
		transform: 'translateY(20px)',
		padding: '0rem 2rem',
		boxSizing: 'border-box',
	},
	formControl: {
		padding: '0.75rem 0rem',
	},
	formTilte: {
		textAlign: 'center',
		color: '#456455',
	},
}))
const Login = () => {
	const classes = useStyle()
	const state = useSelector(state => state.login)
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		if (state.isLogin) {
			history.push('/dashboard')
		}
	}, [state.isLogin, history])

	return (
		<Card className={classes.root} variant="outlined">
			<h1 className={classes.formTilte}>Login</h1>

			{state.alertMsg || state.errorMsg ? (
				<Alert severity={state.alertMsg ? 'warning' : 'error'}>
					<AlertTitle>{state.alertMsg ? 'ATTENTION!' : 'ERROR OCURRED'}</AlertTitle>
					{state.alertMsg || state.errorMsg}
				</Alert>
			) : (
				''
			)}

			<CardContent>
				<form onSubmit={event => dispatch(submitHandler(event, state))}>
					<FormControl className={classes.formControl} fullWidth>
						<TextField name="type" label="Email or Username" type="text" variant="outlined" onChange={e => dispatch(changeHandler(e))} />
					</FormControl>

					<FormControl className={classes.formControl} fullWidth>
						<TextField name="password" label="Password" type="password" variant="outlined" onChange={e => dispatch(changeHandler(e))} />
					</FormControl>
					<Button type="submit" variant="contained" fullWidth color="primary">
						LOGIN
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}

export default Login
