import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  // appId: process.env.REACT_APP_FIREBASE_APPID,
  apiKey: "AIzaSyDpdPjdBi54dDJ6m0oVoZ3ucN87JPR7vg0",
  authDomain: "jobbox-43d60.firebaseapp.com",
  projectId: "jobbox-43d60",
  storageBucket: "jobbox-43d60.appspot.com",
  messagingSenderId: "681849647024",
  appId: "1:681849647024:web:50bba6b572015c26357075",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
