import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
			<a
				type='image/download'
				download
				href='https://firebasestorage.googleapis.com/v0/b/clipartnepal-84123.appspot.com/o/cliparts%2FDalai%20Lama.jpeg?alt=media&token=c33b5cb6-8132-4147-bcb4-37fb4e864553'
			>
				Download Image
			</a>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
