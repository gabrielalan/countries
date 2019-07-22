import Home from "./Home";
import Login from "./Login";

export default [
  { exact: true, path: '/', isPrivate: true, component: Home },
  { exact: true, path: '/login', component: Login },
];
