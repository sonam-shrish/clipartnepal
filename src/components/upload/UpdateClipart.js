import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { makeStyles } from '@material-ui/core';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

// icon imports
import PhotoCamera from '@material-ui/icons/PhotoCamera';
// lab imports
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
	getCategoriesArray,
	getSubCategoriesArray,
	getTags,
} from '../../apiCalls/apiCalls';

const useStyles = makeStyles({
	form: {
		maxWidth: '500px',
		padding: '20px',
		marginTop: '10px',
		borderRadius: '20px',
		margin: 'auto',
	},
	preview: {
		width: '200px',
		backgroundColor: 'grey',
	},
	field: {
		marginTop: '20px',
	},
	spaced: {
		marginTop: '20px',
		marginBottom: '20px',
	},
	chip: {
		margin: '5px',
	},
	rightSide: {
		marginLeft: '150px',
	},
});

const UpdateClipart = (props) => {
	console.log(props);
	const {
		imgDisplayName,
		categories,
		size,
		tags,
		subcategories,
		type,
		url,
		imgId,
	} = props.clipartData ? props.clipartData : {};

	const classes = useStyles();

	const [uploadName, setUploadName] = useState(imgDisplayName);

	const [categoriesArray, setCategoriesArray] = useState(categories);
	const [subCategoriesArray, setSubCategoriesArray] = useState(subcategories);
	const [tagInput, setTagInput] = useState('');
	const [tagsArray, setTagsArray] = useState(tags);

	const allCategories = getCategoriesArray();
	const allSubCategories = getSubCategoriesArray();

	function updateClipart(e) {
		e.preventDefault();

		db.collection('data').doc(imgId).update({
			imgDisplayName: uploadName,
			categories: categoriesArray,
			subcategories: subCategoriesArray,
			tags: tagsArray,
		});
		props.setOpen(false);
	}

	// ////////////////TAGS FUNCTION//////////
	function handleTagSubmit() {
		console.log('submitting tag');
		if (tagInput && !tagsArray.includes(tagInput)) {
			setTagsArray([...tagsArray, tagInput]);
			setTagInput('');
		}
	}
	const handleTagDelete = (chipToDelete) => () => {
		setTagsArray((chips) => chips.filter((chip) => chip !== chipToDelete));
	};
	//if you change or update an image it shows up here

	return (
		<Paper className={classes.form}>
			<Typography variant='h4' component='h2'>
				Update Clipart
			</Typography>
			{props.clipartData && (
				<form onSubmit={updateClipart}>
					<center>
						<img alt='preview-img' className={classes.preview} src={url} />
					</center>
					{/* Clipart Name */}

					<FormControl fullWidth className={classes.field}>
						<TextField
							size='small'
							id='outlined-basic'
							label='Clipart Name'
							placeholder='Add Clipart name'
							variant='outlined'
							onChange={(e) => setUploadName(e.target.value)}
							value={uploadName}
						/>
					</FormControl>

					{/* Categories */}
					<FormControl fullWidth className={classes.field}>
						<Autocomplete
							multiple
							id='categories-input'
							onChange={(e, value) => setCategoriesArray(value)}
							options={allCategories}
							defaultValue={categories}
							getOptionLabel={(category) => category}
							filterSelectedOptions
							renderInput={(params) => (
								<TextField
									size='small'
									{...params}
									variant='outlined'
									label='Categories'
									placeholder='Add Categories'
								/>
							)}
						/>
					</FormControl>

					{/* Sub categories */}
					<FormControl fullWidth className={classes.field}>
						<Autocomplete
							onChange={(e, value) => setSubCategoriesArray(value)}
							multiple
							id='categories-input'
							options={allSubCategories}
							defaultValue={subcategories}
							getOptionLabel={(subCategory) => subCategory}
							filterSelectedOptions
							renderInput={(params) => (
								<TextField
									size='small'
									{...params}
									variant='outlined'
									label='Sub-categories'
									placeholder='Add Sub-categories'
								/>
							)}
						/>
					</FormControl>

					<FormControl className={classes.field}>
						<TextField
							size='small'
							variant='outlined'
							label='Tag name'
							onChange={(e) => setTagInput(e.target.value)}
							value={tagInput}
							placeholder='add tag name'
						/>
						{/* tags */}
					</FormControl>
					<Button
						variant='contained'
						className={classes.field}
						onClick={handleTagSubmit}
					>
						Add Tag
					</Button>
					<div></div>
					<Paper>
						{tagsArray.map((tag) => (
							<Chip
								className={classes.chip}
								label={tag}
								onDelete={handleTagDelete(tag)}
							/>
							// Be careful I'm not passing here handleTagDelete function rather I'm causing execution. Why, do this, well, to delete the tag, i need to know the tag and if i simply pass in function NOT function call, I get event object as parameter not the object I want to delete. So, you straight up call the function and cause it to execute instantly
						))}
					</Paper>

					<center>
						<Button
							className={classes.spaced}
							variant='contained'
							onClick={() => props.setOpen(false)}
						>
							Close
						</Button>

						<Button
							className={classes.rightSide}
							onClick={updateClipart}
							variant='contained'
							color='secondary'
							type='submit'
						>
							Update
						</Button>
					</center>
				</form>
			)}
		</Paper>
	);
};

export default UpdateClipart;
