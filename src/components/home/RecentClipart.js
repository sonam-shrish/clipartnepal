import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import ClipartCard from '../ClipartCard';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	cliparts: {
		display: 'grid',
		gridTemplateColumns: 'repeat(4, minmax(300px, 1fr))',
	},
});

const RecentCliparts = () => {
	const classes = useStyles();

	const [recentCliparts, setRecentCliparts] = useState([]);
	var docRef = db.collection('data').doc('data1');

	useEffect(() => {
		// getData();
		getDataArray();
	}, []);

	function getDataArray() {
		const popArray = [];
		const recentArr = db
			.collection('data')
			.orderBy('createdAt', 'desc')
			.limit(8)
			.get()
			.then(({ docs }) => {
				docs.forEach((doc) => popArray.push(doc.data()));
				console.log(docs[1].data());
				setRecentCliparts(popArray);
				console.log(popArray);
			});
	}

	return (
		<>
			{/* <TestCardComp info={info} /> */}
			<h2>Recent Cliparts</h2>
			<div className={classes.cliparts}>
				{recentCliparts.map((clipart) => (
					<ClipartCard clipartInfo={clipart} />
				))}
			</div>
		</>
	);
};

export default RecentCliparts;