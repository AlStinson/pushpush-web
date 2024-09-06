import { bool, string } from "prop-types";
import React from "react";

import * as images from "../../images/index";

const Piece = ({ piece, rotated }) => {
  return (
    <div className={`size-full ${rotated ? "rotate-180" : ""}`}>
      <img className="size-full" src={images[piece]} alt={piece} />
    </div>
  );
};

Piece.propTypes = {
  piece: string.isRequired,
  rotated: bool.isRequired,
};

export default Piece;
