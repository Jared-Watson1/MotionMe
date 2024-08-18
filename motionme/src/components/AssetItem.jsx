import PropTypes from "prop-types";

function AssetItem({ src }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("asset", src);
  };

  return (
    <div
      className="w-full h-32 mb-4 p-2 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 cursor-pointer"
      draggable
      onDragStart={handleDragStart}
    >
      <img src={src} alt="Asset" className="w-full h-full object-contain" />
    </div>
  );
}

AssetItem.propTypes = {
  src: PropTypes.string.isRequired,
};

export default AssetItem;
