import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './styles/GlobalStyles';
import Container from './styles/Container';
import Header from './styles/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <Container>
      <Header>Pushpush</Header>
      <Container>
        <App />
      </Container>
    </Container>
  </React.StrictMode>
);
