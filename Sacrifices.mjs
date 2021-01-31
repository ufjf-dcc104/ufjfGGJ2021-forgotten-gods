import Activity from "./Activity.mjs";
import People from "./People.mjs";
import { shuffleArray } from "./util/shuffle.mjs";
import { PH, PW } from "./data/AllTimeConstants.mjs";
import Activities from "./Activities.mjs";
import { assets } from "./Game.mjs";
import { PRIEST } from "./data/AllTimeConstants.mjs";

export default class Sacrifices extends Activities {
  constructor(x = 300, y = 120, type = PRIEST) {
    super(x, y, type);
    this.godMode = "A";
  }

  draw(ctx) {
    const canvas = ctx.canvas;
    let type = PRIEST;
    const r = 624 / 796;
    let x;
    let y;
    if (this.godMode === "A") {
      x = this.x - 0.186 * canvas.width;
      y = this.y - 0.091 * canvas.height;
    } else {
      x = this.x - 0.225 * canvas.width;
      y = this.y - 0.09 * canvas.height;
    }
    let w = 0.33 * canvas.width;
    const h = w / r;
    if (this.cooldown > 0) {
      ctx.globalAlpha = 0.0;
    } else {
      ctx.globalAlpha = 0.6;
    }
    ctx.drawImage(
      assets.img(`god${this.godMode}${this.activities[0].type}`),
      x,
      y,
      w,
      h
    );
    ctx.globalAlpha = 1;
    super.draw(ctx);
  }

  onActivityExpire(activity, game) {
    this.loseRep();
    activity.expire = activity.total;
    this.sendToBottom(activity);
    this.resetCooldown();
    if (this.godMode && this.reputation < 2) {
      game.assets.play("thunder", false, 0.3);
      const idx = Math.floor(Math.random() * game.areas.ready.people.length);
      const p = game.areas.ready.people.splice(idx, 1)[0];
      if (p) game.areas.resting.add(p);
    }
  }

  onSpawn(game) {}
}
