import { useEffect, useState } from 'react';

import { Route } from 'react-router-dom';

import { db } from '../../firebase';

import { makeStyles } from '@material-ui/core';

import ClipartCard from '../ClipartCard';
import SubCategoryItem from './SubCategoryItem';
import IndividualSubCategoryList from './IndividualSubCategoryList';

const useStyles = makeStyles({
	subCategoryList: {
		display: 'flex',
		flexWrap: 'wrap',
	},
});

const SubCategories = (props) => {
	console.log('rendering');
	const [subCatData, setSubCatData] = useState(null);

	let categoryName = props.match.params.catName;

	const classes = useStyles();

	useEffect(() => {
		getDataArray();
	}, [props]);

	function getDataArray() {
		db.collection('categories')
			.doc(categoryName)
			.get()
			.then((doc) => {
				console.log(doc);
				if (doc.exists) {
					const subCatArray = doc.data().subcategories;
					console.log(doc.data().subcategories);
					setSubCatData(subCatArray);
					console.log(doc);
					console.log('yeah found');
				} else {
					console.log('no results');
				}
			});
	}

	if (subCatData) {
		return (
			<div className={classes.subCategoryList}>
				<Route
					path={props.match.params + '/:subCatName'}
					component={IndividualSubCategoryList}
				/>
				{subCatData.map((data) => (
					<SubCategoryItem subCatName={data.name} url={data.url} />
				))}
			</div>
		);
	} else {
		return <>Loading</>;
	}
};

export default SubCategories;
