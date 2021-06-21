/* eslint-disable no-use-before-define */
import { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
	TextField,
	Button,
	FormControl,
	Input,
	Chip,
	Paper,
} from '@material-ui/core';
import { CloudUploadIcon, PhotoCamera, Done } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { db, storage } from '../../firebase';
import AddNewCategory from './AddNewCategory';
import AddNewSubCategories from './AddNewSubCategories';
import firebase from 'firebase';

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

const textFieldHandler = (e, value) => {
	console.log(e, value);
};

export default function UploadForm() {
	console.log();

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
	const [rerender, setRerender] = useState(false);

	const classes = useStyles();

	useEffect(() => {
		setRerender(false);
		getData();
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
				});
		}

		getCategoriesArray();
	}, []);
	useEffect(() => {
		function getSubCategoriesArray() {
			const subCategoriesArr = [];
			if (uploadCategories) {
				uploadCategories.forEach((cat) => {
					db.collection('categories')
						.doc(cat)
						.get()
						.then((doc) => {
							const individualSubcats = doc.data().subcategories;
							if (individualSubcats) {
								individualSubcats.forEach((subCat) => {
									console.log(subCat);
									subCategoriesArr.push(subCat.name);
									setSubcategoriesArray(subCategoriesArr);
								});
								console.log(subCategoriesArr);
							}
						});
				});
			}
		}

		getSubCategoriesArray();
	}, [uploadCategories]);

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

	const getData = () => {
		//collectionRef
		const collRef = db.collection('data');
		collRef.get().then((coll) => {
			const docsArray = coll.docs;
			// console.log(coll.docs);
			docsArray.forEach((doc) => {
				// console.log(doc.data());
			});
		});
		// const docRef = db.collection('data').doc('data1');
		// docRef.get().then((doc) => console.log(doc.data()));
	};

	////////////////////////////////////////////INPUT FIELD CHANGE HANDLER/////////////////////////////
	function handleClipartNameChange(e) {
		e.preventDefault();
		setUploadName(e.target.value);
	}

	function handleImageUpload(e) {
		if (e.target.files[0]) {
			let img = e.target.files[0];
			setImage(img);
			setImageSize(img.size / (1024 * 1024));
			setImageType(img.type);
			console.log(img.type, img.size, img.name);
		}
		e.target.files[0] ? setImage(e.target.files[0]) : setImage(null);
	}

	function handleCategoriesInput(e, value) {
		setUploadCategories(value);
	}

	function handleSubcategoriesInput(e, value) {
		setUploadSubcategories(value);
		console.log(value);
	}

	function handleTagInput(e) {
		setTagInput(e.target.value);
	}

	function handleTagSubmit() {
		if (tagInput && !tags.includes(tagInput)) {
			console.log();
			setTags([...tags, tagInput]);
			setTagInput('');
		}
	}

	const handleTagDelete = (chipToDelete) => () => {
		setTags((chips) => chips.filter((chip) => chip !== chipToDelete));
		console.log('hello');
		console.log(chipToDelete);
		// setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
	};

	const addClipart = (e) => {
		e.preventDefault();
		//joining the spaces in the name with a hyphen
		let joinedImgName = uploadName.split(' ').join('-');
		const uploadTask = storage.ref('cliparts/' + image.name).put(image);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const currProgress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				console.log(currProgress);
				setProgress(currProgress);
			},
			(error) => setUploadError(error.message),
			() => {
				//get the download url

				uploadTask.snapshot.ref.getDownloadURL().then((url) => {
					db.collection('data').doc(joinedImgName).set({
						uploadDate: firebase.firestore.FieldValue.serverTimestamp(),
						imgName: joinedImgName,
						size: imageSize,
						type: imageType,
						categories: uploadCategories,
						subcategories: uploadSubcategories,
						views: 10,
						downloads: 10,
						tags,
						url,
					});
					setProgress(0);
					console.log('File available at', url);
				});
			}
		);
		// ADDING DATA
		// db.collection('data').doc('test').set({ test: 'testing document addition' });

		//UPDATING AN ARRAY
		const arrRef = db.collection('test').doc('testDoc');
		arrRef.update({
			tesArr: firebase.firestore.FieldValue.arrayUnion('testupdatearray2'),
		});
	};

	return (
		<center>
			<br></br>
			<Paper className={classes.form}>
				<h2>Add New Clipart</h2>
				<form onSubmit={addClipart}>
					<FormControl className={classes.field}>
						<Input
							accept='image/*'
							id='image-upload'
							type='file'
							multiple
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
						<img className={classes.preview} src={previewURL} />
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
							id='categories-input'
							options={subcategoriesArray}
							getOptionLabel={(subCatoegory) => subCatoegory}
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
			<AddNewCategory existingCategories={categoriesArray} />
			<AddNewSubCategories existingCategories={categoriesArray} />
		</center>
	);
}
