//Complete card small
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Card,  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 300,
		marginTop: '7rem',
	},
	media: {
		maxWidth: '280px',
		objectFit: 'contain',
	},
}));

function getModalStyle() {
	return {
		top: `50%`,
		left: `50%`,
	};
}

export default function SubCategoryItem(props) {
	const classes = useStyles();
	const {
		subCatName,
		url,
	} = props;

	


	return (
		<>
			<Card className={classes.root} >
				<center>
					<img className={classes.media} alt='ImageName' src={url}/>
				</center>
        <Typography variant='h5' component='h5'>
								{subCatName}
							</Typography>

			</Card>

			
		</>
	);
}
