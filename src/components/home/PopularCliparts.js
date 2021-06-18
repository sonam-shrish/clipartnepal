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

const PopularCliparts = () => {
	const classes = useStyles();

	const [popularCliparts, setPopularCliparts] = useState([]);

	useEffect(() => {
		// getData();
		getDataArray();
	}, []);

	function getDataArray() {
		const popArray = [];
		const popularArr = db
			.collection('data')
			.orderBy('views', 'desc')
			.limit(8)
			.get()
			.then(({ docs }) => {
				docs.forEach((doc) => popArray.push(doc.data()));
				console.log(docs[1].data());
				setPopularCliparts(popArray);
				console.log(popArray);
			});
	}

	return (
		<>
			<h2>Popular Cliparts</h2>
			<div className={classes.cliparts}>
				{popularCliparts.map((clipart) => (
					<ClipartCard clipartInfo={clipart} />
				))}
			</div>
		</>
	);
};

export default PopularCliparts;
