import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import theme from './ui/Theme';
import { Route } from 'react-router-dom';

import Navbar from './ui/Navbar';
import SearchBar from './ui/SearchBar';

import CategoriesTabs from './components/home/CategoriesTabs';
import SubCategories from './components/categories/SubCategories';
import IndividualSubCategoryList from './components/categories/IndividualSubCategoryList';
import ClipartDetails from './components/ClipartDetails';
import Login from './components/admin/Login.js';
import RecentAndPopCliparts from './components/home/RecentAndPopCliparts';
import Footer from './ui/Footer';
import SearchResults from './ui/searchResult/SearchResults';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<Navbar />
				<SearchBar />
				<CategoriesTabs />

				<Route exact path='/search/:searchTerm' component={SearchResults} />

				<Route exact path='/' component={RecentAndPopCliparts} />
				<Route exact path='/categories/:catName' component={SubCategories} />
				<Route
					exact
					path='/categories/:catName/:subCatName'
					component={IndividualSubCategoryList}
				/>
				<Route exact path='/admin' component={Login} />
				<Route path='/details/:imgName' component={ClipartDetails} />

				<Footer />
			</div>
		</ThemeProvider>
	);
}

export default App;
