import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FiDownload } from 'react-icons/fi'; // Import download icon

function CanvasEditor({ selectedFile, onDownload }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const maxWidth = window.innerWidth * 0.67; // 2/3 of the screen width
      const maxHeight = window.innerHeight * 0.67; // 2/3 of the screen height

      let width, height;

      if (img.width > img.height) {
        width = Math.min(maxWidth, img.width);
        height = width / aspectRatio;
      } else {
        height = Math.min(maxHeight, img.height);
        width = height * aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      imageRef.current = { img, width, height };
    };
  }, [selectedFile]);

  const handleDrop = (event) => {
    event.preventDefault();
    const assetSrc = event.dataTransfer.getData('asset');
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    setAssets((prevAssets) => [
      ...prevAssets,
      { src: assetSrc, x, y, width: 100, height: 100 }
    ]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleMouseDownOnAsset = (index, event, isHandle = false) => {
    event.stopPropagation();
    setSelectedAsset(index);

    if (isHandle) {
      setResizing(true);
      document.body.style.userSelect = 'none'; // Disable text selection
    } else {
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizing(false);
    document.body.style.userSelect = 'auto'; // Re-enable text selection
  };

  const handleMouseMove = (event) => {
    if (resizing && selectedAsset !== null) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;

      setAssets((prevAssets) =>
        prevAssets.map((asset, index) => {
          if (index === selectedAsset) {
            const aspectRatio = asset.width / asset.height;
            const newWidth = mouseX - asset.x;
            const newHeight = newWidth / aspectRatio;

            return { ...asset, width: newWidth, height: newHeight };
          }
          return asset;
        })
      );
    } else if (isDragging && selectedAsset !== null && !resizing) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setAssets((prevAssets) =>
        prevAssets.map((asset, index) =>
          index === selectedAsset ? { ...asset, x: x - asset.width / 2, y: y - asset.height / 2 } : asset
        )
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedAsset !== null && event.key === 'Delete') {
        setAssets((prevAssets) => prevAssets.filter((_, index) => index !== selectedAsset));
        setSelectedAsset(null);
      }
    };
  
    const keyDownListener = handleKeyDown;
    document.addEventListener('keydown', keyDownListener);
    return () => {
      document.removeEventListener('keydown', keyDownListener);
    };
  }, [selectedAsset, setAssets, setSelectedAsset]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (imageRef.current) {
      ctx.drawImage(imageRef.current.img, 0, 0, imageRef.current.width, imageRef.current.height);
    }

    assets.forEach((asset, index) => {
      const img = new Image();
      img.src = asset.src;
      img.onload = () => {
        ctx.drawImage(img, asset.x, asset.y, asset.width, asset.height);

        if (index === selectedAsset) {
          // Draw a border around the selected asset
          ctx.strokeStyle = '#1E90FF'; // DodgerBlue
          ctx.lineWidth = 3;
          ctx.strokeRect(asset.x, asset.y, asset.width, asset.height);
        }
      };
    });
  };

  useEffect(() => {
    drawCanvas();
  }, [assets, selectedAsset]);

  const renderResizeHandles = (asset, index) => {
    const handleSize = 10;
    const handleColor = '#1E90FF'; // DodgerBlue
    const handleBorderColor = '#FFFFFF'; // White border for better visibility
    const handles = [
      { cursor: 'nwse-resize', x: asset.x, y: asset.y },
      { cursor: 'nesw-resize', x: asset.x + asset.width, y: asset.y },
      { cursor: 'nesw-resize', x: asset.x, y: asset.y + asset.height },
      { cursor: 'nwse-resize', x: asset.x + asset.width, y: asset.y + asset.height },
    ];

    return handles.map((handle, idx) => (
      <div
        key={`${index}-${idx}`}
        className={`absolute`}
        style={{
          left: handle.x - handleSize / 2,
          top: handle.y - handleSize / 2,
          width: handleSize,
          height: handleSize,
          backgroundColor: handleColor,
          border: `2px solid ${handleBorderColor}`,
          cursor: handle.cursor
        }}
        onMouseDown={(e) => handleMouseDownOnAsset(index, e, true)}
      />
    ));
  };

  const handleCanvasClick = () => {
    setSelectedAsset(null); // Deselect any selected asset
  };

  const handleDownload = () => {
    setSelectedAsset(null); // Deselect all assets
    setTimeout(onDownload, 100); // Delay download slightly to ensure deselection occurs
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas 
        ref={canvasRef} 
        className="border-4 border-gray-300 rounded-lg shadow-lg bg-white"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleCanvasClick} // Click on canvas to deselect assets
      />
      <button 
        className="mt-4 bg-blue-500 text-white p-3 rounded-full shadow hover:bg-blue-600 focus:outline-none"
        onClick={handleDownload} // Call custom handleDownload function
      >
        <FiDownload size={24} />
      </button>
      {assets.map((asset, index) => (
        <React.Fragment key={index}>
          <div
            className="absolute cursor-move"
            style={{ left: asset.x, top: asset.y, width: asset.width, height: asset.height }}
            onMouseDown={(e) => handleMouseDownOnAsset(index, e, false)}
          />
          {index === selectedAsset && renderResizeHandles(asset, index)}
        </React.Fragment>
      ))}
    </div>
  );
}

CanvasEditor.propTypes = {
  selectedFile: PropTypes.object.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default CanvasEditor;
