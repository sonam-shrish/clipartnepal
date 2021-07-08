import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { db } from '../firebase';

import ClipartCard from './ClipartCard';

import './SearchBar.css';

const useStyles = makeStyles({
	cliparts: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	searchForm: {
		marginTop: '2em',
	},
});

function SearchBar({ history }) {
	const [searchText, setSearchText] = useState('');
	const [results, setResults] = useState([]);
	const [error, setError] = useState('empty');

	const classes = useStyles();

	function handleSearchSubmit(e) {
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
			console.log(resultsArray);

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
				<div className='searchContainer'>
					<div class='search active'>
						<div class='icon'></div>

						<div class='input'>
							<input
								type='text'
								placeholder='Search...'
								id='mysearch'
								value={searchText}
								onChange={handleInput}
							/>
						</div>
					</div>
				</div>
			</form>
			<br />
			<br />

			<div className={classes.cliparts}>
				{results &&
					results.map((clipart) => <ClipartCard clipartInfo={clipart} />)}
			</div>
			{error && error.message == 'empty' ? (
				<>
					No Results for<strong> {searchText} </strong>
					<br />
				</>
			) : null}
			<br />
		</>
	);
}

export default withRouter(SearchBar);
