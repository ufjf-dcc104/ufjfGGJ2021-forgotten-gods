import { TYPE_COLOR } from "./data/AllTimeConstants.mjs";
import { FAST } from "./data/AllTimeConstants.mjs";
import { assets } from "./Game.mjs";
import Sprite from "./Sprite.mjs";

export default class Activity extends Sprite {
  constructor({
    demands = [0],
    type = 0,
    expire = FAST,
    effect = () => {},
    w = 100,
    h = 100,
  }) {
    super({});
    this.type = type;
    this.w = w;
    this.h = h;
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
    const r = 0.07;
    const w = r * 0.75 * ctx.canvas.width;
    const h = r * ctx.canvas.width;
    const g = h / 8;
    this.demands.forEach((d, k) => {
      //const c = k % 1;
      //const l = Math.floor(k / 1);
      const x = this.x + (w + g) * k - w * 1.7;
      const y = this.y + (h + g);

      ctx.drawImage(assets.img(`people${d}`), x, y, w, h);
    });
    const x = this.x - w * 2.5;
    const y = this.y + h * 1.65;

    let ang = (1 - this.expire / this.total) * 2 * Math.PI + (3 / 2) * Math.PI;
    ctx.fillStyle = `hsl(${(120 * this.expire) / this.total}deg, 100%, 30%)`;
    ctx.strokeStyle = `hsl(${(120 * this.expire) / this.total}deg, 100%, 20%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, h / 2, (Math.PI * 3) / 2, ang, true);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.lineCap = "round";
    ctx.lineWidth = w / 10;
    ctx.stroke();
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
