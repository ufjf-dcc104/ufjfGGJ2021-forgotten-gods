import Sprite from "./Sprite.mjs";
import Ready from "./Ready.mjs";
import Sacrifice from "./Sacrifice.mjs";
import Sacrifices from "./Sacrifices.mjs";

window.onload = () => {
  const game = {
    reputation: 5,
    grace: 5,
  };
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 480;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.onmousedown = mousedown;
  canvas.onmouseup = mouseup;
  canvas.onclick = click;
  canvas.onmousemove = mousemove;

  let dragging = null;

  const sacrifices = new Sacrifices();
  sacrifices.add(new Sacrifice(0, 10));
  sacrifices.add(new Sacrifice(1, 7));
  sacrifices.add(new Sacrifice(2, 6));
  sacrifices.add(new Sacrifice(3, 3));
  const ready = new Ready(50);
  
  ready.add(new Sprite(0));
  ready.add(new Sprite(1));
  ready.add(new Sprite(2));
  ready.add(new Sprite(3));

  let t0;
  let dt;
  requestAnimationFrame(step);
  function step(t) {
    t0 = t0 ?? t;
    dt = (t - t0) / 1000;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    sacrifices.expire(dt, game);
    sacrifices.draw(ctx);
    ready.draw(ctx);

    ctx.font = "20px bold monospace";
    ctx.fillStyle = "white";
    ctx.fillText(`Grace ${game.grace}`, 10, 20);
    ctx.fillText(`Reputation ${game.reputation}`, 10, 40);
    requestAnimationFrame(step);
    t0 = t;
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
      const s = sacrifices.check(x, y);
      if (s) {
        game.grace += s.type === dragging.type ? 1 : -1;
        ready.people.delete(dragging);
        sacrifices.delete(s);
        dragging = null;
      }
      dragging = null;
    }
  }
  function click(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    ready.people.forEach((p) => {
      if (p.hasPoint({ x, y })) {
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
