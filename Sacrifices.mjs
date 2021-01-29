import Sacrifice from "./Sacrifice.mjs";

export default class Sacrifices {
  constructor(x = 120, y = 20) {
    this.x = x;
    this.y = y;
    this.sacrifices = [];
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
      sacrifice.x = this.x + (sacrifice.w+8) * s;
      sacrifice.y = this.y;
      sacrifice.draw(ctx);
    }
  }

  expire(dt, game) {
    for (let s = 0; s < Math.min(this.sacrifices.length, 2); s++) {
      const sacrifice = this.sacrifices[s];
      sacrifice.expire -= 1 * dt;
      if (sacrifice.expire <= 0) {
        this.delete(sacrifice);
        game.grace--;
      }
    }
  }

  check(x, y) {
    return this.sacrifices.find((sac) => sac.hasPoint({ x, y }));
  }
}
