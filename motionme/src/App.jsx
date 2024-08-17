import { useState } from 'react';
import DragAndDrop from './components/DragAndDrop';
import CameraInput from './components/CameraInput';
import CanvasEditor from './components/CanvasEditor';
import AssetList from './components/AssetList';
import logo from './assets/logo.png';
import './App.css'; 



function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setEditing(true);
    }
  };

  const handleBack = () => {
    setSelectedFile(null);
    setEditing(false);
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Got Milk', sans-serif" }}>
      <header className="p-4 bg-black flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold">#MOTION</h1>
        </div>
      </header>

      {editing ? (
        <div className="flex h-full">
          <div className="w-2/3 p-4">
            <button
              className="text-black mb-2 bg-white p-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
              onClick={handleBack}
            >
              ← Back
            </button>
            <CanvasEditor selectedFile={selectedFile} onDownload={handleDownload} />
          </div>
          <div className="w-1/3 p-4 bg-black">
            <AssetList />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-black">
          <h2 className="text-3xl font-bold mb-4">#MOTION</h2>
          <blockquote className="text-xl italic font-semibold text-center text-white">
            <p>Got Motion?</p>
          </blockquote>
          <DragAndDrop onFileChange={handleFileChange} />
          <CameraInput onCapture={handleFileChange} />
        </div>
      )}
    </div>
  );
}

export default App;
