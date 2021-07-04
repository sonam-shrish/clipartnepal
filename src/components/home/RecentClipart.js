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

const RecentCliparts = () => {
	const classes = useStyles();

	const [recentCliparts, setRecentCliparts] = useState([]);

	useEffect(() => {
		function getDataArray() {
			const popArray = [];
			const recentArr = db
				.collection('data')
				.orderBy('uploadDate', 'desc')
				.limit(18)
				.get()
				.then(({ docs }) => {
					docs.forEach((doc) => popArray.push(doc.data()));
					setRecentCliparts(popArray);
				});
		}
		getDataArray();
	}, []);

	return (
		<>
			<h2 className={classes.recent}>Recent Cliparts</h2>
			<div className={classes.cliparts}>
				{recentCliparts.map((clipart) => (
					<ClipartCard className={classes.clipart} clipartInfo={clipart} />
				))}
			</div>
		</>
	);
};

export default RecentCliparts;
