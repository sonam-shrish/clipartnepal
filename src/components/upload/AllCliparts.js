import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';

import { makeStyles, IconButton, Typography, Card } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles({
	root: {
		maxWidth: 300,
		maxHeight: '400px',
		overflow: 'auto',
		margin: '10px 15px',
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

const AllCliparts = () => {
	const classes = useStyles();
	const [cliparts, setCliparts] = useState([]);

	useEffect(() => {
		getDataArray();
	}, []);

	function getDataArray() {
		const allCliparts = [];
		db.collection('data')
			.orderBy('imgName', 'asc')
			.get()
			.then(({ docs }) => {
				docs.forEach((doc) => allCliparts.push(doc.data()));
				setCliparts(allCliparts);
				console.log(allCliparts);
			});
	}

	function handleClipartDelete(imgName, type) {
		storage
			.ref()
			.child('cliparts/' + imgName + '.' + type)
			.delete()
			.then(() => console.log('deletion successful'))
			.catch((error) => console.log('deletion error', error));
		db.collection('data')
			.doc(imgName)
			.delete()
			.then(() => {
				console.log('clipart doc successfully deleted!');
			})
			.catch((error) => {
				console.error('Error removing clipart: ', error);
			});

		console.log(imgName);
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
