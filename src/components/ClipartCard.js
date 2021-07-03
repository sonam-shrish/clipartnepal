//Complete card small

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CloudDownload } from '@material-ui/icons';
import { Modal, CardContent, Typography } from '@material-ui/core';
import { IconButton, Card, CardActions, Chip, Paper } from '@material-ui/core';

import { db } from '../firebase';
import { withRouter, Route, Link } from 'react-router-dom';

import ClipartDetails from './ClipartDetails';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '150px',
		height: '150px',
		overflow: 'auto',
	},
	media: {
		objectFit: 'contain',
		width: '100%',
	},

	downloadBtn: {
		marginLeft: 'auto',
	},

	actionBtns: {
		marginLeft: 'auto',
	},
	list: {
		listStyleType: 'none',
		textAlign: 'left',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalCard: {
		width: '400px',
		maxWidth: '400px',
		maxHeight: '550px',
		overflow: 'auto',
	},
	paper: {
		padding: '5px 10px',
		marginTop: '10px',
	},
	chip: {
		margin: '5px',
	},

	'@global': {
		'*::-webkit-scrollbar': {
			width: '0.2em',
		},
		'*::-webkit-scrollbar-track': {
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
		},
		'*::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(0,0,0,.1)',
			outline: '1px solid slategrey',
		},
	},
}));

function ClipartCard(props) {
	const classes = useStyles();
	const {
		imgName,
		categories,
		subcategories,
		tags,
		url,
		downloads,
		type,
		size,
		views,
	} = props.clipartInfo;

	//MODAL FUNCTIONS
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleViews() {
		let newViews = views + 1;
		console.log(views);
		db.collection('data')
			.doc(imgName)
			.set({ ...props.clipartInfo, views: newViews });
	}

	// Clipart Details

	return (
		<>
			<Link to={'/details/' + imgName}>
				<Card className={classes.root}>
					<center>
						<img className={classes.media} alt={imgName} src={url} />
					</center>

					{/* <CardActions disableSpacing>
					<Typography>
						<strong>{imgName}</strong>
					</Typography>

					<a download href={url} className={classes.downloadBtn}>
						<IconButton className={classes.downloadBtn} aria-label='download'>
							<CloudDownload />
						</IconButton>
					</a>
				</CardActions> */}
				</Card>
			</Link>
			{/* THE MODAL */}

			<Modal
				open={open}
				onClose={handleClose}
				className={classes.modal}
				aria-labelledby='clipartTitle'
				aria-describedby='simple-modal-description'
			>
				<Card className={classes.modalCard}>
					<center>
						<img className={classes.media} alt='testimg' src={url} />
					</center>

					<CardActions disableSpacing>
						<b>{imgName}</b>
						<div className={classes.actionBtns}>
							<a download to={url} target='_self'>
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
							<li>Views: {views + 1}</li>
							<li>Downloads {downloads}</li>
							<li>Size: {Number.parseFloat(size).toFixed(2) + 'MB'}</li>
							<li>Type: {type} </li>
							<li>
								<Paper className={classes.paper}>
									<p>Sub Category</p>
									{subcategories.map((category) => (
										<Chip className={classes.chip} label={category} />
									))}
								</Paper>
							</li>
							<li>
								<Paper className={classes.paper}>
									<p>Tags</p>

									{tags
										? tags.map((tag) => (
												<Chip className={classes.chip} label={tag} />
										  ))
										: null}
								</Paper>
							</li>
						</ul>
					</CardContent>
				</Card>
			</Modal>
		</>
	);
}

export default withRouter(ClipartCard);
