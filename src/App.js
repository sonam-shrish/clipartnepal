import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import Header from './ui/Header';
import theme from './ui/Theme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CardComp from './components/ClipartCard';
import PopularCliparts from './components/home/PopularCliparts';
import RecentCliparts from './components/home/RecentClipart';
import SearchBar from './components/SearchBar';
import CategoriesTabs from './components/home/CategoriesTabs';
import SubCategories from './components/categories/SubCategories';
import IndividualSubCategoryList from './components/categories/IndividualSubCategoryList';
import AddClipart from './components/upload/AddClipart';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<BrowserRouter>
					<Header />
					Hello
					<AddClipart />
					{/* <Categories /> */}
					{/* <IndividualSubCategoryList /> */}
					<SearchBar />
					<Route path='/' component={CategoriesTabs} />
					<Route exact path='/' component={PopularCliparts} />
					<Route exact path='/' component={RecentCliparts} />
					<Route exact path='/categories/:catName' component={SubCategories} />
					<Route
						path='/categories/:catName/:subCatName'
						component={IndividualSubCategoryList}
					/>
					<Route path='/admin/upload' component={AddClipart} />
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
}

export default App;
