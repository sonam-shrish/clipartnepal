import { useState, useEffect } from 'react';
import { Pagination } from '@material-ui/lab';

import PopularCliparts from '../home/PopularCliparts';
import RecentCliparts from './RecentCliparts';
import { db } from '../../firebase';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	paginator: {
		margin: '30px auto',
		display: 'flex',
		justifyContent: 'center',
	},
});

const RecentAndPopCliparts = () => {
	const classes = useStyles();

	const [numberOfPaginationNumbers, setNumberOfPaginationNumbers] = useState(5);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [popularCliparts, setPopularCliparts] = useState([]);
	const [recentCliparts, setRecentCliparts] = useState([]);

	useEffect(() => {
		let indexOfLastClipart = currentPageNumber * 12 - 1;
		let indexOfFirstClipart =
			indexOfLastClipart - 12 > 0 ? indexOfLastClipart - 12 : 0;
		getRecentCliprts();
		getPopularCliparts();

		// get recent cliparts and set them
		function getRecentCliprts() {
			let recentArray = [];
			db.collection('data')
				.orderBy('uploadDate', 'desc')
				.get()
				.then(({ docs }) => {
					docs.forEach((doc) => recentArray.push(doc.data()));
					recentArray = recentArray.slice(
						indexOfFirstClipart,
						indexOfLastClipart + 1
					);
					setRecentCliparts(recentArray); // +1 because slice does not include the last
					//setting the pagination numbers
					setNumberOfPaginationNumbers(Math.ceil(docs.length / 12));
				});
		}

		//get popular cliparts and set them
		function getPopularCliparts() {
			let popArray = [];
			db.collection('data')
				.orderBy('views', 'desc')
				.limit(18)
				.get()
				.then(({ docs }) => {
					docs.forEach((doc) => popArray.push(doc.data()));
					popArray = popArray.slice(
						indexOfFirstClipart,
						indexOfLastClipart + 1
					);
					setPopularCliparts(popArray);
				});
		}
	}, [currentPageNumber]);

	function handlePageChange(event, pageNumber) {
		setCurrentPageNumber(pageNumber);
	}
	return (
		<div>
			{popularCliparts && <PopularCliparts popularCliparts={popularCliparts} />}
			<br />

			{recentCliparts && <RecentCliparts recentCliparts={recentCliparts} />}
			<div className={classes.paginator}>
				<Pagination
					count={numberOfPaginationNumbers}
					onChange={handlePageChange}
					defaultPage={1}
				/>
			</div>
		</div>
	);
};

export default RecentAndPopCliparts;
