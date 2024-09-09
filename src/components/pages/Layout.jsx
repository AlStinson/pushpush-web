import { Outlet, useNavigate, useNavigation } from "react-router-dom";

import useHealth from "../../hooks/useHealth";
import Footer from "../elements/Footer";
import Loading from "../elements/Loading";
import NavLink from "../styles/NavLink";

const Layout = () => {
  useHealth();

  const navigation = useNavigation();
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-screen max-w-300 flex-col text-center">
      <header>
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer border-b-4 border-solid border-b-primary-hover bg-primary p-5 text-center text-text-alternative"
        >
          Pushpush
        </h1>
        <nav className="mx-auto inline-block bg-navbar">
          <div className="grid grid-cols-4 mobile:grid-cols-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/play">Play</NavLink>
            <NavLink to="/rules">Rules</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
        </nav>
      </header>
      <main className="grow p-5 mobile:p-3 tablet:p-4">
        {navigation.state !== "idle" ? <Loading /> : <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
