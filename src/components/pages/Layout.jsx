import React from "react";
import useHealth from "../../hooks/useHealth";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../elements/Footer";
import Container from "../styles/Container";
import Loading from "../elements/Loading";
import NavLink from "../styles/NavLink";

const Layout = () => {
  useHealth();

  const navigation = useNavigation();

  return (
    <Container className="flex flex-col min-h-screen">
      <header>
        <h1 className="bg-primary text-text-alternative text-center p-5 border-b-primary-hover border-solid border-b-4">
          Pushpush
        </h1>
        <nav className="overflow-hidden bg-navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/play">Play</NavLink>
          <NavLink to="/rules">Rules</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <main className="grow">
        {navigation.state !== "idle" ? <Loading /> : <Outlet />}
      </main>
      <Footer />
    </Container>
  );
};

export default Layout;
