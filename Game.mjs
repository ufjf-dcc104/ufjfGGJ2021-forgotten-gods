import Sprite from "./Sprite.mjs";
import Ready from "./Ready.mjs";

window.onload = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 480;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.onmousedown = mousedown;
  canvas.onmouseup = mouseup;
  canvas.onclick = click;
  canvas.onmousemove = mousemove;
  let reputation = 5;
  let grace = 5;

  let dragging = null;

  const sprites = [];
  const ready = new Ready(50);
  ready.add(new Sprite(0));
  ready.add(new Sprite(1));
  ready.add(new Sprite(2));
  ready.add(new Sprite(3));

  let t0;
  let dt;
  requestAnimationFrame(step);
  function step(t) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ready.draw(ctx);
    ctx.font = "20px bold monospace";
    ctx.fillStyle = "white";
    ctx.fillText(`Grace ${grace}`, 10, 20);
    ctx.fillText(`Reputation ${reputation}`, 10, 40);
    requestAnimationFrame(step);
  }

  function mousedown(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    ready.people.forEach((s) => {
      if (s.draggable && s.hasPoint({ x, y })) {
        dragging = s;
      }
    });
  }
  function mouseup(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    if (dragging) {
      dragging.x = x;
      dragging.y = y;
      dragging = null;
    }
  }
  function click(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    ready.people.forEach((p) => {
      if (p.hasPoint({ x, y })) {
        p.type = 0;
      }
    });
  }
  function mousemove(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    if (dragging) {
      dragging.x = x;
      dragging.y = y;
    }
  }
};
