import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2Mpny7lYKuWqnkegizr-wcHMj_l7jNz8",
  authDomain: "fancy-countries.firebaseapp.com",
  databaseURL: "https://fancy-countries.firebaseio.com",
  projectId: "fancy-countries",
  storageBucket: "",
  messagingSenderId: "1018024559085",
  appId: "1:1018024559085:web:eb68baffed0084fb"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export const authAdapter = {
  registerUser: ({ username, password, avatar }) => auth.createUserWithEmailAndPassword(username, password)
    .then(({ user }) => user.updateProfile({ photoURL: avatar }))
    .then(() => ({ username, avatar })),

  authenticateUser: ({ username, password }) => auth.signInWithEmailAndPassword(username, password).then(({ user }) => ({
    username: user.email,
    avatar: user.photoURL
  })),

  getAuthenticatedUser: () => new Promise((resolve, reject) => auth.onAuthStateChanged(user => {
    return user
      ? resolve({ username: user.email, avatar: user.photoURL })
      : reject(new Error('No user logged in'));
  })),

  logUserOut: () => auth.signOut(),
};