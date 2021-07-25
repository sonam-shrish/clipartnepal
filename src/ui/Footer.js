import React from 'react';
// import { Link } from 'react-router-dom';

import CopyrightIcon from '@material-ui/icons/Copyright';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	footer: { marginTop: 'auto' },
});

const Footer = () => {
	const classes = useStyles();

	return (
		<>
			<footer className={classes.footer}>
				<center>
					<CopyrightIcon /> All Rights Reserved. ClipartNepal
				</center>
			</footer>
		</>
	);
};

export default Footer;
