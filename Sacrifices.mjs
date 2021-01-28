export default class Sacrifices {
  constructor(x = 0, y = 120) {
    this.x = x;
    this.y = y;
    this.sacrifices = [];
  }

  add(sacrifice) {
    this.sacrifices.push(sacrifice);
    sacrifice.x = this.x + sacrifice.w * this.sacrifices.length;
    sacrifice.y = this.y;
    sacrifice.draggable = false;
  }
  delete(sacrifice){
    const idx = this.sacrifices.indexOf(sacrifice);
    this.sacrifices.splice(idx, 1);
  }

  draw(ctx) {
    this.sacrifices.forEach((p) => {
      p.draw(ctx);
    });
  }

  expire(dt) {
    this.sacrifices.forEach((p) => {
      p.expire -= Math.min(1 * dt, p.expire);
    });
  }

  check(x, y, people) {
    let found = null;
    this.sacrifices.forEach((s) => {
      if (s.hasPoint({ x, y })) {
        found = s;
      }
    });
    return found;
  }
}
