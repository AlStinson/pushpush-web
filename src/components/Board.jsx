import Square from "./Square";
import './Board.css';

const Board = props => {

    const {board, validMoves} = props.data;
    const {firstSquare, direction} = props.state;

    const renderSquare = (x, y) => {
        const movesAsInitial = validMoves.filter(move => move.init.x === x && move.init.y === y);
        const movesAsFinal = validMoves.filter(move => move.init.x === firstSquare?.x && move.init.y === firstSquare?.y && move.init.x + move.dir.x === x && move.init.y + move.dir.y === y);
        const squareProps = {
            rotated: props.rotated,
            key: x + 8 * y,
            piece: board[`(${x},${y})`],
            selectable: !firstSquare ? movesAsInitial.length > 0 : !direction && movesAsFinal.length > 0,
            selected: firstSquare && firstSquare.x === x && firstSquare.y === y,
            onclick: () => {
                if (!firstSquare) props.setState({firstSquare: {x, y}});
                else if (movesAsFinal.length === 1) {
                    props.sendMessage({kind: "move", payload: movesAsFinal[0]});
                    props.setState({});
                } else {
                    props.setState(state => ({...state, direction: {x:x-firstSquare.x, y:y-firstSquare.y}}))
                }
            }
        }

        return <Square {...squareProps} />;
    };


    const squares = [];
    for (let y = 7; y > 0; y--) {
        for (let x = 1; x < 8; x++) {
            squares.push(renderSquare(x, y));
        }
    }


    return (
        <div className="board" style={{transform: `rotate(${props.rotated ? 180 : 0}deg)`}}>
            {squares}
        </div>
    );
};

export default Board;