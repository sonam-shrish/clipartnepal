import React, { useState } from 'react';
import {
	Toolbar,
	AppBar,
	useScrollTrigger,
	Tabs,
	Tab,
	Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
	},

	tabsContainer: {
		marginLeft: 'auto',
	},
	tab: {
		...theme.typography.tab,
		minWidth: 10,
		marginLeft: '25px',
		color: 'white',
	},

	blue: {
		color: '#87B4D3',
		textTransform: 'lowercase',
		fontSize: '2em',
	},
	white: {
		color: 'white',
		fontSize: '2em',
		textTransform: 'lowercase',
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
						<Link to='/'>
							<Button disableRipple className={classes.logoBtn}>
								<span className={classes.blue}>Clipart</span>
								<span className={classes.white}>Nepal</span>
							</Button>
						</Link>

						<Tabs
							value={activeTab}
							onChange={handleActiveTab}
							className={classes.tabsContainer}
						>
							<Tab
								label='Home'
								className={classes.tab}
								component={Link}
								to='/'
							/>
						</Tabs>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</>
	);
};

export default Header;
