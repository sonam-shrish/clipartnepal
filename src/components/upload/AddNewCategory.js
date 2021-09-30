import { useState } from 'react';
import { FormControl, TextField, Button, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core';

import { db } from '../../firebase';
import AddNewSubCategories from './AddNewSubCategories';

const useStyles = makeStyles({
	field: { marginTop: '20px' },
	form: {
		maxWidth: '700px',
		padding: '20px',
		marginTop: '10px',
		borderRadius: '20px',
	},
});

const AddNewCategory = ({ existingCategories, handleError }) => {
	const classes = useStyles();

	const [newCat, setNewCat] = useState('');

	function handleAddCategory() {
		const checkIfExisting = existingCategories.includes(newCat);
		if (!newCat) {
			handleError({ message: 'Add category name' });
		} else {
			if (!checkIfExisting) {
				db.collection('categories').doc(newCat.toLowerCase()).set({});
				handleError({ message: 'Category added successfully' });

				setNewCat('');
			} else {
				handleError({ message: 'Category already exists' });
			}
		}
	}

	// console.log(existingCategories);
	return (
		<>
			<Paper className={classes.form}>
				<FormControl fullWidth className={classes.field}>
					<TextField
						label='New Category Name'
						placeholder=' New Category Name '
						variant='outlined'
						onChange={(e) => setNewCat(e.target.value)}
						value={newCat}
					/>
					<br></br>

					<Button
						className={classes.spaced}
						onClick={handleAddCategory}
						variant='contained'
						color='secondary'
					>
						Create New Category
					</Button>
				</FormControl>
			</Paper>
		</>
	);
};

export default AddNewCategory;
