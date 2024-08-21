import React from "react";
import "./Piece.css";
import * as images from "../../images/index";
import { bool, string } from "prop-types";

const Piece = ({ piece, rotated }) => {
  return (
    <div
      className="piece"
      style={{ transform: `rotate(${rotated ? 180 : 0}deg)` }}
    >
      <img src={images[piece]} alt={piece} />
    </div>
  );
};

Piece.propTypes = {
  piece: string,
  rotated: bool,
};

export default Piece;
