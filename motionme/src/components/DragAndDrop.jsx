import PropTypes from "prop-types";

function DragAndDrop({ onFileChange }) {
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

  return (
    <div
      className="flex items-center justify-center w-full mb-4 mt-3"
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white rounded-lg bg-black text-center p-4 cursor-pointer"
        style={{ fontFamily: "'Got Milk', sans-serif" }}
      >
        <h2 className="text-4xl font-bold text-white mb-2 tracking-wider">
          STAY IN MOTION
        </h2>
        <p className="text-lg text-white mb-4">
          Add sunglasses and other stickers to any image
        </p>

        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <button className="bg-white text-black font-semibold px-4 py-2 rounded-md mb-2 hover:bg-gray-800 hover:text-white transition duration-300">
            + Upload an image
          </button>
          <p className="text-sm text-white">or drag & drop here</p>
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
};

export default DragAndDrop;
