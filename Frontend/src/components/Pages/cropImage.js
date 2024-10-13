export const getCroppedImg = (imageSrc, crop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleX = image.width / image.naturalWidth;
      const scaleY = image.height / image.naturalHeight;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      // Convert the canvas to a blob (JPEG format)
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    };

    image.onerror = (err) => {
      reject(err);
    };
  });
};
