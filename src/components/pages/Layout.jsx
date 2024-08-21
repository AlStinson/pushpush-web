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
      <Container className="flex flex-col min-h-screen">
        <header>
          <H1 className="text-[2em] font-bold">Pushpush</H1>
          <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/play">Play</NavLink>
            <NavLink to="/rules">Rules</NavLink>
            <NavLink to="/about">About</NavLink>
          </Nav>
        </header>
        <main className="grow">
          {navigation.state !== "idle" ? <Loading /> : <Outlet />}
        </main>
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
