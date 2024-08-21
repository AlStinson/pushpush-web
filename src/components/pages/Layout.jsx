import React from "react";
import GlobalStyles from "../styles/GlobalStyles";
import H1 from "../styles/H1";
import useHealth from "../../hooks/useHealth";
import { styled } from "styled-components";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../elements/Footer";
import Container from "../styles/Container";
import Loading from "../elements/Loading";
import NavLink from "../styles/NavLink";

const BodyWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 40px);
`;

const MainWrapper = styled.main`
  flex: 1;
`;

const Nav = styled.nav`
  overflow: hidden;
  background-color: #333;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
`;

const Layout = () => {
  useHealth();

  const navigation = useNavigation();

  return (
    <>
      <GlobalStyles />
      <BodyWrapper>
        <header>
          <H1>Pushpush</H1>
          <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/play">Play</NavLink>
            <NavLink to="/rules">Rules</NavLink>
            <NavLink to="/about">About</NavLink>
          </Nav>
        </header>
        <MainWrapper>
          {navigation.state !== "idle" ? <Loading /> : <Outlet />}
        </MainWrapper>
        <Footer />
      </BodyWrapper>
    </>
  );
};

export default Layout;
