import React, { useState } from 'react';
import {
	Toolbar,
	Typography,
	AppBar,
	useScrollTrigger,
	Tabs,
	Tab,
	Link,
	Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import logo from '../assets/logo.png';

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
	},
	logo: {
		height: '7em',
	},
	logoBtn: {
		padding: '0',
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	tabsContainer: {
		marginLeft: 'auto',
	},
	tab: {
		...theme.typography.tab,
		minWidth: 10,
		marginLeft: '25px',
	},
	button: {
		...theme.typography.estimate,
		borderRadius: '50px',
		marginLeft: '50px',
	},
}));

const Header = () => {
	const [activeTab, setActiveTab] = useState(0);
	const classes = useStyles();
	function ElevationScroll(props) {
		const { children } = props;

		const trigger = useScrollTrigger({
			disableHysteresis: true,
			threshold: 0,
		});

		return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
	}
	function handleActiveTab(e, value) {
		setActiveTab(value);
	}

	return (
		<>
			<ElevationScroll>
				<AppBar position='fixed'>
					<Toolbar>
						<Button
							disableRipple
							component={Link}
							to='/'
							className={classes.logoBtn}
						>
							<img src={logo} className={classes.logo} />
						</Button>
						<Tabs
							value={activeTab}
							onChange={handleActiveTab}
							className={classes.tabsContainer}
						>
							<Tab label='Home' className={classes.tab} />
							<Tab label='Categories' className={classes.tab} />
							<Tab label='Contact' className={classes.tab} />
							<Tab label='Artist Portfolio' className={classes.tab} />
						</Tabs>
						<Button
							variant='contained'
							color='secondary'
							className={classes.button}
							component={Link}
							to='/portfolio'
						>
							Call to Action
						</Button>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</>
	);
};

export default Header;