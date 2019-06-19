import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyAhc7BEOuw-pI8IvrBCm4vrHiU5710zSFo",
authDomain: "chatvue-8c05d.firebaseapp.com",
databaseURL: "https://chatvue-8c05d.firebaseio.com",
projectId: "chatvue-8c05d",
storageBucket: "chatvue-8c05d.appspot.com",
messagingSenderId: "627660741246",
appId: "1:627660741246:web:a4fe21b062edf3ac"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();