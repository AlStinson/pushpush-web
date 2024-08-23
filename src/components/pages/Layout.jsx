import React from "react";
import useHealth from "../../hooks/useHealth";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import Footer from "../elements/Footer";
import Loading from "../elements/Loading";
import NavLink from "../styles/NavLink";

const Layout = () => {
  useHealth();

  const navigation = useNavigation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen text-center max-w-300 mx-auto">
      <header>
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer bg-primary text-text-alternative text-center p-5 border-b-primary-hover border-solid border-b-4"
        >
          Pushpush
        </h1>
        <nav className="inline-block bg-navbar mx-auto">
          <div className="grid grid-cols-4 mobile:grid-cols-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/play">Play</NavLink>
            <NavLink to="/rules">Rules</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
        </nav>
      </header>
      <main className="grow p-5 tablet:p-4 mobile:p-3">
        {navigation.state !== "idle" ? <Loading /> : <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
