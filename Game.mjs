import Sprite from "./Sprite.mjs";
import Ready from "./Ready.mjs";
import Sacrifices from "./Sacrifices.mjs";
import Activities from "./Activities.mjs";
import Activity from "./Activity.mjs";
import Area from "./Area.mjs";
import { ALL_SACRIFICES } from "./AllCards.mjs";
import { ALL_AVAILABLE } from "./AllCards.mjs";
import People from "./People.mjs";

export const bg = new Image();
bg.src = "./assets/gamejam.png";

window.onload = () => {
  const padzero = (num, places) => String(num).padStart(places, "0");
  const game = {
    expire: 180,
    reputation: 5,
    grace: 5,
  };
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 560;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.onmousedown = mousedown;
  canvas.onmouseup = mouseup;
  canvas.onclick = click;
  canvas.onmousemove = mousemove;
  canvas.onmouseout = mouseout;

  let dragging = null;

  const sacrifices = new Sacrifices(130, 100);
  sacrifices.loadAll(ALL_SACRIFICES);

  const ready = new Ready("Ready", 62, canvas.height - 148);
  const died = new Area("Died", 60, canvas.height - 100, false);
  const resting = new Area("Resting", 60, canvas.height - 100, false);

  const available = new Area("Available", 60, canvas.height - 100, false);
  available.loadAll(ALL_AVAILABLE);
  game.available = available;

  const activities = new Activities(80, canvas.height - 300);
  activities.add(new Activity(0, 10));
  activities.add(new Activity(1, 7));
  activities.add(new Activity(2, 6));
  activities.add(new Activity(3, 3));

  const newTurn = new Sprite(0);
  Object.assign(newTurn, {
    x: canvas.width / 2,
    y: canvas.height - 230,
    w: 100,
    h: 30,
  });
  ready.add(new People(0));
  ready.add(new People(1));
  ready.add(new People(2));
  ready.add(new People(3));
  ready.add(new People(0));

  let t0;
  let dt;
  requestAnimationFrame(step);
  function step(t) {
    t0 = t0 ?? t;
    dt = (t - t0) / 1000;
    ctx.fillStyle = "hsl(200, 7%, 84%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "hsl(200, 7%, 74%)";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    sacrifices.expire(dt, game);
    sacrifices.draw(ctx);
    activities.expire(dt, game);
    activities.draw(ctx);
    ready.draw(ctx);
    died.draw(ctx);
    available.draw(ctx);
    resting.draw(ctx);
    newTurn.draw(ctx);

    game.expire -= Math.min(game.expire, 1 * dt);
    const min = padzero(Math.floor(game.expire / 60), 2);
    const seg = padzero(Math.floor(game.expire % 60), 2);
    ctx.font = "30px bold monospace";
    ctx.fillStyle = "black";
    ctx.fillText(`${min}:${seg}`, 130, 25);
    ctx.font = "20px bold monospace";
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
        dragging.oldx = dragging.x;
        dragging.oldy = dragging.y;
      }
    });
  }
  function mouseup(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    if (dragging !== null) {
      dragging.x = x;
      dragging.y = y;
      const s = sacrifices.check(x, y);
      const a = activities.check(x, y);
      if (s) {
        if (s.type === dragging.type) {
          game.grace++;
          s.effect(game);
        } else {
          game.grace--;
          game.reputation--;
        }
        died.add(dragging);
        ready.delete(dragging);
        sacrifices.delete(s);
        dragging = null;
        return;
      }
      if (a) {
        if (a.deliver(dragging.type)) {
        } else {
          game.reputation--;
        }
        resting.add(dragging);
        ready.delete(dragging);
        if (a.demands.length === 0) {
          game.reputation++;
          activities.delete(a);
        }
        dragging = null;
        return;
      }
      dragging.x = dragging?.oldx;
      dragging.y = dragging?.oldy;
      dragging = null;
    }
  }
  function click(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
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
  function mouseout(e) {
    if (dragging) {
      dragging.x = dragging?.oldx;
      dragging.y = dragging?.oldy;
      dragging = null;
    }
  }
};
