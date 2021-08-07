/* eslint-disable no-use-before-define */
import { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
	TextField,
	Button,
	FormControl,
	Chip,
	Paper,
	Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { db, storage } from '../../firebase';
import AddNewCategory from './AddNewCategory';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
	uploadInput: {
		display: 'none',
	},
	form: {
		maxWidth: '700px',
		padding: '20px',
		marginTop: '10px',
		borderRadius: '20px',
	},
	preview: {
		width: '100%',
		backgroundColor: 'grey',
	},
	field: {
		marginTop: '20px',
	},
	spaced: {
		marginTop: '20px',
		marginBottom: '20px',
	},
	progress: {
		width: '100%',
	},
});

export default function AddClipart() {
	const [categoriesArray, setCategoriesArray] = useState([]);
	const [subcategoriesArray, setSubcategoriesArray] = useState([]);
	const [image, setImage] = useState(null);
	const [imageSize, setImageSize] = useState(0);
	const [imageType, setImageType] = useState(null);
	const [previewURL, setPreviewURL] = useState('');
	const [uploadName, setUploadName] = useState('');
	const [uploadCategories, setUploadCategories] = useState([]);
	const [uploadSubcategories, setUploadSubcategories] = useState([]);
	const [tagInput, setTagInput] = useState('');
	const [tags, setTags] = useState([]);
	const [progress, setProgress] = useState(0);
	const [uploadError, setUploadError] = useState(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const classes = useStyles();
	useEffect(() => {
		setUploadError(null);
	}, []);

	useEffect(() => {
		/////////////////////////////////////////////GETTING OPTIONS FOR AUTOCOMPLETE

		function getCategoriesArray() {
			const categoriesArr = [];

			db.collection('categories')
				.get()
				.then(({ docs }) => {
					docs.forEach((cat) => categoriesArr.push(cat.id));
					setCategoriesArray(categoriesArr);
				})
				.catch((error) => console.log(error));
		}

		getCategoriesArray();
	}, [uploadError]);

	//get upload sub categories
	useEffect(() => {
		function getSubCategoriesArray() {
			const subCategoriesArr = [];
			if (uploadCategories) {
				uploadCategories.forEach((cat) => {
					db.collection('categories')
						.doc(cat)

						.onSnapshot((doc) => {
							const individualSubcats = doc.data().subcategories;
							if (individualSubcats) {
								individualSubcats.forEach((subCat) => {
									subCategoriesArr.push(subCat.name);
									setSubcategoriesArray(subCategoriesArr);
								});
							}
						});
				});
			}
		}

		getSubCategoriesArray();
	}, [uploadCategories]);

	//handle image upload to the browser NOT server
	useEffect(() => {
		if (image) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setPreviewURL(reader.result);
			};

			reader.readAsDataURL(image);
		} else {
			setPreviewURL(null);
		}
	}, [image]);

	// HANDLE ALL KINDS OF UPLOAD ERRORS
	function handleError(error) {
		setUploadError(error);
		setSnackbarOpen(true);
	}

	////////////////////////////////////////////INPUT FIELD CHANGE HANDLER/////////////////////////////
	function handleImageUpload(e) {
		if (e.target.files[0]) {
			let img = e.target.files[0];
			let imgType = img.type.split('/')[1];
			setImage(img);
			setImageSize(img.size / (1024 * 1024));

			setImageType(imgType);
		}
		e.target.files[0] ? setImage(e.target.files[0]) : setImage(null);
	}

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	};

	function handleClipartNameChange(e) {
		e.preventDefault();
		setUploadName(e.target.value);
	}

	function handleCategoriesInput(e, value) {
		setUploadCategories(value);
	}

	function handleSubcategoriesInput(e, value) {
		setUploadSubcategories(value);
	}

	function handleTagInput(e) {
		setTagInput(e.target.value);
	}

	function handleTagSubmit() {
		//tag submit
		if (tagInput && !tags.includes(tagInput)) {
			setTags([...tags, tagInput]);
			setTagInput('');
		} else if (!tagInput) {
			setUploadError({
				severity: '',
				message: 'Enter tag name first!',
			});
		} else if (tags.includes(tagInput)) {
			setUploadError({
				message: 'Tag already exists!',
			});
		} else {
			setUploadError({
				message: 'Error Adding the tag',
			});
		}
	}

	const handleTagDelete = (chipToDelete) => () => {
		setTags((chips) => chips.filter((chip) => chip !== chipToDelete));
	};

	const addClipart = (e) => {
		e.preventDefault();
		//form validation
		if (!image) {
			setUploadError({ message: 'Please add a clipart image' });
			setSnackbarOpen(true);
		} else if (!uploadName) {
			setUploadError({ message: 'Please enter clipart name!' });
			setSnackbarOpen(true);

			return;
		} else if (!uploadCategories) {
			setUploadError({ message: 'Add at least one category' });
			setSnackbarOpen(true);

			return;
		} else if (!uploadSubcategories) {
			setUploadError({ message: 'Add at least one sub-category' });
			setSnackbarOpen(true);

			return;
		} else if (!image) {
			setUploadError({ message: 'Add clipart/image first' });
			setSnackbarOpen(true);

			return;
		} else {
			const imgId = uuidv4();
			const uploadTask = storage
				.ref('cliparts/' + uploadName + '.' + imageType)
				.put(image);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const currProgress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(currProgress);
				},
				(error) => setUploadError(error.message),
				() => {
					//get the download url

					uploadTask.snapshot.ref.getDownloadURL().then((url) => {
						db.collection('data').doc(imgId).set({
							imgId,
							uploadDate: firebase.firestore.FieldValue.serverTimestamp(),
							imgDisplayName: uploadName,
							size: imageSize,
							type: imageType,
							categories: uploadCategories,
							subcategories: uploadSubcategories,
							views: 0,
							downloads: 0,
							tags,
							url: url,
						});

						setProgress(0);
						setImage(null);
						setUploadCategories([]);
						setUploadSubcategories([]);
						setUploadName('');
						setTags([]);
					});
				}
			);
		}
	};
	const errorSnackbar = () => {
		if (uploadError) {
			return (
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={2500}
					onClose={handleSnackbarClose}
				>
					<Alert severity='error'>{uploadError.message}</Alert>
				</Snackbar>
			);
		} else {
			return null;
		}
	};

	return (
		<center>
			<br />
			<AddNewCategory
				handleError={handleError}
				existingCategories={categoriesArray}
			/>

			<Paper className={classes.form}>
				<h2>Add New Clipart</h2>
				<form onSubmit={addClipart}>
					<FormControl className={classes.field}>
						<input
							accept='image/*'
							id='image-upload'
							type='file'
							className={classes.uploadInput}
							onChange={handleImageUpload}
						/>
					</FormControl>
					<FormControl fullWidth className={classes.field}>
						<label htmlFor='image-upload'>
							<Button
								color='primary'
								variant='contained'
								aria-label='upload picture'
								component='span'
							>
								Upload
								<PhotoCamera />
							</Button>
						</label>
						<img
							alt='preview-img'
							className={classes.preview}
							src={previewURL}
						/>
						{progress ? (
							<>
								Upload Progress:{' '}
								<progress
									className={classes.progress}
									max='100'
									value={progress}
								/>{' '}
							</>
						) : null}
					</FormControl>

					<FormControl fullWidth className={classes.field}>
						<TextField
							id='outlined-basic'
							label='Clipart Name'
							placeholder='Add Clipart name'
							variant='outlined'
							onChange={handleClipartNameChange}
							value={uploadName}
						/>
					</FormControl>

					<FormControl fullWidth className={classes.field}>
						<Autocomplete
							key={Math.random()}
							multiple
							id='categories-input'
							onChange={handleCategoriesInput}
							options={categoriesArray}
							getOptionLabel={(category) => category}
							filterSelectedOptions
							renderInput={(params) => (
								<TextField
									{...params}
									variant='outlined'
									label='Categories'
									placeholder='Add Categories'
								/>
							)}
						/>
					</FormControl>

					<FormControl fullWidth className={classes.field}>
						<Autocomplete
							onChange={handleSubcategoriesInput}
							multiple
							id='subcategories-input'
							options={subcategoriesArray}
							getOptionLabel={(subCategory) => subCategory}
							filterSelectedOptions
							renderInput={(params) => (
								<TextField
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
							variant='outlined'
							label='Tag name'
							onChange={handleTagInput}
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
						{tags.map((tag) => (
							<Chip label={tag} onDelete={handleTagDelete(tag)} />
							// Be careful I'm not passing here handleTagDelete function rather I'm causing execution. Why, do this, well, to delete the tag, i need to know the tag and if i simply pass in function NOT function call, I get event object as parameter not the object I want to delete. So, you straight up call the function and cause it to execute instantly
						))}
					</Paper>
					<Button
						className={classes.spaced}
						onClick={addClipart}
						variant='contained'
						color='secondary'
						type='submit'
					>
						Add Clipart
					</Button>
				</form>
			</Paper>

			{errorSnackbar()}
		</center>
	);
}
