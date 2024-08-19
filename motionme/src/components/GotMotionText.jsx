import PropTypes from "prop-types";

function GotMotionText({ isDarkMode }) {
  return (
    <figure className="max-w-screen-md mx-auto text-center mb-10">
      <blockquote
        className={`text-6xl italic font-semibold text-center tracking-wider ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        <p>got motion?</p>
      </blockquote>
    </figure>
  );
}

GotMotionText.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default GotMotionText;
