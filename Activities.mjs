import Activity from "./Activity.mjs";
import People from "./People.mjs";
import { shuffleArray } from "./util/shuffle.mjs";
import {PH, PW} from "./data/AllTimeConstants.mjs";

export default class Activities {
  constructor(x = 300, y = 120, type = 0) {
    this.x = x;
    this.y = y;
    this.activities = [];
    this.max = 1;
    this.reputation = 2;
    this.spawn = 1;
    this.type = type;
  }

  loadAll(activities, canvas) {
    const w = 0.3125 * canvas.width;
    const h = 0.17857142857142858 * canvas.height;
    activities.forEach((s) => {
      for (let c = 0; c < s.qty; c++) {
        this.add(new Activity({ ...s, w, h }));
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
    }
    const x = this.x - 0.17 * canvas.width;
    const y = this.y + 0.095 * canvas.height;
    const w = 0.25 * canvas.width;
    const h = 0.01 * canvas.height;

    // Draw spawn bar
    // background
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, w, h);
    //filling bar
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, w * (1 - this.spawn), h);
    // border
    ctx.strokeStyle = "hsl(120,50%,25%)";
    ctx.lineWidth = h / 3;
    ctx.strokeRect(x, y, w, h);

    //Draw reputation disc
    ctx.fillStyle = `hsl(${(240 * this.reputation) / 4}, 100%, 50%)`;
    ctx.beginPath();
    ctx.ellipse(
      x + (this.reputation * w) / 4,
      y * 1.01,
      0.015 * canvas.width,
      0.015 * canvas.width,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.lineWidth = h / 4;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  expire(dt, game) {
    this.spawn -= ((this.reputation + 1) / 60) * dt;
    const r = 0.115;
    const w = game.canvas.height * r * 0.75;
    const h = game.canvas.height * r;
    if (this.spawn <= 0) {
      console.log(this.type);
      this.doSpawn(game);
      this.spawn = 1;
    }
    for (let s = 0; s < Math.min(this.activities.length, 1); s++) {
      const activity = this.activities[s];
      activity.expire -= 1 * dt;
      if (activity.expire <= 0) {
        this.loseRep();
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

  setReputation(r) {
    this.reputation = r;
    if (r < 0) this.reputation = 0;
    if (r > 4) this.reputation = 4;
  }
  loseRep(n = 1) {
    this.setReputation(this.reputation - n);
  }
  gainRep(n = 1) {
    this.setReputation(this.reputation + n);
  }
  doSpawn(game) {
    game.areas.available.people.push(new People({ type: this.type, PW, PH }));
  }
}
