import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PrivacyPolicy from './routes/vocabhub/privacy';
import ErrorRoute from './routes/error';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { AppThemeProvider } from './contexts/AppThemeProvider';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


const Layout = () => {
  return (
    <div >
      <Outlet />
    </div>
  );
};



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: < ErrorRoute />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  </React.StrictMode>
);
