import React from 'react'
import {
	Card,
	CardContent,
	TextField,
	FormControl,
	FormControlLabel,
	FormLabel,
	Button,
	Radio,
	RadioGroup,
	Select,
	MenuItem,
	InputLabel,
	Checkbox,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { changeHandler, submitHandler } from '../../Redux/actions/singupAction'
import { useSelector, useDispatch } from 'react-redux'

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
const AlertMessage = (props) => {
	return (
		<Alert severity={props.isError?'error':'success'}>
			<AlertTitle>{props.isError?'ERROR OCCURRED!':'SUCCESSFUL!'}</AlertTitle>
			{props.msg}
		</Alert>
	)
}
const Singup = () => {
	const classes = useStyle()

	const state = useSelector(state => state.singup)
	const { name, username, email, phone, password, gender, country, birthday } = state.error
	const dispatch = useDispatch()

	return (
		<>
			<Card className={classes.root} variant="outlined">
				<CardContent>
					<h1 className={classes.formTilte}>SINGUP</h1>

					{state.isError? <AlertMessage isError={true} msg={state.msg}/> : ''}
					{state.isSuccess?<AlertMessage isError={false} msg={state.msg}/>:''}

					<form>
						<FormControl className={classes.formControl} fullWidth>
							<TextField
								type="text"
								variant="outlined"
								label="Name"
								name="name"
								onChange={e => dispatch(changeHandler(e))}
								value={state.name}
								helperText={name}
								error={name ? true : false}
							/>
						</FormControl>
						<FormControl className={classes.formControl} fullWidth>
							<TextField
								type="text"
								variant="outlined"
								label="Username"
								name="username"
								onChange={e => dispatch(changeHandler(e))}
								value={state.username}
								helperText={username}
								error={username ? true : false}
							/>
						</FormControl>
						<FormControl className={classes.formControl} fullWidth>
							<TextField
								type="email"
								variant="outlined"
								label="Email"
								name="email"
								onChange={e => dispatch(changeHandler(e))}
								value={state.email}
								helperText={email}
								error={email ? true : false}
							/>
						</FormControl>
						<FormControl className={classes.formControl} fullWidth>
							<TextField
								type="number"
								variant="outlined"
								label="Phone"
								name="phone"
								onChange={e => dispatch(changeHandler(e))}
								value={state.phone}
								helperText={phone}
								error={phone ? true : false}
							/>
						</FormControl>
						<FormControl className={classes.formControl} fullWidth>
							<TextField
								type="password"
								variant="outlined"
								label="Password"
								name="password"
								onChange={e => dispatch(changeHandler(e))}
								value={state.password}
								helperText={password}
								error={password ? true : false}
							/>
						</FormControl>
						<FormControl className={classes.formControl} fullWidth>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									inputVariant="outlined"
									label="Select Brithday"
									format="MM/dd/yyyy"
									name="birthday"
									onChange={e => dispatch(changeHandler(e))}
									value={state.birthday}
									helperText={birthday}
									error={birthday ? true : false}
								/>
							</MuiPickersUtilsProvider>
						</FormControl>
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel id="demo-controlled-open-select-label">Select Your Country</InputLabel>
							<Select
								labelId="demo-controlled-open-select-label"
								value={state.country}
								error={country ? true : false}
								name="country"
								onChange={e => dispatch(changeHandler(e))}
							>
								<MenuItem value="none" key="3">
									<em>Select Country</em>
								</MenuItem>
								<MenuItem value="bangladesh" key="5">
									Bangladesh
								</MenuItem>
							</Select>
						</FormControl>
						<FormControl error={gender ? true : false} component="fieldset" className={classes.formControl} fullWidth>
							<FormLabel component="legend">Select Gender</FormLabel>
							<RadioGroup name="gender" aria-label="gender" row onChange={e => dispatch(changeHandler(e))}>
								<FormControlLabel value="mail" control={<Radio />} label="Mail" />
								<FormControlLabel value="femail" control={<Radio />} label="Femail" />
								<FormControlLabel value="others" control={<Radio />} label="Others" />
							</RadioGroup>
						</FormControl>
						<FormControlLabel control={<Checkbox name="isSelect" />} onChange={e => dispatch(changeHandler(e))} label="Term's And Condition" />
						<Button
							disabled={!state.isSelect}
							type="submit"
							variant="contained"
							fullWidth
							color="primary"
							onClick={e => dispatch(submitHandler(e, state))}
						>
							SINGUP
						</Button>
					</form>
				</CardContent>
			</Card>
		</>
	)
}

export default Singup
