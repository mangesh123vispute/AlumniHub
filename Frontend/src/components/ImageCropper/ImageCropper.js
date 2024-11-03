import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { getCroppedImg } from "./cropImageUtils";

const ImageCropper = ({
  imageSrc,
  onCropComplete,
  aspectRatio = 1 / 1,
  cropWidth = 200,
  cropHeight = 200,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc); // Track current image

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
        currentImageSrc,
        croppedAreaPixels,
        cropWidth,
        cropHeight
      );
      onCropComplete(croppedImage);
    } catch (e) {
      console.error("Error cropping the image", e);
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCurrentImageSrc(reader.result); // Set the uploaded image as the new image source
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 400,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Cropper
          image={currentImageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={onCropChange}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={onZoomChange}
        />
      </div>
      <Slider
        min={1}
        max={3}
        valueLabelDisplay="auto"
        marks
        step={0.1}
        value={zoom}
        onChange={(e, newZoom) => setZoom(newZoom)}
        style={{ marginTop: "1em" }}
      />

      
      <div
        style={{
          display: "flex",
          gap: "2em",
          alignItems: "center",
          marginTop: "1rem",
          marginLeft: "0.8rem",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="upload-button"
        />
        <label htmlFor="upload-button">
          <Button variant="contained" color="primary" component="span">
            Upload New Image
          </Button>
        </label>
      <label htmlFor="crop-button">
        <Button variant="contained" id="crop-button" color="primary" onClick={onCropClick}>
          Crop & Save
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ImageCropper;
