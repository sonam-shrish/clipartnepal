//Complete card small
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 300,
		margin: '10px 15px',
	},
	media: {
		maxWidth: '280px',
		objectFit: 'contain',
	},
	link: {
		textDecoration: 'none',
	},
}));

function SubCategoryItem(props) {
	const classes = useStyles();
	const parentURL = props.location.pathname;
	console.log(parentURL);

	const { subCatName, url } = props;
	const subCatURL = parentURL + '/' + subCatName;

	console.log(props);
	return (
		<>
			<Link className={classes.link} to={subCatURL}>
				<Card className={classes.root}>
					<center>
						<img className={classes.media} alt='ImageName' src={url} />
					</center>
					<Typography variant='h5' component='h5'>
						{subCatName}
					</Typography>
				</Card>
			</Link>
		</>
	);
}

export default withRouter(SubCategoryItem);
