import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, InputBase, Button } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
	headerStyle: {
		textAlign: 'center',
		borderRadius: '1.5rem',
		padding: '1rem',
		marginTop: '1.5rem',
		background: '#3f51b5',
		display: 'grid',
		justifyContent: 'center',
	},
	searchStyle: {
		border: '1px solid black',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '30ch',
			'&:focus': {
				width: '40ch',
			},
		},
	},
	image: {
		width: '100%',
	},
	textCenter: {
		textAlign: 'center',
	},
	title: {
		fontSize: '4rem',
		color: '#3f51b5',
		marginBottom: '0',
	},
	subTitle: {
		color: '#f44336',
		fontSize: '1.75rem',
		marginTop: '5px',
	},
	buttonStyled: {
		paddingRight: '2.5rem',
		paddingLeft: '2.5rem',
        margin: '5px',
       
    },
    btnStyle:{
        textDecoration:'none'
    }
}))

const Home = () => {
	const classes = useStyles()
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<div className={classes.headerStyle}>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
				</div>
			</Grid>
			<Grid item xs={6}>
				<img src="/todo.jpg" className={classes.image} alt="" />
			</Grid>
			<Grid item xs={6} className={classes.textCenter}>
				<h1 className={classes.title}>Welcome</h1>
				<h2 className={classes.subTitle}>Let's Get Start</h2>
				<Link to="/singup" className={classes.btnStyle}>
					<Button className={classes.buttonStyled} variant="contained" color="primary">
						SINGUP
					</Button>
				</Link>
				<Link to="/login" className={classes.btnStyle}>
					<Button className={classes.buttonStyled} variant="outlined" color="primary">
						LOGIN
					</Button>
				</Link>

				<img className={classes.image} src="/rightVector.svg" alt="" />
			</Grid>
		</Grid>
	)
}

export default Home
