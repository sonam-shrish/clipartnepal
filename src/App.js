import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import theme from './ui/Theme';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './ui/Header';

import PopularCliparts from './components/home/PopularCliparts';
import RecentCliparts from './components/home/RecentClipart';
import SearchBar from './components/SearchBar';
import CategoriesTabs from './components/home/CategoriesTabs';
import SubCategories from './components/categories/SubCategories';
import IndividualSubCategoryList from './components/categories/IndividualSubCategoryList';
//test
import ClipartDetails from './components/ClipartDetails';
import Login from './components/admin/Login.js';

function App() {
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
				<Route exact path='/' component={PopularCliparts} />
				<Route exact path='/' component={RecentCliparts} />
				<Route exact path='/categories/:catName' component={SubCategories} />
				<Route
					exact
					path='/categories/:catName/:subCatName'
					component={IndividualSubCategoryList}
				/>
				<Route exact path='/admin' component={Login} />
				<Route path='/details/:imgName' component={ClipartDetails} />

				{/* <Footer /> */}
			</div>
		</ThemeProvider>
	);
}

export default App;
