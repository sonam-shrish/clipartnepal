import { useEffect, useState } from 'react';
import { db } from '../firebase';
import ClipartCard from './ClipartCard';

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

const RelatedCliparts = ({ relatedCliparts }) => {
	const classes = useStyles();

	// useEffect(() => {
	// 	function getRelatedCliparts() {
	// 		console.log(props);
	// 		const popArray = [];
	// 		const popularArr = db
	// 			.collection('data')

	// 			.where('tags', 'array-contains-any', ['tags'])
	// 			.limit(8)
	// 			.get()
	// 			.then(({ docs }) => {
	// 				docs.forEach((doc) => popArray.push(doc.data()));
	// 				setRelatedCliparts(popArray);
	// 			});
	// 	}
	// 	getRelatedCliparts();
	// }, []);

	return <></>;
};

export default RelatedCliparts;
