import "../styles/gameHeader.css";
import profile from "../assets/placeholder_profile.png";
const GameHeder = () => {
  return (
    <div className="game-header">
      <div className="profile-container">
        <div className="profile-picture">
          <img src={profile} alt="profile" />
        </div>
        <div className="profile-details">
          <div className="profile-name">
            <span>Jonas Andersen</span>
          </div>
          <div className="profile-rank">
            <span>Rank 300</span>
          </div>
        </div>
      </div>

      <div className="time-container">
        <div className="time-title">Time</div>
        <div className="time-value">00:39</div>
      </div>

      <div className="profile-container opponent">
        <div className="profile-picture">
          <img src={profile} alt="profile" />
        </div>
        <div className="profile-details">
          <div className="profile-name">
            <span>Preben Andersen</span>
          </div>
          <div className="profile-rank">
            <span>Rank 250</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeder;
