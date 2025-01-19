import "../styles/nextPiece.css";

const NextPiece = () => {
  return (
    <div className="next-piece-container">
      
      <h1>Next</h1>

      <div className="next-piece-cell-container">
      
        {/* Hard coded 1st piece */}
        <div className="next-piece-cell">
          <div className="next-piece-cell-inner">
            <div className="next-piece-cell-inner-piece"></div>
          </div>
        </div>

        {/* Hard coded 2nd piece */}
        <div className="next-piece-cell">
          <div className="next-piece-cell-inner">
            <div className="next-piece-cell-inner-piece"></div>
          </div>
        </div>

        {/* Hard coded 3rd piece */}
        <div className="next-piece-cell">
          <div className="next-piece-cell-inner">
            <div className="next-piece-cell-inner-piece"></div>
          </div>
        </div>
        {/* Hard coded 4rd piece */}
        <div className="next-piece-cell">
          <div className="next-piece-cell-inner">
            <div className="next-piece-cell-inner-piece"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NextPiece;
