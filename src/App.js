import { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import theme from './ui/Theme';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './ui/Header';

import PopularCliparts from './components/home/PopularCliparts';
import SearchBar from './components/SearchBar';
import CategoriesTabs from './components/home/CategoriesTabs';
import SubCategories from './components/categories/SubCategories';
import IndividualSubCategoryList from './components/categories/IndividualSubCategoryList';
//test
import ClipartDetails from './components/ClipartDetails';
import Login from './components/admin/Login.js';
import RecentAndPopCliparts from './components/home/RecentAndPopCliparts';
import { storage } from './firebase';

function App() {
	const [downloadURL, setDownloadURL] = useState('');
	useEffect(() => {
		storage
			.ref()
			.child('/cliparts/Hanaby.jpeg')
			.getDownloadURL()
			.then((url) => {
				// `url` is the download URL for 'images/stars.jpg'

				// This can be downloaded directly:
				var xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.onload = (event) => {
					var blob = xhr.response;
					let url = URL.createObjectURL(blob);
					setDownloadURL(url);
				};
				xhr.open('GET', url);
				xhr.send();
				console.log('is it working');
				// setDownloadURL(url);
			})

			.catch((error) => {
				// Handle any errors
				console.log('somehow I can not download it');
			});
	}, []);

	// const errorSnackbar = () => {
	// 	if (uploadError) {
	// 		return (
	// 			<Snackbar
	// 				open={snackbarOpen}
	// 				autoHideDuration={1000}
	// 				onClose={handleSnackbarClose}
	// 			>
	// 				<Alert severity='error'>{uploadError.message}</Alert>
	// 			</Snackbar>
	// 		);
	// 	} else {
	// 		return null;
	// 	}
	// };
	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<Header />

				<Route path='/' component={CategoriesTabs} />
				<Route exact path='/' component={SearchBar} />

				<Route exact path='/search' component={SearchBar} />
				<Route exact path='/' component={RecentAndPopCliparts} />
				<Route exact path='/categories/:catName' component={SubCategories} />
				<Route
					exact
					path='/categories/:catName/:subCatName'
					component={IndividualSubCategoryList}
				/>
				<Route exact path='/admin' component={Login} />
				<Route path='/details/:imgName' component={ClipartDetails} />

				<a download='sonam' href={downloadURL}>
					Download Now
				</a>

				{/* <Footer /> */}
			</div>
		</ThemeProvider>
	);
}

export default App;
