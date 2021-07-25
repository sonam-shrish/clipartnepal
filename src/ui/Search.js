import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { db } from '../firebase';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

import './SearchBar.css';

const useStyles = makeStyles({
	searchForm: {
		padding: '20px 20px',
	},
	inputField: {
		backgroundColor: 'white',
		borderRadius: '5px',
		paddingRight: '0',
	},
});

function Search(props) {
	const [searchText, setSearchText] = useState('');
	const [results, setResults] = useState([]);
	const [error, setError] = useState('empty');

	const classes = useStyles();

	function handleSearchSubmit(e) {
		props.history.push('/search/' + searchText);

		e.preventDefault();
		const resultsArray = [];
		const results = db
			.collection('data')
			.where('tags', 'array-contains', searchText.toLowerCase())
			.get();
		results.then(({ docs }) => {
			if (!docs[0]) {
				setError({ message: 'empty' });
			}
			docs.forEach((result) => resultsArray.push(result.data()));

			setResults(resultsArray);
		});
	}

	function handleInput(e) {
		setSearchText(e.target.value);
		setError(null);
	}

	return (
		<>
			<form onSubmit={handleSearchSubmit} className={classes.searchForm}>
				<TextField
					variant='outlined'
					placeholder='Search Clipart'
					onChange={handleInput}
					className={classes.inputField}
					size='small'
				/>
				<Button
					variant='contained'
					color='primary'
					onClick={handleSearchSubmit}
				>
					Search
				</Button>
			</form>
		</>
	);
}

export default withRouter(Search);
