import PropTypes from 'prop-types';

function CameraInput({ onCapture }) {
  const handleCapture = () => {
    const dummyImage = new File(["dummy content"], "dummy.png", { type: "image/png" });
    onCapture(dummyImage);
  };

  return (
    <div className="mt-6">
      <button
        className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
        onClick={handleCapture}
        style={{ fontFamily: "'Got Milk', sans-serif" }}
      >
        Take a Picture
      </button>
    </div>
  );
}

CameraInput.propTypes = {
  onCapture: PropTypes.func.isRequired,
};

export default CameraInput;
