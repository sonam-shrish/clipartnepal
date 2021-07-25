import React, { useState } from 'react';
import { Toolbar, AppBar, useScrollTrigger, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import Search from '../ui/Search';

const useStyles = makeStyles((theme) => ({
	navbar: {
		backgroundColor: '#ADD6F2',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
	logoText: {
		textAlign: 'center',
		maxWidth: '400px',
	},
}));

const Header = () => {
	const classes = useStyles();

	return (
		<>
			<div className={classes.navbar}>
				<Button disableRipple className={classes.logoText}>
					<span className={classes.blue}>Clipart</span>
					<span className={classes.white}>Nepal</span>
				</Button>
				<Search />
			</div>
		</>
	);
};

export default Header;
