import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Button, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		listStyle: 'none',
		padding: theme.spacing(0.5),
		margin: 0,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}));

export default function ChipsArray() {
	const classes = useStyles();
	const [tags, setTags] = useState([
		'Angular',
		'jQuery',
		'Polymer',
		'React',
		'Vue.js',
	]);
	const [tagInput, setTagInput] = useState('');

	function handleTagInput(e) {
		setTagInput(e.target.value);
	}

	function handleTagSubmit() {
		setTags([...tags, tagInput]);
		setTagInput('');
	}

	const handleDelete = (chipToDelete) => () => {
		console.log(chipToDelete);
		setTags((chips) => chips.filter((chip) => chip !== chipToDelete));
	};

	return (
		<Paper component='ul' className={classes.root}>
			<TextField
				onChange={handleTagInput}
				value={tagInput}
				placeholder='Tagname'
			/>
			<Button onClick={handleTagSubmit}>Add Tag</Button>

			<Button
				onClick={() => {
					setTags(['a', 'b']);
				}}
			>
				crap
			</Button>
			{tags.map((tag) => {
				return (
					<Chip
						label={tag}
						onDelete={handleDelete(tag)}
						className={classes.chip}
					/>
				);
			})}
		</Paper>
	);
}
