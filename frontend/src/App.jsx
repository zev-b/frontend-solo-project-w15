// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';

import SpotsList from './components/SpotsList/SpotsList';
// import * as spotsListActions from './store/spots'; 
import SpotDetails from './components/SpotDetails/SpotDetails';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',          // landing page all spots
        element: <SpotsList />
      },
      {
        path: '/spots/:spotId',  // spot-detail page
        element: <SpotDetails />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
