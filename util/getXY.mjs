export default function getXY(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) / 0.3;
  const y = (e.clientY - rect.top) / 0.3;
  const pos = [x, y];
  return pos;
}
