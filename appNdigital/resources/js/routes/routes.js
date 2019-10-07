import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import NoMatch from '../pages/NoMatch';
import Movie from "../pages/Movie";
import SearchResults from "../pages/SearchResults";
import Profile from "../pages/ProfilUser";
import Users from "../pages/Users";
import Pop from "../pages/Pop";
import Top from "../pages/Top";
import User from "../pages/User";
import MyActivity from '../pages/MyActivity';



const routes = [
  {
        path: '/',
        exact: true,
        auth: true,
        component: Home,
        fallback: Welcome,
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login,
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register,
    },
    {
        path: '/forgot-password',
        exact: true,
        auth: false,
        component: ForgotPassword,
    },
    {
        path: '/reset-password',
        exact: true,
        auth: false,
        component: ResetPassword,
    },
    {
        path: '/dashboard',
        exact: true,
        auth: true,
        component: Dashboard,
    },
    {
        path: '/users',
        exact: true,
        auth: true,
        component: Users,
    },    {
        path: '/user/:id',
        exact: true,
        auth: false,
        component: User,
    },
    {
        path: '/top',
        exact: true,
        auth: false,
        component: Top,
    },
    {
        path: '/pop',
        exact: true,
        auth: false,
        component: Pop,
    },
    {
        path: '/home',
        exact: true,
        auth: false,
        component: Home,
    },
    {
        path: '/myactivity',
        exact: true,
        auth: false,
        component: MyActivity,
    },
    {
        path: '/movie/:id',
        exact: true,
        auth: false,
        component: Movie,
    },
    {
        path: '/search',
        exact: true,
        auth: false,
        component: SearchResults,
    },
    {
        path: '/profile',
        exact: true,
        auth: true,
        component: Profile,
    },
    {
        path: '',
        exact: false,
        auth: false,
        component: NoMatch,
    },
    ];

    export default routes;
