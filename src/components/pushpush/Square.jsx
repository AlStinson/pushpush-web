import React from "react";
import Piece from "./Piece";
import { bool, func, string } from "prop-types";

const Square = ({ selected, selectable, onclick, piece, rotated }) => {
  return (
    <div
      className={`odd:bg-[#d18b47] even:bg-[#ffce9e] ${selected ? "!bg-[blue]" : ""} ${selectable ? "!bg-[orange]" : ""}`}
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
