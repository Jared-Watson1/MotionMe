import PropTypes from 'prop-types';
import { FiCamera } from 'react-icons/fi'; // Import the camera icon

function CameraInput({ onCapture }) {
  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // Wait for the user to take a picture
      const takePicture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          const file = new File([blob], "photo.png", { type: "image/png" });
          onCapture(file);
        });
        stream.getTracks().forEach(track => track.stop()); // Stop the video stream
      };

      video.addEventListener('click', takePicture);
      document.body.appendChild(video);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <div className="mt-6">
      <button
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
        onClick={handleCapture}
        style={{ fontFamily: "'Got Milk', sans-serif" }}
      >
        <FiCamera className="mr-2" size={20} /> {/* Added camera icon */}
        Take a Picture
      </button>
    </div>
  );
}

CameraInput.propTypes = {
  onCapture: PropTypes.func.isRequired,
};

export default CameraInput;
