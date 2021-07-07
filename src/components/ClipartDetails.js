import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
	Card,
	makeStyles,
	CardContent,
	CardActions,
	Paper,
	IconButton,
	Chip,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import RecentCliparts from './home/RecentCliparts';
import PopularCliparts from './home/PopularCliparts';
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
	card: {
		maxWidth: '900px',
		margin: 'auto',
	},
});

const ClipartDetails = (props) => {
	console.log(props);
	const classes = useStyles();
	const [imgData, setImgData] = useState(null);
	const [relatedCliparts, setRelatedCliparts] = useState([]);

	const imgName = props.match.params.imgName;
	useEffect(() => {
		(function () {
			db.collection('data')
				.doc(imgName)
				.get()
				.then((doc) => {
					console.log('setting the image data');
					setImgData(doc.data());

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
		})();

		function getRelatedCliparts() {}
		getRelatedCliparts();
	}, [props.match.url]);
	console.log(props.match.params.imgName);
	return (
		<div>
			{imgData ? (
				<div>
					<Card className={classes.card}>
						<center>
							<img
								alt={imgData.imgName}
								src={imgData.url}
								className={classes.media}
							/>
						</center>
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
									</Paper>
								</li>
							</ul>
						</CardContent>
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
					<PopularCliparts />
					<RecentCliparts />
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default ClipartDetails;
