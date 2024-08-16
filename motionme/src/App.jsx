import { useState } from 'react';
import DragAndDrop from './components/DragAndDrop';
import FileInput from './components/FileInput';
import CameraInput from './components/CameraInput';
import CanvasEditor from './components/CanvasEditor';
import AssetList from './components/AssetList';

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {editing ? (
        <div className="flex h-full">
          {/* Left side: Canvas Editor */}
          <div className="w-2/3 p-4">
            <button 
              className="text-white mb-2 bg-blue-600 p-2 rounded-lg"
              onClick={handleBack}
            >
              ← Back
            </button>
            <CanvasEditor 
              selectedFile={selectedFile} 
              onDownload={handleDownload} 
            />
          </div>

          {/* Right side: Image Assets */}
          <div className="w-1/3 p-4">
            <AssetList />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <DragAndDrop onFileChange={handleFileChange} />
          <FileInput onFileChange={handleFileChange} />
          <CameraInput onCapture={handleFileChange} />
        </div>
      )}
    </div>
  );
}

export default App;
