import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiDownload } from "react-icons/fi";

function CanvasEditor({ selectedFile, onDownload }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [assets, setAssets] = useState([]);
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [initialRotation, setInitialRotation] = useState(0);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [setRotation] = useState(0);

  const handleSize = 10; // Size of the resize handles
  const rotateHandleDistance = 30; // Distance of rotate handle from top of the asset

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const screenWidth = window.innerWidth;
      const maxWidth =
        screenWidth < 768 ? screenWidth * 0.9 : screenWidth * 0.6;
      const maxHeight = window.innerHeight * 0.7;

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
    const assetSrc = event.dataTransfer.getData("asset");
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setAssets((prevAssets) => [
      ...prevAssets,
      { src: assetSrc, x, y, width: 100, height: 100, rotation: 0 },
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
    const { x, y, width, height } = getTransformedBoundingBox(asset);
    return (
      mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height
    );
  };

  const getTransformedBoundingBox = (asset) => {
    const { x, y, width, height, rotation } = asset;
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    return {
      x: centerX - width / 2,
      y: centerY - height / 2,
      width,
      height,
      rotation,
    };
  };

  const getClickedHandle = (mouseX, mouseY, asset) => {
    const handles = [
      { position: "top-left", x: asset.x, y: asset.y, cursor: "nwse-resize" },
      {
        position: "top-right",
        x: asset.x + asset.width,
        y: asset.y,
        cursor: "nesw-resize",
      },
      {
        position: "bottom-left",
        x: asset.x,
        y: asset.y + asset.height,
        cursor: "nesw-resize",
      },
      {
        position: "bottom-right",
        x: asset.x + asset.width,
        y: asset.y + asset.height,
        cursor: "nwse-resize",
      },
    ];

    return handles.find(
      (handle) =>
        mouseX >= handle.x - handleSize / 2 &&
        mouseX <= handle.x + handleSize / 2 &&
        mouseY >= handle.y - handleSize / 2 &&
        mouseY <= handle.y + handleSize / 2
    );
  };

  const isRotateHandleClicked = (mouseX, mouseY, asset) => {
    const centerX = asset.x + asset.width / 2;
    const handleX = centerX;
    const handleY = asset.y - rotateHandleDistance;

    const distance = Math.sqrt(
      (mouseX - handleX) ** 2 + (mouseY - handleY) ** 2
    );
    return distance <= handleSize / 2;
  };

  const handleMouseDownToDragOrResize = (event) => {
    const { x, y } = getMousePosition(event);

    const asset = assets[selectedAssetIndex];

    if (asset && isRotateHandleClicked(x, y, asset)) {
      setIsRotating(true);
      setInitialRotation(asset.rotation);
      setDragStart({ x, y });
    } else {
      const handle = asset ? getClickedHandle(x, y, asset) : null;

      if (handle) {
        setIsResizing(true);
        setResizeHandle(handle.position);
        setDragStart({ x, y });
        setInitialPosition({ x: asset.x, y: asset.y });
        setInitialSize({ width: asset.width, height: asset.height });
      } else {
        const clickedAssetIndex = assets.findIndex((asset) =>
          isInsideBox(x, y, asset)
        );
        if (clickedAssetIndex !== -1) {
          setSelectedAssetIndex(clickedAssetIndex);
          setIsDragging(true);
          setDragStart({ x, y });
          setInitialPosition({
            x: assets[clickedAssetIndex].x,
            y: assets[clickedAssetIndex].y,
          });
          setRotation(assets[clickedAssetIndex].rotation);
        } else {
          setSelectedAssetIndex(null);
        }
      }
    }
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const { x, y } = getMousePosition(event);
    const asset = assets[selectedAssetIndex];

    if (asset) {
      if (isRotateHandleClicked(x, y, asset)) {
        canvas.style.cursor = "crosshair";
      } else {
        const handle = getClickedHandle(x, y, asset);
        if (handle) {
          canvas.style.cursor = handle.cursor;
        } else {
          canvas.style.cursor = isInsideBox(x, y, asset) ? "move" : "default";
        }
      }
    } else {
      canvas.style.cursor = "default";
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

        if (resizeHandle.includes("right")) {
          newWidth = initialSize.width + dx;
        } else if (resizeHandle.includes("left")) {
          newWidth = initialSize.width - dx;
          newX = initialPosition.x + dx;
        }

        if (resizeHandle.includes("bottom")) {
          newHeight = initialSize.height + dy;
        } else if (resizeHandle.includes("top")) {
          newHeight = initialSize.height - dy;
          newY = initialPosition.y + dy;
        }

        if (event.shiftKey) {
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
    } else if (isRotating) {
      const centerX = asset.x + asset.width / 2;
      const centerY = asset.y + asset.height / 2;
      const angle = Math.atan2(y - centerY, x - centerX);
      const initialAngle = Math.atan2(
        dragStart.y - centerY,
        dragStart.x - centerX
      );
      const deltaAngle = angle - initialAngle;

      setAssets((prevAssets) => {
        const updatedAssets = [...prevAssets];
        const asset = updatedAssets[selectedAssetIndex];
        asset.rotation = initialRotation + deltaAngle * (180 / Math.PI);
        return updatedAssets;
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setIsRotating(false);
    setResizeHandle(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        selectedAssetIndex !== null &&
        (event.key === "Delete" || event.key === "Backspace")
      ) {
        setAssets((prevAssets) =>
          prevAssets.filter((_, index) => index !== selectedAssetIndex)
        );
        setSelectedAssetIndex(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedAssetIndex]);

  useEffect(() => {
    const drawCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (imageRef.current) {
        ctx.drawImage(
          imageRef.current.img,
          0,
          0,
          imageRef.current.width,
          imageRef.current.height
        );
      }

      assets.forEach((asset, index) => {
        const img = new Image();
        img.src = asset.src;
        img.onload = () => {
          const centerX = asset.x + asset.width / 2;
          const centerY = asset.y + asset.height / 2;

          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate((asset.rotation * Math.PI) / 180);
          ctx.drawImage(
            img,
            -asset.width / 2,
            -asset.height / 2,
            asset.width,
            asset.height
          );

          if (index === selectedAssetIndex) {
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.strokeRect(
              -asset.width / 2,
              -asset.height / 2,
              asset.width,
              asset.height
            );

            const handles = [
              { x: -asset.width / 2, y: -asset.height / 2 },
              { x: asset.width / 2, y: -asset.height / 2 },
              { x: -asset.width / 2, y: asset.height / 2 },
              { x: asset.width / 2, y: asset.height / 2 },
            ];

            handles.forEach((handle) => {
              ctx.fillStyle = "#ffffff";
              ctx.strokeStyle = "#000000";
              ctx.lineWidth = 2;
              ctx.fillRect(
                handle.x - handleSize / 2,
                handle.y - handleSize / 2,
                handleSize,
                handleSize
              );
              ctx.strokeRect(
                handle.x - handleSize / 2,
                handle.y - handleSize / 2,
                handleSize,
                handleSize
              );
            });

            // Draw rotation handle
            ctx.beginPath();
            ctx.arc(
              0,
              -asset.height / 2 - rotateHandleDistance,
              handleSize / 2,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.strokeStyle = "#000000";
            ctx.stroke();
          }

          ctx.restore();
        };
      });
    };

    drawCanvas();
  }, [assets, selectedAssetIndex]);

  const handleCanvasClick = (event) => {
    const { x, y } = getMousePosition(event);
    const clickedAssetIndex = assets.findIndex((asset) =>
      isInsideBox(x, y, asset)
    );

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
        className="mt-4 bg-white text-black p-3 rounded-full shadow hover:bg-[#1a1a1a] focus:outline-none md:ml-4 self-start"
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
