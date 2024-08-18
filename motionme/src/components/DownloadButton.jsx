import PropTypes from "prop-types";

function DownloadButton({ isDarkMode }) {
  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <button
      className={`self-start mb-4 p-2 rounded-lg transition duration-300 ${
        isDarkMode
          ? "bg-white text-black hover:bg-gray-800 hover:text-white"
          : "bg-black text-white hover:bg-gray-200 hover:text-black"
      }`}
      onClick={handleDownload}
    >
      Download Image
    </button>
  );
}

DownloadButton.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default DownloadButton;
