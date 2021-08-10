import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
	Card,
	makeStyles,
	CardContent,
	Paper,
	Chip,
	Button,
	Typography,
} from '@material-ui/core';

import { CloudDownload, Cloud, Visibility, Image } from '@material-ui/icons';
import {
	FacebookShareButton,
	FacebookIcon,
	FacebookMessengerShareButton,
	FacebookMessengerIcon,
	TwitterShareButton,
	TwitterIcon,
	PinterestShareButton,
	PinterestIcon,
} from 'react-share';
import RecentAndPopCliparts from './home/RecentAndPopCliparts';
import ClipartCard from './ClipartCard';

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
	chip: {
		margin: '5px',
	},
	card: {
		maxWidth: '900px',
		margin: 'auto',
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	imgDescription: {
		maxWidth: '250px',
	},
	socialShare: {
		display: 'flex',
		gap: '10px',
		justifyContent: 'center',
	},
});

const ClipartDetails = (props) => {
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
				// End of Handling the download part

				// related cliparts
				const relatedArray = [];
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
	}, [props.match.url, imgName]);

	function handleDownloadCount() {
		let newDownloads = imgData.downloads + 1;
		db.collection('data')
			.doc(imgData.imgId)
			.update({ downloads: newDownloads });
	}
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
								{/* DOWNLOAD BUTTON */}
								<div onClick={handleDownloadCount}>
									<a download={imgData.imgName} href={downloadURL}>
										<Button variant='contained' color='primary'>
											Download
										</Button>
									</a>
								</div>
								<br />

								{/* SOCIAL SHARES */}
								<div className={classes.socialShare}>
									<FacebookMessengerShareButton url={imgData.url}>
										<FacebookMessengerIcon size={30} round={true} />
									</FacebookMessengerShareButton>
									<FacebookShareButton url={imgData.url}>
										<FacebookIcon size={30} round={true} />
									</FacebookShareButton>
									<TwitterShareButton url={imgData.url}>
										<TwitterIcon size={30} round={true} />
									</TwitterShareButton>
									<PinterestShareButton>
										<PinterestIcon size={30} round={true} />
									</PinterestShareButton>
								</div>
							</center>
						</div>
						<div>
							{/*CLIPART DETAILS */}

							<CardContent className={classes.left}>
								<Typography variant='h3'>{imgData.imgDisplayName}</Typography>

								<ul className={classes.list}>
									<li className={classes.imgDescription}>
										<Typography variant='h6'>Description</Typography>
										<Typography variant='subtitle1'>
											{imgData.imgDescription}
										</Typography>
									</li>
									<li>
										<Visibility />
										{'  '}
										Views: {'  ' + imgData.views}
									</li>
									<li>
										<CloudDownload />
										{'  '}
										Downloads: {'  ' + imgData.downloads}
									</li>
									<li>
										<Cloud />
										{'  '}
										Size:{' '}
										{'  ' + Number.parseFloat(imgData.size).toFixed(2) + 'MB'}
									</li>
									<li>
										<Image />
										{'  '}
										Type: {imgData.type}{' '}
									</li>
									<li>
										<br />
										<Paper className={classes.paper}>
											<p>Sub Category</p>
											{imgData.subcategories.map((category) => (
												<Chip
													key={Math.random()}
													className={classes.chip}
													label={category}
												/>
											))}
										</Paper>
										<br />
									</li>
									<li>
										<Paper className={classes.paper}>
											<p>Tags</p>

											{imgData.tags
												? imgData.tags.map((tag) => (
														<Chip
															className={classes.chip}
															key={Math.random()}
															label={tag}
														/>
												  ))
												: null}
											<div></div>
										</Paper>
										<br />
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
										key={clipart.imgId}
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
