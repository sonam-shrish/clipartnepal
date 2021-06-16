import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyBJLwWje5Dcpf8KDKI4iiNCLpLbL97lsNw',
	authDomain: 'clipartnepal-84123.firebaseapp.com',
	projectId: 'clipartnepal-84123',
	storageBucket: 'clipartnepal-84123.appspot.com',
	messagingSenderId: '239800559322',
	appId: '1:239800559322:web:04dd9a90157fecd175a7e3',
	measurementId: 'G-8PMZ7XPZVV',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };