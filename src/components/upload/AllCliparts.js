import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';

import { makeStyles, IconButton, Typography, Card } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles({
	root: {
		width: '200px',
		height: '200px',
		margin: '20px 15px',
	},
	media: {
		objectFit: 'contain',
		width: '100%',
	},
	clipartsContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
});

const AllCliparts = ({ handleSnackbarOpen }) => {
	const classes = useStyles();
	const [cliparts, setCliparts] = useState([]);
	const [refreshStatus, setRefreshStatus] = useState(false);

	useEffect(() => {
		getDataArray();
		setRefreshStatus(false);
	}, [refreshStatus]);

	function getDataArray() {
		const allCliparts = [];
		db.collection('data')
			.orderBy('imgName', 'asc')
			.get()
			.then(({ docs }) => {
				docs.forEach((doc) => allCliparts.push(doc.data()));
				setCliparts(allCliparts);
			});
	}

	function handleClipartDelete(imgName, type) {
		storage
			.ref()
			.child('cliparts/' + imgName + '.' + type)
			.delete()
			.then(() => {
				console.log('image deletion successful');
				handleSnackbarOpen(true, { message: 'Deleted Successfully' });
			})
			.catch((error) => console.log('image deletion error', error));
		db.collection('data')
			.doc(imgName)
			.delete()
			.then(() => {
				console.log('data deleted');
				setRefreshStatus(true);
			})
			.catch((error) => {
				console.error('Error removing clipart: ', error);
			});
	}
	return (
		<div className={classes.clipartsContainer}>
			{cliparts.map(({ imgName, url, type }) => (
				<Card className={classes.root}>
					<IconButton aria-label='delete'>
						<Delete
							onClick={() => {
								handleClipartDelete(imgName, type);
							}}
						/>
					</IconButton>
					<center>
						<img className={classes.media} alt={imgName} src={url} />
					</center>

					<Typography>{imgName}</Typography>
				</Card>
			))}
		</div>
	);
};

export default AllCliparts;
