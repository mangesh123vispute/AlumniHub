export const getCroppedImg = (imageSrc, pixelCrop, width, height) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        width,
        height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob); // Return the Blob object here
        } else {
          reject(new Error("Failed to create image blob"));
        }
      }, "image/jpeg");
    };
    image.onerror = reject;
  });
};
