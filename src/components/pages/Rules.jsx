import React from "react";
import Container from "../styles/Container";

const Rules = () => {
  return (
    <Container>
      <h2 className="my-4">Rules</h2>
      Download:
      <a
        target="_blank"
        href="/rules/pushpush_rules_es.pdf"
        className="ml-1.5 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 "
      >
        es
      </a>
    </Container>
  );
};

export default Rules;
