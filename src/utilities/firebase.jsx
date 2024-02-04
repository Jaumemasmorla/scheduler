

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useDatabaseValue } from "@react-query-firebase/database";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4sM76azvpu5tTnQz-skdtjMPR-novdlA",
  authDomain: "scheduler-24b41.firebaseapp.com",
  databaseURL: "https://scheduler-24b41-default-rtdb.firebaseio.com",
  projectId: "scheduler-24b41",
  storageBucket: "scheduler-24b41.appspot.com",
  messagingSenderId: "196401995803",
  appId: "1:196401995803:web:afa89a540388089681d8be"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const firebaseSignOut = () => signOut(getAuth(firebase));

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

export const useData = (path, transform) => {
    const { data, isLoading, error } = useDatabaseValue([path], ref(database, path), {subscribe: true});
    const value = (!isLoading && !error && transform) ? transform(data) : data;
    return [value, isLoading, error];
};

export const setData = (path, value) => (
  set(ref(database, path), value)
);

export {firebaseSignOut as signOut};

export const useUserState = () => useAuthState(firebase.auth());