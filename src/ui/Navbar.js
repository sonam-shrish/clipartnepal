import React from 'react';
import { Toolbar, AppBar, useScrollTrigger, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
	},

	home: { marginLeft: 'auto', color: 'white' },
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
	const classes = useStyles();
	function ElevationScroll(props) {
		const { children } = props;

		const trigger = useScrollTrigger({
			disableHysteresis: true,
			threshold: 0,
		});

		return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
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
						<Link to='/' className={classes.home}>
							<Typography variant='h5'>Home</Typography>
						</Link>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</>
	);
};

export default Header;
