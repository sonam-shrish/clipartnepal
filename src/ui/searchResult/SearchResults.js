import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { db } from '../../firebase';
import ClipartCard from '../../components/ClipartCard';

const useStyles = makeStyles({
	cliparts: {
		display: 'flex',
		flexWrap: 'wrap',
		padding: '20px 100px',
	},
	searchForm: {
		marginTop: '2em',
	},
});

function SearchResult(props) {
	const [searchText, setSearchText] = useState('');
	const [results, setResults] = useState([]);
	const [error, setError] = useState('empty');

	const classes = useStyles();
	useEffect(() => {
		(function () {
			const resultsArray = [];
			const results = db
				.collection('data')
				.where(
					'tags',
					'array-contains',
					props.match.params.searchTerm.toLowerCase()
				)
				.get();
			results.then(({ docs }) => {
				if (!docs[0]) {
					setError({ message: 'empty' });
				}
				docs.forEach((result) => resultsArray.push(result.data()));

				setResults(resultsArray);
			});
		})();
	}, [props.match.params.searchTerm]);

	return (
		<>
			<div className={classes.cliparts}>
				{results &&
					results.map((clipart) => <ClipartCard clipartInfo={clipart} />)}
			</div>
			<div>
				No more results for <strong>{props.match.params.searchTerm}</strong>
			</div>
			{/* {error && error.message == 'empty' ? (
				<>
					No More Results for<strong> {props.match.params.searchTerm} </strong>
					<br />
				</>
			) : null} */}
			<br />
		</>
	);
}

export default SearchResult;
