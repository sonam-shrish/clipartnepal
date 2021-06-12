import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import Header from './ui/Header';
import theme from './ui/Theme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<BrowserRouter>
					<Header />
					Hello
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