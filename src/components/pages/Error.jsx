import { Link, useLocation } from "react-router-dom";
import Container from "../styles/Container";

const Error = () => {
  const { state } = useLocation();

  return (
    <Container>
      <h2> Error! </h2>
      <p>{state}</p>
      <Link to="/">Go back to main menu</Link>
    </Container>
  );
};

export default Error;
