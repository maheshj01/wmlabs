import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import EpochPrivacy from './routes/epoch/privacy/EpochPrivacy';
import PrivacyPolicy from './routes/privacy';
import ErrorRoute from './routes/error';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { AppThemeProvider } from './contexts/AppThemeProvider';
import AutoFillPolicy from './routes/autofill/privacy';
import PastelogPolicy from './routes/pastelog/privacy';
import EpochLanding from './routes/epoch/landing/EpochLanding';

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
        element: <App />
      },
      {
        path: "/epoch",
        element: <EpochLanding />,
      },
      {
        path: "/epoch/privacy",
        element: <EpochPrivacy />,
      },
      {
        // The general policy, used by apps without their own page.
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/autofill/privacy-policy",
        element: <AutoFillPolicy />,
      },
      {
        path: "/pastelog/privacy-policy",
        element: <PastelogPolicy />,
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
