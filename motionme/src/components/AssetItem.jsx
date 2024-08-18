import PropTypes from "prop-types";

function AssetItem({ src, isDarkMode }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("asset", src);
  };

  return (
    <div
      className={`w-full h-32 mb-4 p-2 border-2 border-dashed rounded-lg cursor-pointer ${
        isDarkMode
          ? "border-gray-700 bg-gray-800"
          : "border-gray-300 bg-gray-50"
      }`}
      draggable
      onDragStart={handleDragStart}
    >
      <img src={src} alt="Asset" className="w-full h-full object-contain" />
    </div>
  );
}

AssetItem.propTypes = {
  src: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default AssetItem;
