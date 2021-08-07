import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';

import { makeStyles, IconButton, Typography, Card } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';
import UpdateClipart from './UpdateClipart';

const useStyles = makeStyles({
	root: {
		width: '200px',
		height: '200px',
		margin: '20px 15px',
	},
	modal: {
		overflow: 'auto',
		margin: 'auto',
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
	const [open, setOpen] = useState(false);
	const [selectedClipartData, setSelectedClipartData] = useState(null);

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
			<div>
				<Modal open={open} onClose={() => setOpen(false)}>
					<div>
						{selectedClipartData && (
							<UpdateClipart
								setOpen={setOpen}
								clipartData={selectedClipartData}
							/>
						)}
					</div>
				</Modal>
			</div>

			{cliparts.map((clipartData) => (
				<Card
					key={clipartData.imgId}
					className={classes.root}
					onClick={() => {
						setSelectedClipartData(clipartData);
						setOpen(true);
					}}
				>
					<div>
						<IconButton
							aria-label='delete'
							onClick={() => {
								handleClipartDelete(clipartData.imgId, clipartData.type);
							}}
						>
							<Delete />
						</IconButton>
						<center>
							<img
								className={classes.media}
								alt={clipartData.imgName}
								src={clipartData.url}
							/>
						</center>

						<Typography>{clipartData.imgName}</Typography>
					</div>
				</Card>
			))}
		</div>
	);
};

export default AllCliparts;
