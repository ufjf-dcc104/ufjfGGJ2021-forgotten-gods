import Activity from "./Activity.mjs";
import People from "./People.mjs";
import { shuffleArray } from "./util/shuffle.mjs";

export default class Activities {
  constructor(x = 300, y = 120, type = 0) {
    this.x = x;
    this.y = y;
    this.activities = [];
    this.max = 1;
    this.reputation = 4;
    this.spawn = 1;
    this.type = type;
  }

  loadAll(activities) {
    activities.forEach((s) => {
      for (let c = 0; c < s.qty; c++) {
        this.add(new Activity({ ...s, w: 200, h: 200 }));
      }
    });
    this.shuffle();
  }

  add(activity) {
    this.activities.push(activity);
    activity.draggable = false;
  }
  delete(activity) {
    const idx = this.activities.indexOf(activity);
    this.activities.splice(idx, 1);
  }

  draw(ctx) {
    const canvas = ctx.canvas;
    for (let s = 0; s < Math.min(this.activities.length, this.max); s++) {
      const activity = this.activities[s];
      activity.x = this.x + (activity.w + 8) * s;
      activity.y = this.y;
      activity.draw(ctx);
      const x = this.x - 0.09375 * canvas.width;
      const y = this.y + 0.125 * canvas.height;
      ctx.fillStyle = "white";
      ctx.fillRect(
        x,
        y,
        0.1875 * canvas.width,
        0.01607142857142857 * canvas.height
      );
      ctx.fillStyle = "black";
      ctx.fillStyle = "yellow";
      ctx.fillRect(
        x,
        y,
        0.1875 * canvas.width * (1 - this.spawn),
        0.008928571428571428 * canvas.height
      );
      ctx.strokeStyle = "black";
      ctx.strokeRect(
        x,
        y - 2,
        0.1875 * canvas.width,
        0.01607142857142857 * canvas.height
      );
      ctx.fillStyle = `hsl(${(240 * this.reputation) / 4}, 100%, 50%)`;
      ctx.beginPath();
      ctx.ellipse(
        x + (this.reputation * 0.1875 * canvas.width) / 4,
        y + 3,
        3,
        3,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
    }
  }

  expire(dt, game) {
    this.spawn -= ((this.reputation + 1) / 60) * dt;
    if (this.spawn <= 0) {
      game.areas.available.people.push(new People(this.type));
      this.spawn = 1;
    }
    for (let s = 0; s < Math.min(this.activities.length, 1); s++) {
      const activity = this.activities[s];
      activity.expire -= 1 * dt;
      if (activity.expire <= 0) {
        this.reputation = this.reputation > 0 ? this.reputation - 1 : 0;
        activity.expire = activity.total;
        this.sendToBottom(activity);
      }
    }
  }

  check(x, y) {
    return this.activities.find((sac) => sac.hasPoint({ x, y }));
  }
  sendToBottom(activity) {
    const idx = this.activities.indexOf(activity);
    const act = this.activities.splice(idx, 1)[0];
    this.activities.push(act);
  }

  shuffle() {
    shuffleArray(this.activities);
  }
}
