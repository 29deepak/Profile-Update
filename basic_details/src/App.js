import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/Register';
import Username from './components/Username';
import Password from './components/Password';
import Recovery from './components/Recovery';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import Reset from './components/Reset';
import Login from './components/Login';
import Form from './Form/Form';
/** auth middle ware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';

const router = createBrowserRouter([
  {
    path: "/", element: <Username />
  },
  {
    path: "/login", element: <Login />
  },
  {
    path: "/register", element: <Register />
  },
  {
    path: "/password", element: <ProtectRoute><Password /></ProtectRoute>
  },
  {
    path: "/profile", element: <AuthorizeUser><Profile /></AuthorizeUser>
  },
  {
    path: "/recovery", element: <Recovery />
  },
  {
    path: "/reset", element: <Reset />
  },
  {
    path: "/form", element: <Form />
  }, {
    path: "*", element: <PageNotFound />
  }



])
const App = () => {
  return (

    <RouterProvider router={router} />

  );
}

export default App;
