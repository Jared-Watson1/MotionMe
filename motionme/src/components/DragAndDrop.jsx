import PropTypes from "prop-types";
import Shades from "../assets/motion-me-assets/SHADES.png";

function DragAndDrop({ onFileChange, isDarkMode }) {
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onFileChange(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      onFileChange(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("dropzone-file").click();
  };

  return (
    <div
      className="flex items-center justify-center w-full mb-6 mt-10"
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-between w-full h-96 border-2 border-dashed rounded-xl text-center p-8 cursor-pointer ${
          isDarkMode
            ? "border-white bg-black text-white"
            : "border-black bg-white text-black"
        }`}
        style={{ fontFamily: "'Got Milk', sans-serif" }}
      >
        <div className="flex flex-col items-center">
          <img src={Shades} alt="Shades" className="h-24" />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold tracking-wider mb-4">
            STAY IN MOTION
          </h2>
          <p className="text-lg mb-4">
            Add sunglasses and other stickers to any image
          </p>

          <button
            className={`font-semibold px-4 py-2 rounded-md mb-4 transition duration-300 ${
              isDarkMode
                ? "bg-white text-black hover:bg-gray-800 hover:text-white"
                : "bg-black text-white hover:bg-gray-200 hover:text-black"
            }`}
            onClick={handleButtonClick}
          >
            + Upload an image
          </button>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm">or drag & drop here</p>
        </div>

        <input
          id="dropzone-file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

DragAndDrop.propTypes = {
  onFileChange: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default DragAndDrop;
