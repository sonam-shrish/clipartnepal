import React from 'react';
import { Link } from 'react-router-dom';

import CopyrightIcon from '@material-ui/icons/Copyright';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	footer: { position: 'absolute', bottom: '0', width: '100%' },
});

const Footer = () => {
	const classes = useStyles();

	return (
		<>
			{/* //{' '}
			<footer className={classes.footer}>
				//{' '}
				<center>
					// <CopyrightIcon /> All Rights Reserved. //{' '}
					<Link to='/' style={{ textDecoration: 'none' }}>
						// clipartnepal.com //{' '}
					</Link>
					//{' '}
				</center>
				//{' '}
			</footer> */}
		</>
	);
};

export default Footer;
