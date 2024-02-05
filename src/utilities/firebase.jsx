

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useDatabaseValue } from "@react-query-firebase/database";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
import {useState,useEffect} from  "react"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYvzFcHyUITTxZz-rzIhB2Yk3YxU6F3jE",
  authDomain: "schedule-eb97e.firebaseapp.com",
  projectId: "schedule-eb97e",
  storageBucket: "schedule-eb97e.appspot.com",
  messagingSenderId: "1018354630395",
  appId: "1:1018354630395:web:9b4bf6e940601527287a5e",
  measurementId: "G-TQRYX9KCFS"
};

// Initialize Firebase




// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


const firebaseSignOut = () => signOut(getAuth(firebase));

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
          const val = snapshot.val();
          if (devMode) { console.log(val); }
          setData(transform ? transform(val) : val);
          setLoading(false);
          setError(null);
      }, (error) => {
          setData(null);
          setLoading(false);
          setError(error);
      });
  }, [path, transform]);

  return [data, loading, error];
}

export const setData = (path, value) => (
  set(ref(database, path), value)
);

export {firebaseSignOut as signOut};

export const useUserState = () => useAuthState(firebase.auth());