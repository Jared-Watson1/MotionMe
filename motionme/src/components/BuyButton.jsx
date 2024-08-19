import PropTypes from "prop-types";

function BuyButton({ isDarkMode }) {
  return (
    <a
      href="#"
      className={`fixed bottom-4 left-4 px-4 py-2 text-lg font-semibold rounded-md transition duration-300 ${
        isDarkMode
          ? "bg-white text-black hover:bg-gray-800 hover:text-white"
          : "bg-black text-white hover:bg-gray-200 hover:text-black"
      }`}
      style={{ fontFamily: "'Got Milk', sans-serif" }}
    >
      Buy $MOTION
    </a>
  );
}

BuyButton.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default BuyButton;
