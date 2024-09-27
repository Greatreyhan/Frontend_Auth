import React, { Children } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './pages/dashboard';

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container);

const Layout = ({children}) =>{
  return(
    <>
    <Navbar />
    {children}
    </>

  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Layout><Dashboard /></Layout>),
  },
  {
    path: "/login",
    element: (<Layout><Login /></Layout>),
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} ><Navbar /></RouterProvider>
    </Provider>
  </React.StrictMode>
);
