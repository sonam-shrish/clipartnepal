import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import Header from './ui/Header';
import theme from './ui/Theme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CardComp from './components/ClipartCard';
import PopularCliparts from './components/home/PopularCliparts';
import RecentCliparts from './components/home/RecentClipart';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<BrowserRouter>
					<Header />
					Hello
					<PopularCliparts />
					<RecentCliparts />
					<Switch>
						<Route exact path='/' component={() => <div>Hey It's HOme</div>} />
						<Route
							exact
							path='/portfolio'
							component={() => <div>Artist Portfolio</div>}
						/>
					</Switch>
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
}

export default App;
