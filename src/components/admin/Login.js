import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { Snackbar, Button, Input } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';
import AddClipart from '../upload/AddClipart';
import AllCliparts from '../upload/AllCliparts';

import { Toolbar, Tabs, Tab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	form: {
		maxWidth: '400px',
	},
}));

function Auth({ history }) {
	const classes = useStyles();

	const [snackbarOpen, setSnackbarOpen] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [activeTab, setActiveTab] = useState(null);
	const [alertMessage, setAlertMessage] = useState(null);

	const handleSignIn = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.catch((err) => alert(err.message));
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//logged in compo
				console.log(authUser);
				setUser(authUser);
			} else {
				//logged out compo
				setUser(null);
			}
		});

		return () => {
			//perform cleanup actions
			unsubscribe();
		};
	});
	function handleActiveTab(e, value) {
		setActiveTab(value);
	}
	// SNACKBAR STUFF
	function handleSnackbarOpen(state, message) {
		setSnackbarOpen(state);
		setAlertMessage(message);
	}

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
		setAlertMessage(null);
	};

	function adminTasks() {
		switch (activeTab) {
			case 0:
				return (
					<>
						<AddClipart handleSnackbarOpen={handleSnackbarOpen} />
					</>
				);
			case 1:
				return (
					<>
						<AllCliparts handleSnackbarOpen={handleSnackbarOpen} />
						{alertMessage && (
							<Snackbar
								open={snackbarOpen}
								autoHideDuration={2500}
								onClose={handleSnackbarClose}
							>
								<Alert severity='error'> Hey joe{alertMessage.message}</Alert>
							</Snackbar>
						)}
					</>
				);
			default:
				return null;
		}
	}

	return (
		<center>
			<div className='form'>
				{!user ? (
					<div className={classes.form}>
						<form>
							<center>
								<h2>Enter the site as an admin</h2>

								<Input
									fullWidth
									type='email'
									placeholder='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Input
									fullWidth
									type='password'
									placeholder='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<Button type='submit' onClick={handleSignIn}>
									Sign In
								</Button>
							</center>
						</form>
					</div>
				) : (
					<>
						<Toolbar>
							<Tabs
								value={activeTab}
								onChange={handleActiveTab}
								variant='scrollable'
								scrollButtons='on'
							>
								<Tab label='Add Clipart' />
								<Tab label='Update Clipart' />
							</Tabs>
						</Toolbar>
						{adminTasks()}
					</>
				)}
			</div>
		</center>
	);
}

export default Auth;
