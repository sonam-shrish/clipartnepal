import { useEffect, useState } from 'react';
import { db } from '../../firebase';

import { makeStyles } from '@material-ui/core';

import ClipartCard from '../ClipartCard';
import SubCategoryItem from './SubCategoryItem'

const useStyles = makeStyles({
	cliparts: {
		display: 'grid',
		gridTemplateColumns: 'repeat(4, minmax(300px, 1fr))',
	},
});

const SubCategory = () => {
	const [subCatData, setSubCatData] = useState(null)



	const classes = useStyles();

	const [popularCliparts, setPopularCliparts] = useState([]);

	useEffect(() => {
		// getData();
		getDataArray();
	}, []);

	function getDataArray() {
		db.collection('categories')
			.doc('animal')
			.get()
			.then((doc) => {
			const subCatArray = doc.data().subcategories
				console.log(doc.data().subcategories)
				setSubCatData(subCatArray);
			});
	}

	if(subCatData) {
		return (
			<>
			{subCatData.map(data => <SubCategoryItem subCatName={data.name} url={data.url} />)}
			</>
		)
	} else {
		return (
			<>Loading</>
		)
	}

};

export default SubCategory;
