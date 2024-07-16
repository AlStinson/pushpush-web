import Piece from './Piece';
import './Square.css';

const Square = ({ selected, selectable, onclick, piece, rotated }) => {

    return (
        <div className="square" style={selected ? { backgroundColor: "blue" } : selectable ? { backgroundColor: "orange" } : {}} onClick={() => selectable ? onclick() : null} >
            {piece && <Piece piece={piece} rotated={rotated} />}
        </div>
    );
};

export default Square;