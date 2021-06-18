import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 300,
		marginTop: '7rem',
	},
	media: {
		maxHeight: '280px',
		objectFit: 'contain',
		padding: '10px',
	},

	downloadBtn: {
		marginLeft: 'auto',
	},
}));

export default function CardComp2({ imgName, url }) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<center>
				<img className={classes.media} alt={imgName} src={url} />
			</center>

			<CardActions disableSpacing>
				<IconButton aria-label='add to favorites'>
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label='share'>
					<ShareIcon />
				</IconButton>
				<IconButton className={classes.downloadBtn} aria-label='download'>
					<CloudDownloadIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
