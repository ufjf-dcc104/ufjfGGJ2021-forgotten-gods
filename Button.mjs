import Sprite from "./Sprite.mjs";

export default class Button extends Sprite {
  constructor(x, y, w, h, text) {
    super(null);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.fillStyle = "black";
    ctx.fillText(this.text, this.x -this.w / 3, this.y);
  }
}
