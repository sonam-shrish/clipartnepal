import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core';

import { db } from '../../firebase';
import ClipartCard from '../ClipartCard';

const useStyles = makeStyles({
	cliparts: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 150px))',
		maxWidth: '980px',
		gap: '15px',
		margin: 'auto',
	},
});

const IndividualSubCategoryList = (props) => {
	const subCatWord = props.match.params.subCatName;

	const [subCategoriesItems, setSubCategoriesItems] = useState([]);

	useEffect(() => {
		const resultsArray = [];
		const results = db
			.collection('data')
			.where('subcategories', 'array-contains', subCatWord)
			.get();
		results.then(({ docs }) => {
			docs.forEach((item) => resultsArray.push(item.data()));
			setSubCategoriesItems(resultsArray);
		});
	}, [subCatWord]);

	const classes = useStyles();

	return (
		<div>
			<h2>{subCatWord.toUpperCase()}</h2>
			<div className={classes.cliparts}>
				{subCategoriesItems ? (
					subCategoriesItems.map((clipart) => (
						<ClipartCard clipartInfo={clipart} />
					))
				) : (
					<div>No Images for the sub category</div>
				)}
			</div>
		</div>
	);
};

export default IndividualSubCategoryList;
