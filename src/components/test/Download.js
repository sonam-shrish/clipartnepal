import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { storage } from '../../firebase';
import { CloudDownload } from '@material-ui/icons';
const Download = () => {
	const [downloadURL, setDownloadURL] = useState('');

	function handleDownload() {
		firebase
			.storage()
			.ref()
			.child('cliparts/flower.jpeg')
			.getDownloadURL()
			.then((url) => {
				var xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.onload = (event) => {
					var blob = xhr.response;
				};
				xhr.open('GET', url);
				xhr.send();
			})
			.catch((error) => {
				// Handle any errors
			});
	}

	return (
		<div>
			<a download href={downloadURL}>
				download hu hai
			</a>
			<a download href={downloadURL}>
				{/* className={classes.downloadBtn} */}
				<CloudDownload />
			</a>
			<button onClick={handleDownload}>Download</button>
		</div>
	);
};

export default Download;
