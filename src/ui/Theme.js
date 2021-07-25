import { createMuiTheme } from '@material-ui/core/styles';

const clipBlue = '#ADD6F2';
const clipOrange = '#eeba60';
const theme = createMuiTheme({
	palette: {
		common: {
			arcBlue: clipBlue,
			arcOrange: clipOrange,
		},
		primary: {
			main: `${clipBlue}`,
		},
		secondary: {
			main: `${clipOrange}`,
		},
	},
	typography: {
		tab: {
			fontFamily: 'Raleway',
			fontWeight: 700,
			fontSize: '1rem',
			textTransform: 'none',
		},
		estimate: {
			color: 'white',
		},
	},
});
export default theme;
