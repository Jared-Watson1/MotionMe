import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";

function CameraInput({ onCapture }) {
  const [videoStream, setVideoStream] = useState(null);
  const [videoElement, setVideoElement] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      video.style.position = "absolute";
      video.style.top = "50%";
      video.style.left = "50%";
      video.style.transform = "translate(-50%, -50%)";
      video.style.zIndex = "999";
      document.body.appendChild(video);
      setVideoElement(video);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const capturePhoto = () => {
    if (videoElement) {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        const file = new File([blob], "photo.png", { type: "image/png" });
        onCapture(file);
      });

      // Stop the video stream and clean up
      videoStream.getTracks().forEach((track) => track.stop());
      document.body.removeChild(videoElement);
      setVideoStream(null);
      setVideoElement(null);
    }
  };

  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
      if (videoElement) {
        document.body.removeChild(videoElement);
      }
    };
  }, [videoStream, videoElement]);

  return (
    <div className="mt-6 flex flex-col items-center">
      {!videoStream && (
        <button
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
          onClick={startCamera}
          style={{ fontFamily: "'Got Milk', sans-serif" }}
        >
          <FiCamera className="mr-2" size={20} />
          Take a Picture
        </button>
      )}

      {videoStream && (
        <button
          className="mt-4 flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
          onClick={capturePhoto}
          style={{ fontFamily: "'Got Milk', sans-serif" }}
        >
          Capture Photo
        </button>
      )}
    </div>
  );
}

CameraInput.propTypes = {
  onCapture: PropTypes.func.isRequired,
};

export default CameraInput;
