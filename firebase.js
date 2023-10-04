import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyAlJjFiRMCwTSVNhFP6axk7QaHo7OlxL_8',
  authDomain: 'signal-6314c.firebaseapp.com',
  projectId: 'signal-6314c',
  storageBucket: 'signal-6314c.appspot.com',
  messagingSenderId: '794538916457',
  appId: '1:794538916457:web:828687e8164b6678a480f8',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth};
