import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './components/styles/GlobalStyles';
import Container from './components/styles/Container';
import Health from './components/Health';
import Header from './components/elements/Header';
import Footer from './components/elements/Footer';
import NotificationWrapper from './components/wrappers/NotificationWrapper';
import Routes from './components/pages/Routes';
import ErrorWrapper from './components/wrappers/ErrorWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorWrapper>
      <NotificationWrapper>
        <GlobalStyles />
        <Health />
        <Container>
          <Header />
          <Container>
            <Routes />
          </Container>
          <Footer />
        </Container>
      </NotificationWrapper>
    </ErrorWrapper>
  </React.StrictMode>
);
