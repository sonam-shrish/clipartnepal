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
	},
	clipart: {
		width: '150px',
		height: '150px',
	},
});

const PopularCliparts = () => {
	const classes = useStyles();

	const [popularCliparts, setPopularCliparts] = useState([]);

	useEffect(() => {
		function getDataArray() {
			const popArray = [];
			const popularArr = db
				.collection('data')
				.orderBy('views', 'desc')
				.limit(8)
				.get()
				.then(({ docs }) => {
					docs.forEach((doc) => popArray.push(doc.data()));
					setPopularCliparts(popArray);
				});
		}
		getDataArray();
	}, []);

	return (
		<>
			<h2>Popular Cliparts</h2>
			<div className={classes.cliparts}>
				{popularCliparts.map((clipart) => (
					<ClipartCard className={classes.clipart} clipartInfo={clipart} />
				))}
			</div>
		</>
	);
};

export default PopularCliparts;
