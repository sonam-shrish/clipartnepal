import React, { useState, useEffect } from 'react';

import { db } from '../../firebase';

import {
	Toolbar,
	Typography,
	AppBar,
	useScrollTrigger,
	Tabs,
	Tab,
	Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
	},
	logo: {
		height: '7em',
	},
	logoBtn: {
		padding: '0',
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	tabsContainer: {
		marginLeft: 'auto',
	},
	tab: {
		...theme.typography.tab,
		minWidth: 10,
		marginLeft: '25px',
	},
	button: {
		...theme.typography.estimate,
		borderRadius: '50px',
		marginLeft: '50px',
	},
}));

const CategoriesTabs = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [categoriesArray, setCategoriesArray] = useState([]);

	const classes = useStyles();

	useEffect(() => {
		function getCategoriesArray() {
			const categoriesArr = [];

			db.collection('categories')
				.get()
				.then(({ docs }) => {
					docs.forEach((cat) => categoriesArr.push(cat));
					console.log(categoriesArr);
					setCategoriesArray(categoriesArr);
					// docs.forEach((doc) => popArray.push(doc.data()));
					// console.log(docs[1].data());
					// setPopularCliparts(popArray);
					// console.log(popArray);
				});
		}

		getCategoriesArray();
	}, []);

	function ElevationScroll(props) {
		const { children } = props;

		const trigger = useScrollTrigger({
			disableHysteresis: true,
			threshold: 0,
		});

		return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
	}
	function handleActiveTab(e, value) {
		setActiveTab(value);
	}

	return (
		<>
			<ElevationScroll>
				<Toolbar>
					<Tabs
						value={activeTab}
						onChange={handleActiveTab}
						className={classes.tabsContainer}
						variant='scrollable'
						scrollButtons='on'
					>
						{categoriesArray.map((cat) => (
							<Tab
								label={cat.id}
								className={classes.tab}
								component={Link}
								to={'/categories/' + cat.id}
							/>
						))}
					</Tabs>
				</Toolbar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</>
	);
};

export default CategoriesTabs;
