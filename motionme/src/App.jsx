import { useState, useEffect } from "react";
import DragAndDrop from "./components/DragAndDrop";
import CameraInput from "./components/CameraInput";
import CanvasEditor from "./components/CanvasEditor";
import AssetList from "./components/AssetList";
import Header from "./components/Header";
import GotMotionText from "./components/GotMotionText";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

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
    <div className={`min-h-screen flex flex-col container`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      {editing ? (
        <div className="flex h-full flex-col md:flex-row">
          <div className="md:w-2/3 w-full p-4 flex flex-col">
            <button
              className={`self-start mb-4 p-2 rounded-lg transition duration-300 ${
                isDarkMode
                  ? "bg-white text-black hover:bg-gray-800 hover:text-white"
                  : "bg-black text-white hover:bg-gray-200 hover:text-black"
              }`}
              onClick={handleBack}
            >
              ← Back
            </button>
            <CanvasEditor
              selectedFile={selectedFile}
              onDownload={handleDownload}
            />
          </div>
          <div
            className={`md:w-1/3 w-full md:pl-4 md:pr-0 p-4 ${
              isDarkMode ? "bg-black" : "bg-white"
            } md:flex md:justify-end`}
          >
            <AssetList isDarkMode={isDarkMode} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1">
          <GotMotionText isDarkMode={isDarkMode} /> {/* Pass isDarkMode here */}
          <DragAndDrop
            onFileChange={handleFileChange}
            isDarkMode={isDarkMode}
          />{" "}
          {/* Pass isDarkMode here */}
          <CameraInput
            onCapture={handleFileChange}
            isDarkMode={isDarkMode}
          />{" "}
          {/* Pass isDarkMode here */}
        </div>
      )}
    </div>
  );
}

export default App;
