import React from "react";
import Container from "../styles/Container";

const About = () => {
  return (
    <Container>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Under_construction_icon-yellow.svg/291px-Under_construction_icon-yellow.svg.png"
        alt="under construction"
        loading="lazy"
        className="mx-auto w-[291px] h-[240px] mb-4 mt-2"
      />
      <p>Under construction </p>
    </Container>
  );
};

export default About;
