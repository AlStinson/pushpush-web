import React from "react";
import * as images from "../../images/index";
import { bool, string } from "prop-types";

const Piece = ({ piece, rotated }) => {
  return (
    <div className={`w-full h-full ${rotated ? "rotate-180" : ""}`}>
      <img className="w-full h-full" src={images[piece]} alt={piece} />
    </div>
  );
};

Piece.propTypes = {
  piece: string,
  rotated: bool,
};

export default Piece;
