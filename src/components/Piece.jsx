import './Piece.css';
import * as images from '../images/index';

const Piece = ({ piece, rotated }) => {
    return (
        <div className="piece" style={{transform: `rotate(${rotated ? 180 : 0}deg)`}}>
            <img src={images[piece]} alt={piece} />
        </div>
    );
};

export default Piece;