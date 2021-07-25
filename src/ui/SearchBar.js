import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	searchForm: {
		padding: '20px 20px',
	},
	inputField: {
		backgroundColor: 'white',
		borderRadius: '5px',
		paddingRight: '0',
	},
});

function Search(props) {
	const [searchText, setSearchText] = useState('');

	const classes = useStyles();

	function handleSearchSubmit(e) {
		if (searchText) {
			e.preventDefault();

			props.history.push('/search/' + searchText);
		}
	}
	function handleInput(e) {
		setSearchText(e.target.value);
	}

	return (
		<>
			<form onSubmit={handleSearchSubmit} className={classes.searchForm}>
				<TextField
					variant='outlined'
					placeholder='Search Clipart'
					onChange={handleInput}
					className={classes.inputField}
					size='small'
				/>
				<Button
					variant='contained'
					color='primary'
					onClick={handleSearchSubmit}
				>
					Search
				</Button>
			</form>
		</>
	);
}

export default withRouter(Search);
