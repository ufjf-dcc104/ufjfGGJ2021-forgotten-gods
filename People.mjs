import Sprite from "./Sprite.mjs";
import { TYPE_COLOR } from "./data/AllTimeConstants.mjs";
import { assets } from "./Game.mjs";

const PEOPLE_IMAGES = [
  { sx: 243, sy: 2279, sw: 276, sh: 364 },
  { sx: 524, sy: 2279, sw: 276, sh: 364 },
  { sx: 810, sy: 2279, sw: 276, sh: 364 },
  { sx: 1096, sy: 2279, sw: 276, sh: 364 },
];


export default class People extends Sprite {
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = TYPE_COLOR[this.type];
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.drawImage(
      assets.img(`people${this.type}`),
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  }
}
