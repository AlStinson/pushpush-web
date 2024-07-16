import './Piece.css';

const Piece = ({ piece, rotated }) => {
    return (
        <div className="piece" style={{transform: `rotate(${rotated ? 180 : 0}deg)`}}>
            <img src={`pieces/${piece}.png`} alt={piece} />
        </div>
    );
};

export default Piece;