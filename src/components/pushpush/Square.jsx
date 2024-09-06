import { bool, func, string } from "prop-types";
import React from "react";

import Piece from "./Piece";

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
  onclick: func.isRequired,
  piece: string,
  rotated: bool.isRequired,
  selectable: bool.isRequired,
  selected: bool,
};

export default Square;
