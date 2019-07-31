/**
 * These functions are only for a simple purpose.
 * They are not meant to go to production, but the objective of this app is not login/logout
 * They return promises just to "fake" some async, although without any delay.
 * 
 * The storage is a "dependency" by purpose. This way the testing becomes easier.
 */

export const storagePrefix = 'fancy-countries-';

export const usersKey = `${storagePrefix}-users`;
export const loggedInUserKey = `${storagePrefix}-logged-in`;

export const registerUser = (storage, user) => new Promise((resolve, reject) => {
  const users = JSON.parse(storage.getItem(usersKey)) || {};

  if (user.username in users) {
    return reject(new Error(`The username "${user.username}" is not available`));
  }

  storage.setItem(usersKey, JSON.stringify(Object.assign(users, {
    [user.username]: user
  })));

  resolve(user);
});

export const authenticateUser = (storage, { username, password }) => new Promise((resolve, reject) => {
  const users = JSON.parse(storage.getItem(usersKey)) || {};
  const user = users[username];

  if (!user || password !== user.password) {
    return reject(new Error(`The user "${username}" cannot be found`));
  }

  storage.setItem(loggedInUserKey, JSON.stringify(user));

  resolve(user);
});

export const getAuthenticatedUser = (storage) => new Promise((resolve, reject) => {
  const user = JSON.parse(storage.getItem(loggedInUserKey));

  return !user
    ? reject(new Error(`No user logged in`))
    : resolve(user);
});

export const logUserOut = (storage) => new Promise((resolve) => {
  storage.removeItem(loggedInUserKey);
  resolve(true);
});

/**
 * Auth adapter using localStorage
 */
export const withLocalStorage = {
  registerUser: registerUser.bind(null, window.localStorage),
  authenticateUser: authenticateUser.bind(null, window.localStorage),
  getAuthenticatedUser: getAuthenticatedUser.bind(null, window.localStorage),
  logUserOut: logUserOut.bind(null, window.localStorage),
};