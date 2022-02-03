function getTextWidth(text, size) {
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = `${size}px Arial`;
  const metrics = context.measureText(text);
  return metrics.width;
}

function downloadCSV(data, title) {
  const linkCSV = document.createElement('a');
  linkCSV.href = URL.createObjectURL(
    new Blob([data], { type: 'text/csv;charset=utf-8;' })
  );
  linkCSV.setAttribute('download', `${title}.csv`);
  linkCSV.click();
}

export { getTextWidth, downloadCSV };
