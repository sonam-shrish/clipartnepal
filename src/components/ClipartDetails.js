import { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import {
	Card,
	makeStyles,
	CardContent,
	CardActions,
	Paper,
	IconButton,
	Chip,
	Button,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import RecentCliparts from './home/RecentCliparts';
import PopularCliparts from './home/PopularCliparts';
import ClipartCard from './ClipartCard';

import { v4 as uuidv4 } from 'uuid';
import RecentAndPopCliparts from './home/RecentAndPopCliparts';

const useStyles = makeStyles({
	cliparts: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 150px))',
		maxWidth: '980px',
		gap: '15px',
		margin: 'auto',
		justifyContent: 'center',
	},
	clipart: {
		width: '150px',
		height: '150px',
	},
	media: {
		objectFit: 'contain',
		maxWidth: '500px',
	},
	list: {
		listStyleType: 'none',
		textAlign: 'left',
	},
	card: {
		maxWidth: '900px',
		margin: 'auto',
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
});

const ClipartDetails = (props) => {
	console.log(props);
	const classes = useStyles();
	const [imgData, setImgData] = useState(null);
	const [relatedCliparts, setRelatedCliparts] = useState([]);
	const [downloadURL, setDownloadURL] = useState('');
	const imgName = props.match.params.imgName;

	// Getting Related clparts
	useEffect(() => {
		window.scrollTo(0, 0);
		db.collection('data')
			.doc(imgName)
			.get()
			.then((doc) => {
				console.log('setting the image data');
				setImgData(doc.data());

				// Handling the download part
				var xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.onload = (event) => {
					var blob = xhr.response;
					let url = URL.createObjectURL(blob);
					setDownloadURL(url);
				};
				xhr.open('GET', doc.data().url);
				xhr.send();
				console.log('is it working');
				// End of Handling the download part

				// related cliparts
				const relatedArray = [''];
				db.collection('data')
					.where('tags', 'array-contains-any', [
						...doc.data().tags,
						'test string to keep it non empty',
					])
					.limit(8)
					.get()
					.then(({ docs }) => {
						docs.forEach((doc) => relatedArray.push(doc.data()));
						setRelatedCliparts(relatedArray);
					});
			});
		// End of getting related cliparts
		console.log(uuidv4());

		function getRelatedCliparts() {}
		getRelatedCliparts();
	}, [props.match.url]);
	console.log(props.match.params.imgName);
	return (
		<div>
			{imgData ? (
				<div>
					<Card className={classes.card}>
						<div>
							<center>
								<img
									alt={imgData.imgName}
									src={imgData.url}
									className={classes.media}
								/>
							</center>
						</div>
						<div>
							<CardActions disableSpacing>
								<b>{imgData.imgName}</b>
								<div className={classes.actionBtns}>
									<a download href={imgData.url} target='_blank'>
										<IconButton
											className={classes.downloadBtn}
											aria-label='download'
										>
											<CloudDownload />
										</IconButton>
									</a>
								</div>
							</CardActions>
							<CardContent vlassName={classes.left}>
								<ul className={classes.list}>
									<li>Views: {imgData.views + 1}</li>
									<li>Downloads {imgData.downloads}</li>
									<li>
										Size: {Number.parseFloat(imgData.size).toFixed(2) + 'MB'}
									</li>
									<li>Type: {imgData.type} </li>
									<li>
										<Paper className={classes.paper}>
											<p>Sub Category</p>
											{imgData.subcategories.map((category) => (
												<Chip className={classes.chip} label={category} />
											))}
										</Paper>
									</li>
									<li>
										<Paper className={classes.paper}>
											<p>Tags</p>

											{imgData.tags
												? imgData.tags.map((tag) => (
														<Chip className={classes.chip} label={tag} />
												  ))
												: null}
											<div>
												<a download={imgData.imgName} href={downloadURL}>
													<Button variant='contained' color='primary'>
														Download
													</Button>
												</a>
											</div>
										</Paper>
									</li>
								</ul>
							</CardContent>
						</div>
					</Card>
					<br />
					<br />
					<br />
					{/* RELATED CLIPARTS */}
					<h2>Related Cliparts</h2>
					<div className={classes.cliparts}>
						{relatedCliparts
							? relatedCliparts.map((clipart) => (
									<ClipartCard
										className={classes.clipart}
										clipartInfo={clipart}
									/>
							  ))
							: null}
					</div>
					{/* END OF RELATED CLIPARTS */}
					<RecentAndPopCliparts />
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default ClipartDetails;
