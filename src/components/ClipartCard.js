//Complete card small
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Favorite, Share, CloudDownload } from '@material-ui/icons';

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
}));

export default function ClipartCard(props) {
	const classes = useStyles();

	const { imgName, url } = props.clipartInfo;

	return (
		<Card className={classes.root}>
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
	);
}
