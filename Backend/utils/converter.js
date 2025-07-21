import { createCanvas, loadImage } from 'canvas';

export const convertToCanvasCode = async (filePath, mimetype) => {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');
  const image = await loadImage(filePath);
  ctx.drawImage(image, 0, 0, 500, 500);

  const commands = `
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.onload = () => {
  ctx.drawImage(img, 0, 0, 500, 500);
};
img.src = '${canvas.toDataURL()}';
`;

  return commands;
};
