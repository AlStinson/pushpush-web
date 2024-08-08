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
import { styled } from 'styled-components';

const BodyWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 40px);
`;

const MainWrapper = styled.main`
  flex: 1;
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorWrapper>
      <NotificationWrapper>
        <GlobalStyles />
        <Health />
        <BodyWrapper>
          <Header />
          <MainWrapper>
            <Routes />
          </MainWrapper>
          <Footer />
        </BodyWrapper>
      </NotificationWrapper>
    </ErrorWrapper>
  </React.StrictMode>
);
