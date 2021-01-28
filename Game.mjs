import Sprite from "./Sprite.mjs";

window.onload = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 480;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let reputation = 5;
  let grace = 5;

  const sprites = [];
  sprites.push(new Sprite(50, 50, 10, 10));

  let t0;
  let dt;
  requestAnimationFrame(step);
  function step(t) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    sprites[0].draw(ctx);
    ctx.font = "20px bold monospace";
    ctx.fillStyle = "white";
    ctx.fillText(`Grace ${grace}`, 10, 20);
    ctx.fillText(`Reputation ${reputation}`, 10, 40);
    requestAnimationFrame(step);
  }
};
