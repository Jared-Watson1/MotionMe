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
          <img src={logo} alt="Logo" className="h-16" />
          <h1 className="text-4xl font-bold tracking-wider">$MOTION</h1>
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
          <figure className="max-w-screen-md mx-auto text-center mb-8">
            <svg className="w-12 h-12 mx-auto mb-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
            </svg>
            <blockquote className="text-5xl italic font-semibold text-center text-white tracking-wider">
              <p>“Got Motion?”</p>
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
