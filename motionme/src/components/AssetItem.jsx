import PropTypes from "prop-types";

function AssetItem({ name, src, isDarkMode, onClick }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("asset", src);
  };

  return (
    <div
      className={`relative w-full h-44 mb-4 p-2 border-2 rounded-lg cursor-pointer flex flex-col justify-center items-center ${
        isDarkMode
          ? "border-gray-700 bg-gray-800"
          : "border-gray-300 bg-gray-50"
      }`}
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
    >
      <img src={src} alt={name} className="max-h-28 object-contain" />
      <div
        className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md font-bold text-sm ${
          isDarkMode
            ? "text-white bg-gray-800 bg-opacity-75"
            : "text-black bg-white bg-opacity-75"
        }`}
      >
        {name}
      </div>
    </div>
  );
}

AssetItem.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AssetItem;
