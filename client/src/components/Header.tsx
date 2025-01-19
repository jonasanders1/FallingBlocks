import "../styles/header.css";
import Modal from "./Modal";

interface HeaderProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const Header = ({ isModalOpen, setIsModalOpen }: HeaderProps) => {
  const handleToggleModal = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  return (
    <>
      <nav className="header-container">
        <div className="header-content">
          <h1 className="header-title">Falling Blocks</h1>
          <button
            className="header-button"
            onClick={() => handleToggleModal(true)}
          >
            Menu
          </button>
        </div>
      </nav>
      <Modal isOpen={isModalOpen} onClose={() => handleToggleModal(false)} />
    </>
  );
};

export default Header;
