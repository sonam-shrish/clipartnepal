import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import ClipartCard from '../ClipartCard';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	cliparts: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 150px))',
		maxWidth: '980px',
		gap: '15px',
		margin: 'auto',
		justifyContent: 'center',
	},
	clipart: {
		width: '150px',
		height: '150px',
	},
	recent: {
		marginTop: '50px',
	},
});

const RecentCliparts = ({ recentCliparts }) => {
	const classes = useStyles();

	return (
		<>
			<h2 className={classes.recent}>Recent Cliparts</h2>
			<br />
			{recentCliparts && (
				<div className={classes.cliparts}>
					{recentCliparts.map((clipart) => (
						<ClipartCard className={classes.clipart} clipartInfo={clipart} />
					))}
				</div>
			)}
		</>
	);
};

export default RecentCliparts;
