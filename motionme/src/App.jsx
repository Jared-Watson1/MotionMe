import { useState } from "react";
import DragAndDrop from "./components/DragAndDrop";
import CameraInput from "./components/CameraInput";
import CanvasEditor from "./components/CanvasEditor";
import AssetList from "./components/AssetList";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleFileChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setEditing(true);
    }
  };

  const handleBack = () => {
    setSelectedFile(null);
    setEditing(false);
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col"
      style={{ fontFamily: "'Got Milk', sans-serif" }}
    >
      <Header /> {/* Use the new Header component */}
      {editing ? (
        <div className="flex h-full flex-col md:flex-row">
          <div className="md:w-2/3 w-full p-4 flex flex-col">
            <button
              className="self-start text-black mb-4 bg-white p-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
              onClick={handleBack}
            >
              ← Back
            </button>
            <CanvasEditor
              selectedFile={selectedFile}
              onDownload={handleDownload}
            />
          </div>
          <div className="md:w-1/3 w-full md:pl-4 md:pr-0 p-4 bg-black md:flex md:justify-end">
            <AssetList />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 bg-black">
          <figure className="max-w-screen-md mx-auto text-center mb-20">
            {" "}
            {/* Increased bottom margin */}
            <blockquote className="text-6xl italic font-semibold text-center text-white tracking-wider">
              <p>got motion?</p>
            </blockquote>
          </figure>
          <DragAndDrop onFileChange={handleFileChange} />
          <CameraInput onCapture={handleFileChange} />
        </div>
      )}
    </div>
  );
}

export default App;
