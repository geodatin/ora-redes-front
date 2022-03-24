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

function getYLineAnnotation({ y, color, bgColor, label, yScaleID, display }) {
  let labelEnabled = false;
  if (label) {
    labelEnabled = true;
  }

  return {
    display,
    type: 'line',
    yScaleID: yScaleID ?? 'y',
    yMin: y,
    yMax: y,
    backgroundColor: color,
    borderColor: color,
    borderDash: [7],
    label: {
      enabled: labelEnabled,
      content: label,
      color,
      padding: 0,
      backgroundColor: bgColor,
      font: {
        size: 12,
      },
    },
  };
}

export { getTextWidth, downloadCSV, getYLineAnnotation };
