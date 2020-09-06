import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Home, ExitToApp, AccountBox, Close } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import MenuIcon from '@material-ui/icons/Menu'
import ListIcon from '@material-ui/icons/List'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import CloseIcon from '@material-ui/icons/Close'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import DoneIcon from '@material-ui/icons/Done'
import LoopIcon from '@material-ui/icons/Loop'
import UpdateIcon from '@material-ui/icons/Update'
import { Alert, AlertTitle } from '@material-ui/lab'
import {
	Grid,
	Paper,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	AppBar,
	Toolbar,
	IconButton,
	InputBase,
	Button,
	Modal,
	Fade,
	FormControl,
	TextField,
	Card,
	CardHeader,
	CardContent,
	CardActionArea,
	Typography,
	BottomNavigation,
	BottomNavigationAction,
	LinearProgress,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {
	changeHandler,
	toggleHandler,
	submitHandler,
	editHandleClick,
	getAllNotesHandler,
	clickToOpenModalForUpdate,
	updateModalHandleChange,
	updateModalHandleSubmit,
	noteDeleteHandler,
	noteProgressTypeHandler,
	searchChangeHandler,
	logoutHandle,
} from '../../Redux/actions/todoAction'

const useStyle = makeStyles(theme => ({
	paper: {
		width: '100%',
		display: 'block',
		marginTop: '0.75rem',
		padding: '0.75rem',
	},
	itemStyled: {
		padding: '0.5rem',
	},
	appBar: {
		borderRadius: '0rem 0rem 0.75rem 0.75rem',
	},
	toolbar: {
		justifyContent: 'space-between',
	},
	flex: {
		display: 'flex',
	},
	isCompleted: {
		border: '1px solid green',
	},
	close: {
		float: 'Right',
		marginRight: '10px',
		cursor: 'pointer',
	},
	searchStyle: {
		border: '1px solid black',
	},
	createBtn: {
		marginTop: theme.spacing(1),
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
	modalStyled: {
		maxWidth: '700px',
		margin: 'auto',
		background: '#ffffff',
		padding: '0.5rem',
		transform: 'translateY(70px)',
		outline: 'none',
		borderRadius: '10px',
	},
	modalTitle: {
		padding: '0rem 0.5rem 1rem 0.5rem',
		borderBottom: '1px solid #e0e0e0',
	},
	closeIcon: {
		border: '1px solid #cdcdcfad',
		float: 'right',
		borderRadius: '6px',
		padding: '0.25rem 0.25rem 0.10rem 0.25rem',
		transition: 'all 0.5s',
		color: 'red',
		'&:hover': {
			background: '#00000014',
			cursor: 'pointer',
		},
	},
	yPadding: {
		padding: '1rem 0rem 1rem 0rem',
	},
	formStyled: {
		padding: '0rem 1.25rem 1.25rem 1.25rem',
	},
	editBtnNav: {
		marginTop: '0.5rem',
		marginLeft: '0.25rem',
	},
	alertParent: {
		margin: '10px',
		display: 'block',
		width: '100%',
	},
}))

const SideBar = ({ isOpen, toggler }) => {
	const classes = useStyle()
	const dispatch = useDispatch()
	return (
		<Drawer open={isOpen} onClose={toggler}>
			<List>
				<IconButton onClick={toggler} className={classes.close}>
					<Close />
				</IconButton>

				<ListItem button>
					<ListItemIcon children={<Home />} />
					<ListItemText primary="Dashboard" />
				</ListItem>
				<Divider variant="fullWidth" />

				<ListItem button>
					<ListItemIcon children={<AccountBox />} />
					<ListItemText primary="Profile" />
				</ListItem>
				<Divider variant="fullWidth" />

				<ListItem button>
					<ListItemIcon children={<BorderColorIcon />} />
					<ListItemText primary="Create" />
				</ListItem>
				<Divider variant="fullWidth" />

				<ListItem button>
					<ListItemIcon children={<ListIcon />} />
					<ListItemText primary="Todo List" />
				</ListItem>

				<Divider variant="fullWidth" />

				<ListItem button onClick={() => dispatch(logoutHandle())}>
					<ListItemIcon children={<ExitToApp />} />
					<ListItemText primary="Logout" />
				</ListItem>
			</List>
		</Drawer>
	)
}

const NavBar = props => {
	const classes = useStyle()
	const dispatch = useDispatch()
	return (
		<AppBar position="relative" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<div className={classes.flex}>
					<IconButton onClick={props.togller}>
						<MenuIcon />
					</IconButton>

					<h3>Todo Application</h3>
				</div>

				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						onChange={e => dispatch(searchChangeHandler(e))}
						placeholder="Search…"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
					/>
				</div>
			</Toolbar>
		</AppBar>
	)
}
const UpdateModal = () => {
	const classes = useStyle()
	const state = useSelector(state => state.todo.modifyNote)
	const dispatch = useDispatch()

	const Msg = (
		<Alert severity={state.isSuccess ? 'success' : 'error'}>
			<AlertTitle>{state.isSuccess ? 'Successful' : 'Error Occurred'}</AlertTitle>
			{state.msg}
		</Alert>
	)

	return (
		<Modal open={state.isOpen} onClose={() => dispatch(clickToOpenModalForUpdate())}>
			<Fade in={state.isOpen}>
				<div className={classes.modalStyled}>
					<h2 className={classes.modalTitle}>
						Create Todo
						<span className={classes.closeIcon} onClick={() => dispatch(clickToOpenModalForUpdate())}>
							<CloseIcon />
						</span>
					</h2>
					{state.msg && Msg}
					<form className={classes.formStyled} onSubmit={e => dispatch(updateModalHandleSubmit(e))}>
						<FormControl fullWidth className={classes.yPadding}>
							<TextField label="Title" name="title" value={state.title} onChange={e => dispatch(updateModalHandleChange(e))} />
						</FormControl>
						<FormControl fullWidth className={classes.yPadding}>
							<TextField label="Note" name="note" value={state.note} multiline rows={10} onChange={e => dispatch(updateModalHandleChange(e))} />
						</FormControl>
						<Button type="submit" startIcon={<UpdateIcon />} color="primary" variant="contained">
							Update
						</Button>
					</form>
				</div>
			</Fade>
		</Modal>
	)
}

const Item = props => {
	const classes = useStyle()
	const dispatch = useDispatch()
	const { title, note, isCompleted, createdAt } = props.list
	return (
		<Grid item sm={3} className={classes.itemStyled}>
			<Card variant="outlined" className={isCompleted ? classes.isCompleted : ''}>
				<CardHeader
					title={title}
					subheader={createdAt.slice(0, 10)}
					action={
						<IconButton onClick={e => dispatch(editHandleClick(e, props.list))} aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
				/>

				<Divider />
				<CardActionArea onClick={() => dispatch(clickToOpenModalForUpdate(props.list))}>
					<CardContent>
						<Typography>{note.length > 80 ? note.slice(0, 80) + '...' : note}</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	)
}

const Dashboard = () => {
	const classes = useStyle()
	const state = useSelector(state => state.todo)
	const dispatch = useDispatch()

	const Msg = (
		<Alert severity={state.isSuccess ? 'success' : 'error'}>
			<AlertTitle>{state.isSuccess ? 'Successful' : 'Error Occurred'}</AlertTitle>
			{state.msg}
		</Alert>
	)
	useEffect(() => {
		dispatch(getAllNotesHandler())
	}, [dispatch])
	return (
		<Grid container>
			{state.isLogout && <Redirect to="/login" />}
			<SideBar isOpen={state.isOpen} toggler={() => dispatch(toggleHandler('sidebar'))} />
			<NavBar togller={() => dispatch(toggleHandler('sidebar'))} />

			<Button
				onClick={() => dispatch(toggleHandler('modal'))}
				className={classes.createBtn}
				color="default"
				variant="contained"
				startIcon={<NoteAddIcon />}
			>
				Create
			</Button>
			{state.errorMsg && (
				<div className={classes.alertParent}>
					<Alert severity="error">
						<AlertTitle>Error Occurred</AlertTitle>
						{state.errorMsg}
					</Alert>
				</div>
			)}
			{state.successMsg && (
				<div className={classes.alertParent}>
					<Alert severity="success">
						<AlertTitle>Successful</AlertTitle>
						{state.successMsg}
					</Alert>
				</div>
			)}

			{state.isEditNav ? (
				<BottomNavigation showLabels className={classes.editBtnNav}>
					<BottomNavigationAction
						onClick={() =>
							dispatch(
								clickToOpenModalForUpdate({
									title: state.modifyNote.title,
									note: state.modifyNote.note,
									isRunning: state.modifyNote.isRunning,
									isCompleted: state.modifyNote.isCompleted,
									_id: state.modifyNote._id,
								})
							)
						}
						label="Edit"
						value="Edit"
						icon={<EditIcon />}
					/>
					<BottomNavigationAction
						onClick={() => dispatch(noteDeleteHandler(state.modifyNote._id))}
						label="Delete"
						value="Delete"
						icon={<DeleteForeverIcon />}
					/>{' '}
					<BottomNavigationAction
						onClick={() => dispatch(noteProgressTypeHandler(state.modifyNote._id))}
						label="Running"
						value="Running"
						icon={<LoopIcon />}
					/>
					<BottomNavigationAction
						onClick={() => dispatch(noteProgressTypeHandler(state.modifyNote._id))}
						label="Complete"
						value="Complete"
						icon={<DoneIcon />}
					/>
				</BottomNavigation>
			) : (
				''
			)}

			<Modal open={state.isOnModal} onClose={() => dispatch(toggleHandler('modal'))}>
				<Fade in={state.isOnModal}>
					<div className={classes.modalStyled}>
						<h2 className={classes.modalTitle}>
							Create Todo
							<span className={classes.closeIcon} onClick={() => dispatch(toggleHandler('modal'))}>
								<CloseIcon />
							</span>
						</h2>
						{state.msg && Msg}
						<form className={classes.formStyled} onSubmit={e => dispatch(submitHandler(e))}>
							<FormControl fullWidth className={classes.yPadding}>
								<TextField label="Title" name="title" onChange={e => dispatch(changeHandler(e))} value={state.title} />
							</FormControl>
							<FormControl fullWidth className={classes.yPadding}>
								<TextField label="Note" name="note" multiline rows={10} onChange={e => dispatch(changeHandler(e))} value={state.note} />
							</FormControl>
							<Button type="submit" startIcon={<AddToPhotosIcon />} color="primary" variant="contained">
								Create
							</Button>
						</form>
					</div>
				</Fade>
			</Modal>

			<Paper square={true} variant="outlined" className={classes.paper}>
				<UpdateModal />
				{state.isLoading && <LinearProgress color="primary" />}
				<Grid container direction="row">
					{!state.isLoading &&
						state.noteLists
							.filter(list => list.title.toLowerCase().includes(state.searchTerms.toLowerCase()) && list)
							.map((list, index) => <Item list={list} key={index} />)}
				</Grid>
			</Paper>
		</Grid>
	)
}

export default Dashboard
