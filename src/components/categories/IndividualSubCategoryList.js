import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core';

import { db } from '../../firebase';
import ClipartCard from '../ClipartCard';

const useStyles = makeStyles({
	cliparts: {
		display: 'grid',
		gridTemplateColumns: 'repeat(4, minmax(300px, 1fr))',
	},
});

const IndividualSubCategoryList = (props) => {
	const subCatWord = props.match.params.subCatName;

	const [subCategoriesItems, setSubCategoriesItems] = useState([]);

	useEffect(() => {
		const resultsArray = [];
		const results = db
			.collection('data')
			// .where('imgName', '==', 'testimg')
			.where('subcategories', 'array-contains', subCatWord)
			.get();
		results.then(({ docs }) => {
			docs.forEach((item) => resultsArray.push(item.data()));
			console.log(resultsArray);
			setSubCategoriesItems(resultsArray);
			console.log('hello');
		});
	}, []);
	console.log(subCatWord);

	const classes = useStyles();

	return (
		<div>
			<h2>{subCatWord.toUpperCase()}</h2>
			<div className={classes.cliparts}>
				{subCategoriesItems.map((clipart) => (
					<ClipartCard clipartInfo={clipart} />
				))}
			</div>
		</div>
	);
};

export default IndividualSubCategoryList;
