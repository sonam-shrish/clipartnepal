import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { db } from '../firebase';

import ClipartCard from './ClipartCard';

import './SearchBar.css';

const useStyles = makeStyles({
	cliparts: {
		display: 'grid',
		gridTemplateColumns: 'repeat(4, minmax(300px, 1fr))',
	},
});

function SearchBar() {
	const [searchText, setSearchText] = useState('');
	const [results, setResults] = useState([]);

	const classes = useStyles();

	function handleSearchSubmit(e) {
		e.preventDefault();
		const resultsArray = [];
		const results = db
			.collection('data')
			// .where('imgName', '==', 'testimg')
			.where('tags', 'array-contains', searchText)
			.get();
		results.then(({ docs }) => {
			docs.forEach((result) => resultsArray.push(result.data()));
			console.log(resultsArray);

			setResults(resultsArray);
		});
	}

	function handleInput(e) {
		setSearchText(e.target.value);
	}

	return (
		<>
			<form onSubmit={handleSearchSubmit}>
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

			<div className={classes.cliparts}>
				{results.map((clipart) => (
					<ClipartCard clipartInfo={clipart} />
				))}
			</div>
		</>
	);
}

export default SearchBar;
