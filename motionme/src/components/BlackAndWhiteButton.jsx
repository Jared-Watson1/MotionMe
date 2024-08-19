import PropTypes from "prop-types";

function BlackAndWhiteButton({ toggleFilter, isFiltered, isDarkMode }) {
  return (
    <button
      className={`my-6 p-2 flex items-center rounded-lg transition duration-300 ${
        isDarkMode
          ? "bg-white text-black hover:bg-gray-800 hover:text-white"
          : "bg-black text-white hover:bg-gray-200 hover:text-black"
      }`}
      onClick={toggleFilter}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
          style={{ opacity: isFiltered ? 1 : 0.5 }}
        />
      </svg>
    </button>
  );
}

BlackAndWhiteButton.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default BlackAndWhiteButton;
