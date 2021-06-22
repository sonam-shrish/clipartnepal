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
import { Link, withRouter } from 'react-router-dom';

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

const CategoriesTabs = (props) => {
	let history = props.history;
	const [activeTab, setActiveTab] = useState(0);
	const [categoriesArray, setCategoriesArray] = useState([]);

	const classes = useStyles();

	useEffect(() => {
		function getCategoriesArray(props) {
			const categoriesArr = [];

			db.collection('categories')
				.get()
				.then(({ docs }) => {
					docs.forEach((cat) => categoriesArr.push(cat));
					setCategoriesArray(categoriesArr);
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

	function handleCategoriesClick(e) {
		history.push('/' + e.target.outerText);
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
								onClick={handleCategoriesClick}
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

export default withRouter(CategoriesTabs);
