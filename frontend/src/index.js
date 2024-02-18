import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Favorites from './components/Favorites/Favorites';
import Account from './components/Account/Account';
import Basket from './components/Basket/Basket';
import NoMatch from './components/NoMatch/NoMatch';
import Home from './components/Home/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/favorites',
    element: <Favorites />
  },
  {
    path: '/basket',
    element: <Basket />
  },
  {
    path: '/basket',
    element: <Basket />
  },
  {
    path: '/account',
    element: <Account />
  },
  {
    path: '*',
    element: <NoMatch />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);