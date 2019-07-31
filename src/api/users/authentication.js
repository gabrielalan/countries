import { authAdapter } from './auth/firebase';
// import { withLocalStorage as authAdapter } from './auth/localStorage';

/**
 * This file is just a "bridge" that will return a specific authentication 
 * system. Both implement the same method names. If you want to try local storage
 * feel free to uncomment it and comment firebase adapter.
 */
 export default authAdapter;