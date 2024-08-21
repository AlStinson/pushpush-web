import React from "react";
import Piece from "./Piece";
import "./Square.css";
import { bool, func, string } from "prop-types";

const Square = ({ selected, selectable, onclick, piece, rotated }) => {
  return (
    <div
      className="square"
      style={
        selected
          ? { backgroundColor: "blue" }
          : selectable
            ? { backgroundColor: "orange" }
            : {}
      }
      onClick={onclick}
    >
      {piece && <Piece piece={piece} rotated={rotated} />}
    </div>
  );
};

Square.propTypes = {
  selected: bool,
  selectable: bool,
  onclick: func,
  piece: string,
  rotated: bool,
};

export default Square;
