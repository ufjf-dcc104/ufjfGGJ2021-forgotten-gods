import Activity from "./Activity.mjs";
import People from "./People.mjs";
import { shuffleArray } from "./util/shuffle.mjs";
import { PH, PW } from "./data/AllTimeConstants.mjs";

export const REPUTATION = 4;
export const SPAWN = 60.0;
export const COOLDOWN = 3;

export default class Activities {
  constructor(x = 300, y = 120, type = 0) {
    this.x = x;
    this.y = y;
    this.activities = [];
    this.reputation = Math.floor(Math.random() * REPUTATION + 1);
    this.spawn = SPAWN;
    this.type = type;
    this.cooldown = COOLDOWN;
    this.resetCooldown();
    this.RUNNING_ACTIVITIES = 1;
  }

  loadAll(activities, canvas) {
    activities.forEach((s) => {
      for (let c = 0; c < s.qty; c++) {
        this.add(new Activity({ ...s, PW, PH }));
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

  drawnSpawnBar(ctx) {
    const canvas = ctx.canvas;
    const x = this.x - 0.17 * canvas.width;
    const y = this.y + 0.095 * canvas.height;
    const w = 0.25 * canvas.width;
    const h = 0.01 * canvas.height;
    const sr = (SPAWN - this.spawn) / SPAWN;
    // background
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, w, h);
    //filling bar
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, w * sr, h);
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
  draw(ctx) {
    this.drawnSpawnBar(ctx);
    if (this.cooldown <= 0) {
      for (
        let s = 0;
        s < Math.min(this.activities.length, this.RUNNING_ACTIVITIES);
        s++
      ) {
        const activity = this.activities[s];
        activity.x = this.x + (activity.w + 8) * s;
        activity.y = this.y;
        activity.draw(ctx);
      }
    }
  }

  expireSpawn(dt, game) {
    //R V Spawn
    //0 1 120
    //1 2 60s
    //2 3 40s
    //3 4 30s
    //4 5 24s
    this.spawn -= (this.reputation + 1) * dt;
    if (this.spawn <= 0) {
      this.onSpawn(game);
      this.spawn = SPAWN;
    }
  }

  resetCooldown() {
    this.cooldown = COOLDOWN;
    //this.cooldown = COOLDOWN - (COOLDOWN / 3) * Math.random();
  }

  expireCooldown(dt, game) {
    this.cooldown -= 1 * dt;
  }

  expireActivity(dt, game) {
    for (let s = 0; s < Math.min(this.activities.length, 1); s++) {
      const activity = this.activities[s];
      activity.expire -= 1 * dt;
      if (activity.expire <= 0) {
        this.onActivityExpire(activity, game);
      }
    }
  }

  onActivityExpire(activity, game) {
    this.loseRep();
    activity.expire = activity.total;
    this.sendToBottom(activity);
    this.resetCooldown();
  }

  expire(dt, game) {
    this.expireSpawn(dt, game);
    if (this.cooldown > 0) {
      this.expireCooldown(dt, game);
    } else {
      this.expireActivity(dt, game);
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
  onSpawn(game) {
    const that = this;
    game.areas.available.people.push(new People({ type: that.type}));
  }
}
