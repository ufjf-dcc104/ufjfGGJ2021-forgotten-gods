import Sprite from "./Sprite.mjs";

window.onload = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 480;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.onmousedown = mousedown;
  canvas.onmouseup = mouseup;
  canvas.onclick = click;
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

  function mousedown(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
  }
  function mouseup(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
  }
  function click(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    if (sprites[0].hasPoint({ x, y })) {
      sprites[0].color = "red";
    }
  }
};
