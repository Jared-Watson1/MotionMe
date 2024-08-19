import PropTypes from "prop-types";

function DownloadButton({ isDarkMode }) {
  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    // Convert the canvas to a data URL
    const imageDataUrl = canvas.toDataURL("image/png");

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = "edited-image.png";

    // For mobile devices, we create a new tab/window for downloading
    if (window.navigator.msSaveOrOpenBlob) {
      // For IE and Edge compatibility
      const blob = canvas.msToBlob();
      window.navigator.msSaveOrOpenBlob(blob, "edited-image.png");
    } else {
      // Other browsers
      link.click();
    }

    // Special handling for iOS devices
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
      // Open the image in a new window
      const newWindow = window.open(imageDataUrl, "_blank");
      // After the image is loaded, prompt the user to save it
      newWindow.document.title = "Download Image";
      newWindow.document.body.style.backgroundColor = "black";
      const img = newWindow.document.createElement("img");
      img.src = imageDataUrl;
      img.style.width = "100%";
      img.style.height = "auto";
      newWindow.document.body.appendChild(img);
    }
  };

  return (
    <button
      className={`self-start my-4 p-2 flex items-center space-x-2 rounded-lg transition duration-300 ${
        isDarkMode
          ? "bg-white text-black hover:bg-gray-800 hover:text-white"
          : "bg-black text-white hover:bg-gray-200 hover:text-black"
      }`}
      onClick={handleDownload}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      {/* <span>Download Image</span> */}
    </button>
  );
}

DownloadButton.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default DownloadButton;
