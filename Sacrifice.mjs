import Sprite, { TYPE_COLOR } from "./Sprite.mjs";

export default class Sacrifice extends Sprite {
  constructor(type = 0, expire = 10) {
    super();
    this.type = type;
    this.w = 40;
    this.h = 80;
    this.expire = expire;
  }
  draw(ctx) {
    ctx.strokeStyle = TYPE_COLOR[this.type];
    ctx.lineWidth=3;
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
}
