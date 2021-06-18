//Complete card small
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Favorite, Share, CloudDownload } from '@material-ui/icons';
import { Modal, CardContent, Typography } from '@material-ui/core';
import { IconButton, Card, CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 300,
		marginTop: '7rem',
	},
	media: {
		maxWidth: '280px',
		objectFit: 'contain',
	},

	downloadBtn: {
		marginLeft: 'auto',
	},
	// root: {
	// 	maxWidth: 445,
	// 	marginTop: '7rem',
	// },

	downloadBtn: {
		marginLeft: 'auto',
	},
	list: {
		listStyleType: 'none',
		textAlign: 'left',
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function getModalStyle() {
	return {
		top: `50%`,
		left: `50%`,
	};
}

export default function ClipartCard(props) {
	const classes = useStyles();
	const {
		imgName,
		categories,
		subcategories,
		tags,
		url,
		downloads,
		size,
		views,
	} = props.clipartInfo;

	//MODAL FUNCTIONS
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Card className={classes.root} onClick={handleOpen}>
				<center>
					<img className={classes.media} alt={imgName} src={url} />
				</center>

				<CardActions disableSpacing>
					<IconButton aria-label='add to favorites'>
						<Favorite />
					</IconButton>
					<IconButton aria-label='share'>
						<Share />
					</IconButton>
					<IconButton className={classes.downloadBtn} aria-label='download'>
						<CloudDownload />
					</IconButton>
				</CardActions>
			</Card>
			{/* THE MODAL */}

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='clipartTitle'
				aria-describedby='simple-modal-description'
			>
				<div style={modalStyle} className={classes.paper}>
					<Card className={classes.root}>
						<center>
							<img className={classes.media} alt='testimg' src={url} />
						</center>
						<p>Hello</p>
						<CardContent vlassName={classes.left}>
							<Typography variant='h5' component='h5'>
								{imgName}
							</Typography>
							<ul className={classes.list}>
								<li>Views: {views}</li>
								<li>Downloads {downloads}</li>
								<li>Size: {size}</li>
							</ul>
						</CardContent>

						<CardActions disableSpacing>
							<IconButton aria-label='add to favorites'>
								<Favorite />
							</IconButton>
							<a download href={url}>
								Download the video
							</a>
							<IconButton aria-label='share'>
								<Share />
							</IconButton>

							<a download href={url}>
								<IconButton
									className={classes.downloadBtn}
									aria-label='download'
								>
									<CloudDownload />
								</IconButton>
							</a>
						</CardActions>
					</Card>
				</div>
			</Modal>
		</>
	);
}
