import React, { Children } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './pages/dashboard';
import PengolahanData from './pages/pengolahanData';
import ReportData from './pages/reportData';
import Koordinator from './pages/koordinator';
import EditData from './pages/editData';
import InputData from './pages/inputData';
import Navigation from './components/navigation';

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container);

const Layout = ({ children }) => {
  return (

    <body className='flex w-screen'>
      <Navigation />
      <div className="w-2/12">
        <Navbar />
      </div>
      <div className='w-10/12 pt-16'>
        {children}
      </div>
    </body>


  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Layout><p>Welcome</p></Layout>),
  },
  {
    path: "/dashboard",
    element: (<Layout><Dashboard /></Layout>),
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/input-data",
    element: (<Layout><InputData /></Layout>),
  },
  {
    path: "/pengolahan-data",
    element: (<Layout><PengolahanData /></Layout>),
  },
  {
    path: "/report-data",
    element: (<Layout><ReportData /></Layout>),
  },
  {
    path: "/koordinator",
    element: (<Layout><Koordinator /></Layout>),
  },
  {
    path: "/edit-data/:idKtp", 
    element: (<Layout><EditData /></Layout>), 
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} ><Navbar /></RouterProvider>
    </Provider>
  </React.StrictMode>
);
