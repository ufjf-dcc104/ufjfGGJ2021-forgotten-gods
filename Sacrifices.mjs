import Activity from "./Activity.mjs";
import People from "./People.mjs";
import { shuffleArray } from "./util/shuffle.mjs";
import { PH, PW } from "./data/AllTimeConstants.mjs";
import Activities from "./Activities.mjs";
import { assets } from "./Game.mjs";
import { PRIEST } from "./data/AllTimeConstants.mjs";

export default class Sacrifices extends Activities {
  constructor(x = 300, y = 120, type = 0) {
    super(x, y, type);
    this.godMode = true;
  }

  draw(ctx) {
    const canvas = ctx.canvas;
    let type = PRIEST;
    const r = 624/796;
    const x = this.x-0.225*canvas.width;
    const y = this.y-0.09*canvas.height;
    const w = 0.33 * canvas.width;
    const h = w/r;
    ctx.globalAlpha = 0.6;
    ctx.drawImage(assets.img(`godb${this.activities[0].type}`), x, y, w, h);
    ctx.globalAlpha = 1;
    super.draw(ctx);
  }

  expire(dt, game) {
    this.spawn -= ((this.reputation + 1) / 60) * dt;
    const r = 0.115;
    const w = game.canvas.height * r * 0.75;
    const h = game.canvas.height * r;
    if (this.spawn <= 0) {
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
        if (this.godMode && this.reputation < 2) {
          game.assets.play("thunder", false, 0.3);
          const idx = Math.floor(
            Math.random() * game.areas.ready.people.length
          );
          const p = game.areas.ready.people.splice(idx, 1)[0];
          if (p) game.areas.resting.add(p);
        }
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
    const that = this;
    game.areas.available.people.push(new People({ type: that.type, PW, PH }));
  }
}
