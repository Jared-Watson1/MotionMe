import PropTypes from 'prop-types';

function CameraInput({ onCapture }) {
  const handleCapture = () => {
    // Simulate capturing an image
    const dummyImage = new File(["dummy content"], "dummy.png", { type: "image/png" });
    onCapture(dummyImage);
  };

  return (
    <div className="mt-6">
      <button
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        onClick={handleCapture}
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
