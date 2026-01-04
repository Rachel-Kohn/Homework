import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App';
import Home from './Home';
import Buy from './Buy';
import Sell from './Sell';
import NotFound from './NotFound';

import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'buy', element: <Buy /> },
      { path: 'sell', element: <Sell /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
