import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCo0VW0yTVTGbTU16_eDZ_5iS2rGw3XNKA",
  authDomain: "netflix-clone-6d5c1.firebaseapp.com",
  projectId: "netflix-clone-6d5c1",
  storageBucket: "netflix-clone-6d5c1.firebasestorage.app",
  messagingSenderId: "103907719878",
  appId: "1:103907719878:web:72550fcf78400eb9b7f5c7"
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;