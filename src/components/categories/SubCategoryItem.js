//Complete card small
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	media: {
		objectFit: 'contain',
		width: '100%',
	},
	subCat: {
		width: '150px',
		height: '150px',
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

	return (
		<Link className={classes.link} to={subCatURL}>
			<Card className={classes.subCat}>
				<center>
					<img className={classes.media} alt='ImageName' src={url} />
				</center>
			</Card>
		</Link>
	);
}

export default withRouter(SubCategoryItem);
