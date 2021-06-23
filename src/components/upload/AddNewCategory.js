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
						placeholder='Add New Category '
						variant='outlined'
						onChange={(e) => setNewCat(e.target.value)}
						value={newCat}
					/>

					<Button
						className={classes.spaced}
						onClick={handleAddCategory}
						variant='contained'
						color='secondary'
					>
						Add Category
					</Button>
				</FormControl>
			</Paper>
			<AddNewSubCategories
				existingCategories={existingCategories}
				handleError={handleError}
			/>
		</>
	);
};

export default AddNewCategory;
