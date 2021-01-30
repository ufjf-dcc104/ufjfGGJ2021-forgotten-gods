import Sacrifice from "./Sacrifice.mjs";
import { shuffleArray } from "./util/shuffle.mjs";

export default class Sacrifices {
  constructor(x = 120, y = 20) {
    this.x = x;
    this.y = y;
    this.sacrifices = [];
    this.cooldownMax = 10;
    this.cooldown = this.cooldownMax;
  }

  loadAll(sacrifices) {
    sacrifices.forEach((s) => {
      this.add(new Sacrifice(s.type, s.expire, s.effect));
    });
  }

  add(sacrifice) {
    this.sacrifices.push(sacrifice);
    sacrifice.draggable = false;
  }
  delete(sacrifice) {
    const idx = this.sacrifices.indexOf(sacrifice);
    this.sacrifices.splice(idx, 1);
  }

  draw(ctx) {
    for (let s = 0; s < Math.min(this.sacrifices.length, 2); s++) {
      const sacrifice = this.sacrifices[s];
      sacrifice.x = this.x + (sacrifice.w + 8) * s * 3;
      sacrifice.y = this.y - (this.y * s) / 5;
      sacrifice.draw(ctx);
    }
  }

  expire(dt, game) {
    if (this.cooldown > 0) {
      this.cooldown -= 1 * dt;
      return;
    }
    for (let s = 0; s < Math.min(this.sacrifices.length, 2); s++) {
      const sacrifice = this.sacrifices[s];
      sacrifice.expire -= 1 * dt;
      if (sacrifice.expire <= 0) {
        this.sendToBottom(sacrifice);
        game.grace--;
        this.cooldown = this.cooldownMax * Math.random();
      }
    }
  }

  check(x, y) {
    return this.sacrifices.find((sac) => sac.hasPoint({ x, y }));
  }

  sendToBottom(sacrifice){
    const idx = this.sacrifices.indexOf(sacrifice);
    const sac = this.sacrifices.splice(idx, 1)[0];
    sac.expire = sac.total;
    this.sacrifices.push(sac);
    this.cooldown = this.cooldownMax*Math.random();
  }

  shuffle() {
    shuffleArray(this.activities);
  }
}
