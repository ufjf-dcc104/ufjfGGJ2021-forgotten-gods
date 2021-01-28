export default class Sacrifices {
  constructor(x = 80, y = 120) {
    this.x = x;
    this.y = y;
    this.sacrifices = [];
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
      sacrifice.x = this.x + sacrifice.w * s;
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
