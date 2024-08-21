import React from "react";
import Container from "../styles/Container";

const About = () => {
  return (
    <Container>
      <img
        style={{ width: "291px", height: "240px" }}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Under_construction_icon-yellow.svg/291px-Under_construction_icon-yellow.svg.png"
        alt="under construction"
        loading="lazy"
      />
      <p>Under construction </p>
    </Container>
  );
};

export default About;
