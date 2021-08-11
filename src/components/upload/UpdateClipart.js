import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { makeStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

// lab imports
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getCategoriesArray } from '../../apiCalls/apiCalls';

const useStyles = makeStyles({
	form: {
		maxWidth: '500px',
		padding: '20px',
		marginTop: '10px',
		borderRadius: '20px',
		margin: 'auto',
		overflow: 'auto',
		maxHeight: '90vh',
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
	const {
		imgDisplayName,
		imgDescription,
		categories,
		tags,
		subcategories,
		url,
		imgId,
	} = props.clipartData ? props.clipartData : {};

	const classes = useStyles();

	const [uploadName, setUploadName] = useState(imgDisplayName);

	const [categoriesArray, setCategoriesArray] = useState(categories);
	const [subCategoriesArray, setSubCategoriesArray] = useState(subcategories);
	const [tagInput, setTagInput] = useState('');
	const [tagsArray, setTagsArray] = useState(tags);
	const [uploadDescription, setUploadDescription] = useState(imgDescription);
	const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);

	const allCategories = getCategoriesArray();

	useEffect(() => {
		function getSubCategoriesOptions() {
			let subCategoriesArr = [];

			if (categoriesArray) {
				categoriesArray.forEach((cat) => {
					db.collection('categories')
						.doc(cat)
						.onSnapshot((doc) => {
							let individualSubcats = doc.data().subcategories;
							if (individualSubcats) {
								individualSubcats.forEach((subCat) => {
									subCategoriesArr.push(subCat.name);
								});
							}
							subCategoriesArr
								? setSubCategoriesOptions(subCategoriesArr)
								: setSubCategoriesOptions([]);
						});
				});
			}
		}

		getSubCategoriesOptions();
	}, [categoriesArray]);

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

					{/* Clipart Description */}
					<FormControl fullWidth className={classes.field}>
						<TextField
							multiline
							label='Clipart Description'
							placeholder='Add Description'
							rows={3}
							variant='outlined'
							onChange={(e) => setUploadDescription(e.target.value)}
							value={uploadDescription}
						/>
					</FormControl>

					{/* Categories */}
					<FormControl fullWidth className={classes.field}>
						<Autocomplete
							multiple
							id='categories-input'
							onChange={(e, value) => {
								setCategoriesArray(value);
							}}
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
							options={subCategoriesOptions}
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
								key={Math.random()}
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
