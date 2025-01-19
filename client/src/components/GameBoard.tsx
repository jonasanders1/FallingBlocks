import "../styles/GameBoard.css";

const GameBoard = () => {
  const isDarkCell = (row: number, col: number) => {
    return (row + col) % 2 === 0;
  };

  const BOARD_HEIGHT = 20;
  const BOARD_WIDTH = 10;

  return (
    <div className="game-board">
      <div className="game-grid">
        {/* Create a 20x10 grid for Tetris */}
        {Array.from({ length: BOARD_HEIGHT }, (_, row) => (
          <div key={`row-${row}`} className="grid-row">
            {Array.from({ length: BOARD_WIDTH }, (_, col) => (
              <div
                key={`cell-${row}-${col}`}
                className={`grid-cell ${
                  isDarkCell(row, col) ? "grid-cell dark-cell" : "grid-cell light-cell"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
