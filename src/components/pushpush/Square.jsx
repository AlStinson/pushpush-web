import Piece from './Piece';
import './Square.css';

const Square = ({ selected, selectable, onclick, piece, rotated }) => {

    return (
        <div className="square" style={selected ? { backgroundColor: "blue" } : selectable ? { backgroundColor: "orange" } : {}} onClick={onclick} >
            {piece && <Piece piece={piece} rotated={rotated} />}
        </div>
    );
};

export default Square;