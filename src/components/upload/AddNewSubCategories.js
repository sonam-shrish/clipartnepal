import { useState, useEffect } from 'react';
import {
	FormControl,
	InputLabel,
	Select,
	TextField,
	Button,
	makeStyles,
	Snackbar,
	Paper,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { PhotoCamera } from '@material-ui/icons';

import firebase from 'firebase';
import { db, storage } from '../../firebase';

const useStyles = makeStyles({
	form: {
		maxWidth: '700px',
		padding: '20px',
		marginTop: '10px',
		borderRadius: '20px',
	},
	field: {
		marginTop: '10px',
	},
	uploadInput: {
		display: 'none',
	},
});

const AddNewSubCategories = ({ existingCategories, handleError }) => {
	const classes = useStyles();
	const [existingSubCategories, setExistingSubCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [subCategoryInput, setSubCategoryInput] = useState('');
	const [thumbnail, setThumbnail] = useState(null);
	const [previewURL, setPreviewURL] = useState('');
	const [progress, setProgress] = useState(0);

	//ERROR STATES
	const [errorMsg, setErrorMsg] = useState({});
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	useEffect(() => {
		if (selectedCategory) {
			db.collection('categories')
				.doc(selectedCategory)
				.onSnapshot((doc) => {
					const subCategories = [];

					console.log(doc.data());
					if (doc.data().subcategories) {
						doc.data().subcategories.forEach((subCat) => {
							subCategories.push(subCat.name);
							setExistingSubCategories(subCategories);
						});
					}
				});
		}
	}, [selectedCategory]);

	useEffect(() => {
		if (thumbnail) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setPreviewURL(reader.result);
			};

			reader.readAsDataURL(thumbnail);
		} else {
			setPreviewURL(null);
		}
	}, [thumbnail]);

	function handleThumbnailUpload(e) {
		if (e.target.files[0]) {
			let img = e.target.files[0];
			setThumbnail(img);
		}
	}

	const handleNewSubCategoryAdd = (e) => {
		e.preventDefault();
		if (!subCategoryInput || !subCategoryInput || !thumbnail) {
			handleError({
				message:
					'You missed adding a thumbnail or category name or subcategory name',
			});
		} else {
			if (existingSubCategories.includes(subCategoryInput)) {
				setErrorMsg({
					message: 'The sub-category already exists',
					severity: 'danger',
				});
				setSnackbarOpen(true);
			} else {
				const uploadTask = storage
					.ref('subcategories-thumbnails/' + subCategoryInput)
					.put(thumbnail);
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const currProgress = Math.round(
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						);
						setProgress(currProgress);
					},
					(error) =>
						setErrorMsg({ severity: 'danger', message: error.message }),
					() => {
						uploadTask.snapshot.ref.getDownloadURL().then((url) => {
							(function () {
								db.collection('categories')
									.doc(selectedCategory)
									.update({
										subcategories: firebase.firestore.FieldValue.arrayUnion({
											name: subCategoryInput,
											url,
										}),
									});
							})();
							handleError({ message: 'subcategory successfully added' });

							setProgress(0);
							setThumbnail(null);
							setSelectedCategory('');
							setSubCategoryInput('');
							console.log('File available at', url);
						});
					}
				);
			}
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			console.log(reason);
			return;
		}

		setSnackbarOpen(false);
	};

	return (
		<Paper className={classes.form}>
			<FormControl className={classes.field}>
				<input
					accept='image/*'
					id='thumbnail-upload'
					type='file'
					className={classes.uploadInput}
					onChange={handleThumbnailUpload}
				/>
				{progress ? (
					<>
						Upload Progress:{' '}
						<progress className={classes.progress} max='100' value={progress} />{' '}
					</>
				) : null}
			</FormControl>
			<FormControl fullWidth className={classes.field}>
				<label htmlFor='thumbnail-upload'>
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
					alt='preview-thumbnail'
					className={classes.preview}
					src={previewURL}
				/>
			</FormControl>
			<FormControl variant='outlined' className={classes.field}>
				<InputLabel htmlFor='outlined-age-native-simple'>Category</InputLabel>
				<Select
					native
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
					label='Category'
				>
					<option aria-label='None' value='' disabled />

					{existingCategories.map((cat) => (
						<option value={cat}>{cat}</option>
					))}
				</Select>
			</FormControl>
			{/* //add subcategories */}
			<FormControl className={classes.field}>
				<TextField
					variant='outlined'
					label='New Sub-Category Name'
					onChange={(e) => setSubCategoryInput(e.target.value)}
					value={subCategoryInput}
					placeholder='Create New Subcategory Name'
				/>
				<br></br>
			</FormControl>
			<div></div>
			<Button
				className={classes.spaced}
				onClick={handleNewSubCategoryAdd}
				variant='contained'
				color='secondary'
				type='submit'
			>
				Create New Sub Category
			</Button>

			{/* ERROR HANDLING */}

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				<Alert onClose={handleSnackbarClose} severity={errorMsg.severity}>
					{errorMsg.message}
				</Alert>
			</Snackbar>
		</Paper>
	);
};

export default AddNewSubCategories;
