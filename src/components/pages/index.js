import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

export default [
  { exact: true, path: '/', isPrivate: true, component: Home },
  { exact: true, path: '/login', component: Login },
  { exact: true, path: '/register', component: Register },
];
