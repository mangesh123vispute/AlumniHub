import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider"; // for zoom control (optional)
import Button from "@mui/material/Button"; // for cropping action (optional)
import { getCroppedImg } from "./cropImageUtils"; // utility function for cropping

const ImageCropper = ({
  imageSrc,
  onCropComplete,
  aspectRatio = 4 / 3,
  cropWidth = 200,
  cropHeight = 200,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => setCrop(crop);
  const onZoomChange = (zoom) => setZoom(zoom);

  const onCropCompleteHandler = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const onCropClick = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        cropWidth,
        cropHeight
      );
      onCropComplete(croppedImage);
    } catch (e) {
      console.error("Error cropping the image", e);
    }
  };

  return (
    <div>
      {/* Container with border radius */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 400,
          borderRadius: "16px", // Add border radius here
          overflow: "hidden", // Ensures content doesn't overflow the rounded corners
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Optional shadow for better visibility
        }}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={onCropChange}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={onZoomChange}
          style={{
            borderRadius: "16px", // You can add border radius here if the Cropper supports it
          }}
        />
      </div>
      <Slider
        min={1}
        max={3}
        step={0.1}
        value={zoom}
        onChange={(e, newZoom) => setZoom(newZoom)}
        style={{ marginTop: "1em" }}
      />
      
      <Button
        variant="contained"
        color="primary"
        className="btn btn-primary btn-block"
        style={{ marginTop: "0.5rem" }}
      >
        Upload New Image
      </Button>
      <Button
        variant="contained"
        color="primary"
        className="btn btn-primary btn-block"
        onClick={onCropClick}
        style={{ marginTop: "10px" }}
      >
        Crop Image
      </Button>
    </div>
  );
};

export default ImageCropper;
