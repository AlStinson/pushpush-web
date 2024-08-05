import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './styles/GlobalStyles';
import Container from './styles/Container';
import Header from './styles/Header';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Health from './components/Health';
import Game from './components/Game';
import Index from './components/Index';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/Error';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/:gameId/:kind",
    element: <Game />,
  },
  {
    path: "/error",
    element: <Error />
  },
  {
    path: "/*",
    element: <Navigate to={"/error"} state={"404 Page not found"} />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={({error}) => <Navigate to={"/error"} state={error}/>}>
      <GlobalStyles />
      <Health />
      <Container>
        <header><Header>Pushpush</Header></header>
        <Container>
          <RouterProvider router={routes} />
        </Container>
      </Container>
    </ErrorBoundary>
  </React.StrictMode>
);
