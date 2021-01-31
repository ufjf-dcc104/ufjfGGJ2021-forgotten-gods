import Button from "./Button.mjs";
import { assets } from "./Game.mjs";

export default class NextTurnButton extends Button {
  constructor(x, y, w, h, text, useImage = true) {
    super(x, y, w, h, text, useImage);
  }
  draw(ctx) {
    ctx.beginPath();
    if (this.useImage) {
      ctx.drawImage(
        assets.img("hourglass"),
        this.x - this.w * 0.5,
        this.y - this.h * 0.5,
        this.w * 1,
        this.h * 1
      );
    } else {
      ctx.fillStyle = "hsl(42 100% 50% / 1)";
      ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
      ctx.strokeStyle = "hsl(28deg 100% 40%)";
    }
  }
}
