import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiDownload } from 'react-icons/fi';

function CanvasEditor({ selectedFile, onDownload }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [assets, setAssets] = useState([]);
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [resizeHandle, setResizeHandle] = useState(null);

  const handleSize = 10; // Size of the resize handles

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const maxWidth = window.innerWidth * 0.67;
      const maxHeight = window.innerHeight * 0.67;

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
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setAssets((prevAssets) => [
      ...prevAssets,
      { src: assetSrc, x, y, width: 100, height: 100 }
    ]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const getMousePosition = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const isInsideBox = (mouseX, mouseY, asset) => {
    return (
      mouseX >= asset.x &&
      mouseX <= asset.x + asset.width &&
      mouseY >= asset.y &&
      mouseY <= asset.y + asset.height
    );
  };

  const getClickedHandle = (mouseX, mouseY, asset) => {
    const handles = [
      { position: 'top-left', x: asset.x, y: asset.y, cursor: 'nwse-resize' },
      { position: 'top-right', x: asset.x + asset.width, y: asset.y, cursor: 'nesw-resize' },
      { position: 'bottom-left', x: asset.x, y: asset.y + asset.height, cursor: 'nesw-resize' },
      { position: 'bottom-right', x: asset.x + asset.width, y: asset.y + asset.height, cursor: 'nwse-resize' },
    ];

    return handles.find(
      (handle) =>
        mouseX >= handle.x - handleSize / 2 &&
        mouseX <= handle.x + handleSize / 2 &&
        mouseY >= handle.y - handleSize / 2 &&
        mouseY <= handle.y + handleSize / 2
    );
  };

  const handleMouseDownToDragOrResize = (event) => {
    const { x, y } = getMousePosition(event);

    // Check if any handle is clicked
    const asset = assets[selectedAssetIndex];
    const handle = asset ? getClickedHandle(x, y, asset) : null;

    if (handle) {
      setIsResizing(true);
      setResizeHandle(handle.position);
      setDragStart({ x, y });
      setInitialPosition({ x: asset.x, y: asset.y });
      setInitialSize({ width: asset.width, height: asset.height });
    } else {
      // Check if any asset's bounding box is clicked
      const clickedAssetIndex = assets.findIndex((asset) => isInsideBox(x, y, asset));
      if (clickedAssetIndex !== -1) {
        setSelectedAssetIndex(clickedAssetIndex);
        setIsDragging(true);
        setDragStart({ x, y });
        setInitialPosition({ x: assets[clickedAssetIndex].x, y: assets[clickedAssetIndex].y });
      } else {
        setSelectedAssetIndex(null);
      }
    }
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const { x, y } = getMousePosition(event);
    const asset = assets[selectedAssetIndex];

    // Update cursor when hovering over a handle
    if (asset) {
        const handle = getClickedHandle(x, y, asset);
        if (handle) {
            canvas.style.cursor = handle.cursor;
        } else {
            canvas.style.cursor = isInsideBox(x, y, asset) ? 'move' : 'default';
        }
    } else {
        canvas.style.cursor = 'default';
    }

    if (selectedAssetIndex === null) return;

    const dx = x - dragStart.x;
    const dy = y - dragStart.y;

    if (isDragging) {
        setAssets((prevAssets) => {
            const updatedAssets = [...prevAssets];
            const asset = updatedAssets[selectedAssetIndex];
            asset.x = initialPosition.x + dx;
            asset.y = initialPosition.y + dy;
            return updatedAssets;
        });
    } else if (isResizing) {
        setAssets((prevAssets) => {
            const updatedAssets = [...prevAssets];
            const asset = updatedAssets[selectedAssetIndex];

            let newWidth = initialSize.width;
            let newHeight = initialSize.height;
            let newX = initialPosition.x;
            let newY = initialPosition.y;

            if (resizeHandle.includes('right')) {
                newWidth = initialSize.width + dx;
            } else if (resizeHandle.includes('left')) {
                newWidth = initialSize.width - dx;
                newX = initialPosition.x + dx;
            }

            if (resizeHandle.includes('bottom')) {
                newHeight = initialSize.height + dy;
            } else if (resizeHandle.includes('top')) {
                newHeight = initialSize.height - dy;
                newY = initialPosition.y + dy;
            }

            if (event.shiftKey) {
                // Maintain aspect ratio when Shift key is held
                const aspectRatio = initialSize.width / initialSize.height;
                if (newWidth / aspectRatio > newHeight) {
                    newHeight = newWidth / aspectRatio;
                } else {
                    newWidth = newHeight * aspectRatio;
                }
            }

            if (newWidth > 0 && newHeight > 0) {
                asset.x = newX;
                asset.y = newY;
                asset.width = newWidth;
                asset.height = newHeight;
            }

            return updatedAssets;
        });
    }
};




  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  };

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

        if (index === selectedAssetIndex) {
          // Draw the bounding box around the selected asset
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.strokeRect(asset.x, asset.y, asset.width, asset.height);

          // Draw the resize handles
          const handles = [
            { x: asset.x, y: asset.y }, // Top-left
            { x: asset.x + asset.width, y: asset.y }, // Top-right
            { x: asset.x, y: asset.y + asset.height }, // Bottom-left
            { x: asset.x + asset.width, y: asset.y + asset.height }, // Bottom-right
          ];

          handles.forEach((handle) => {
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.fillRect(handle.x - handleSize / 2, handle.y - handleSize / 2, handleSize, handleSize);
            ctx.strokeRect(handle.x - handleSize / 2, handle.y - handleSize / 2, handleSize, handleSize);
          });
        }
      };
    });
  };

  useEffect(() => {
    drawCanvas();
  }, [assets, selectedAssetIndex]);

  const handleCanvasClick = (event) => {
    const { x, y } = getMousePosition(event);
    const clickedAssetIndex = assets.findIndex((asset) => isInsideBox(x, y, asset));

    if (clickedAssetIndex === -1) {
      setSelectedAssetIndex(null);
    }
  };

  const handleDownloadClick = () => {
    setSelectedAssetIndex(null);
    setTimeout(onDownload, 100);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas
        ref={canvasRef}
        className="border-4 border-black rounded-lg shadow-lg bg-black"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseDown={handleMouseDownToDragOrResize}
        onClick={handleCanvasClick}
      />
      <button
        className="mt-4 bg-white text-black p-3 rounded-full shadow hover:bg-[#1a1a1a] focus:outline-none"
        onClick={handleDownloadClick}
      >
        <FiDownload size={24} />
      </button>
    </div>
  );
}

CanvasEditor.propTypes = {
  selectedFile: PropTypes.object.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default CanvasEditor;
