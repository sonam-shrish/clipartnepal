import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Typography } from '@material-ui/core';
import { IconButton, Card, CardActions } from '@material-ui/core';
import { Favorite, Share, CloudDownload } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 445,
		marginTop: '7rem',
	},
	media: {
		maxHeight: '300px',
		objectFit: 'contain',
	},

	downloadBtn: {
		marginLeft: 'auto',
	},
	list: {
		listStyleType: 'none',
		textAlign: 'left',
	},
}));

export default function CardComp(props) {
	const {
		imgName,
		categories,
		subcategories,
		tags,
		url,
		downloads,
		size,
		views,
	} = props.info;
	const classes = useStyles();

	return (
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
					<IconButton className={classes.downloadBtn} aria-label='download'>
						<CloudDownload />
					</IconButton>
				</a>
			</CardActions>
		</Card>
	);
}
