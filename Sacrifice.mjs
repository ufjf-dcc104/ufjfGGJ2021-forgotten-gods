import { TYPE_COLOR } from "./data/AllTimeConstants.mjs";
import Sprite from "./Sprite.mjs";

export default class Sacrifice extends Sprite {
  constructor(type = 0, expire = 10, effect= (game)=>{} ) {
    super();
    this.type = type;
    this.w = 60;
    this.h = 100;
    this.expire = expire;
    this.total = expire;
    this.effect = effect;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = TYPE_COLOR[this.type];
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.fillStyle = "white";
    ctx.fillStyle = `hsl(${120*this.expire/this.total}deg, 100%, 30%)`;
    ctx.fillRect(this.x - this.w / 2, this.y + this.h / 2+5, this.w*this.expire/this.total, 10);
    ctx.font = "10px monospace";
    ctx.fillText(this.expire.toFixed(2), this.x - this.w / 2, this.y + this.h / 2+25);
    ctx.closePath();
  }
}
