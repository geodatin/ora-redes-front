export default function getTextWidth(text, size) {
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = `${size}px Arial`;
  const metrics = context.measureText(text);
  return metrics.width;
}
