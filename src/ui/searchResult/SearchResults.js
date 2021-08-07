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
});

function SearchResult(props) {
	const [results, setResults] = useState([]);

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
				if (docs[0]) {
					docs.forEach((result) => resultsArray.push(result.data()));
				}

				setResults(resultsArray);
			});
		})();
	}, [props.match.params.searchTerm]);

	return (
		<>
			<div>
				Found {results.length} result for{' '}
				<strong>{props.match.params.searchTerm}</strong>
			</div>
			<div className={classes.cliparts}>
				<br></br>
				<br></br>

				{results &&
					results.map((clipart) => (
						<ClipartCard key={clipart.imgId} clipartInfo={clipart} />
					))}
			</div>

			<br />
		</>
	);
}

export default SearchResult;
