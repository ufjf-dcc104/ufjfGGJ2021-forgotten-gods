import Sprite from "./Sprite.mjs";
import Ready from "./Ready.mjs";
import Sacrifice from "./Sacrifice.mjs";
import Sacrifices from "./Sacrifices.mjs";
import Area from "./Area.mjs";

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
  const ready = new Ready("Ready", 50);
  const died = new Area("Died", 350, 300);
  const resting = new Area("Resting", 350, 150);
  const available = new Area("Avaiable", 0, 400);

  available.add(new Sprite(0));
  available.add(new Sprite(0));
  available.add(new Sprite(1));
  available.add(new Sprite(1));
  available.add(new Sprite(2));
  available.add(new Sprite(2));
  available.add(new Sprite(3));
  available.add(new Sprite(3));
  available.add(new Sprite(1));
  available.add(new Sprite(2));
  available.add(new Sprite(2));
  available.add(new Sprite(3));
  available.add(new Sprite(3));

  const newTurn = new Sprite(0);
  Object.assign(newTurn, { x: 500, y: 300, w: 100, h: 30 });
  ready.add(new Sprite(0));
  ready.add(new Sprite(1));
  ready.add(new Sprite(2));
  ready.add(new Sprite(3));
  ready.add(new Sprite(0));

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
    died.draw(ctx);
    available.draw(ctx);
    resting.draw(ctx);
    newTurn.draw(ctx);

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
        if (s.type === dragging.type) {
          game.grace++;
        } else {
          game.grace--;
          game.reputation--;
        }
        died.add(dragging);
        ready.delete(dragging);
        sacrifices.delete(s);
        dragging = null;
      }
      dragging = null;
    }
  }
  function click(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    console.log(x, y);
    if (newTurn.hasPoint({ x, y })) {
      resting.addAll(ready);
    
      if (available.size() <= 5) {
          ready.addAll(available);
          available.addAll(resting);
      }
      while (ready.size() < 5 && available.size() > 0) {
        const r = Math.floor(Math.random() * available.size());
        const p = available.people[r];
        ready.add(p);
        available.delete(p);
      }
    }
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
