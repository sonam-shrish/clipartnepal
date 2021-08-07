//Complete card small

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import { db } from '../firebase';
import { withRouter, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '150px',
		height: '150px',
		margin: '5px',
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
	const { imgName, url, views, imgId } = props.clipartInfo;

	function handleViews() {
		let newViews = Number(views) + 1;
		console.log(imgId);
		console.log(views);
		db.collection('data').doc(imgId).update({ views: newViews });
	}

	return (
		<>
			<Link to={'/details/' + imgId} onClick={handleViews}>
				<Card className={classes.root}>
					<center>
						<img className={classes.media} alt={imgName} src={url} />
					</center>
				</Card>
			</Link>
		</>
	);
}

export default withRouter(ClipartCard);
