import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { FiCamera } from "react-icons/fi";

function CameraInput({ onCapture, isDarkMode }) {
  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use the rear camera if available
      });
      setVideoStream(stream);
      const video = videoRef.current;
      video.srcObject = stream;
      video.play();
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to a Blob and then to a File object
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "photo.png", { type: "image/png" });
          onCapture(file);
        }
      });

      // Stop the video stream and clean up
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup when the component unmounts
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoStream]);

  return (
    <div className="mt-6 flex flex-col items-center">
      {!videoStream && (
        <button
          className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition duration-300 ${
            isDarkMode
              ? "text-black bg-white hover:bg-gray-800 hover:text-white"
              : "text-white bg-black hover:bg-gray-200 hover:text-black"
          }`}
          onClick={startCamera}
          style={{ fontFamily: "'Got Milk', sans-serif" }}
        >
          <FiCamera className="mr-2" size={20} />
          Take a Picture
        </button>
      )}

      {videoStream && (
        <>
          <video
            ref={videoRef}
            className="rounded-lg"
            style={{ maxWidth: "100%", height: "auto" }}
            playsInline
          />
          <canvas ref={canvasRef} className="hidden" />
          <button
            className={`mt-4 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition duration-300 ${
              isDarkMode
                ? "text-black bg-white hover:bg-gray-800 hover:text-white"
                : "text-white bg-black hover:bg-gray-200 hover:text-black"
            }`}
            onClick={capturePhoto}
            style={{ fontFamily: "'Got Milk', sans-serif" }}
          >
            Capture Photo
          </button>
        </>
      )}
    </div>
  );
}

CameraInput.propTypes = {
  onCapture: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default CameraInput;
