import Sprite, { TYPE_COLOR } from "./Sprite.mjs";

export default class Activity extends Sprite {
  constructor(demands = [0], type = 0, expire = 20, effect = () => {}) {
    super();
    this.type = type;
    this.w = 60;
    this.h = 100;
    this.expire = expire;
    this.total = expire;
    this.demandsTotal = [...demands];
    this.demands = [...this.demandsTotal];
    this.effect = effect;
  }
  draw(ctx) {
    ctx.strokeStyle = TYPE_COLOR[this.type];
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.lineWidth = 1;
    this.demands.forEach((d, k) => {
      const c = k % 2;
      const l = Math.floor(k / 2);
      ctx.fillStyle = TYPE_COLOR[d];
      ctx.beginPath();
      ctx.ellipse(
        this.x + 12 * c,
        this.y + 12 * l,
        5,
        5,
        0,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();
      ctx.closePath();
    });

    ctx.fillStyle = `hsl(${(120 * this.expire) / this.total}deg, 100%, 30%)`;
    ctx.fillRect(
      this.x - this.w / 2,
      this.y + this.h / 2 + 5,
      (this.w * this.expire) / this.total,
      10
    );
    ctx.font = "10px monospace";
    ctx.fillText(
      this.expire.toFixed(2),
      this.x - this.w / 2,
      this.y + this.h / 2 + 25
    );
  }
  deliver(type) {
    const idx = this.demands.indexOf(type);
    if (idx < 0) return false;
    this.demands.splice(idx, 1);
    return true;
  }
  resetDemands() {
    this.demands = [...this.demandsTotal];
  }
}
