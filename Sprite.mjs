const TYPE_COLOR = ["white", "red", "green", "blue"];

export default class Sprite {
  constructor(type = 0) {
    this.type = type;
    this.x = 0;
    this.y = 0;
    this.w = 32;
    this.h = 64;
    this.draggable = true;
    this.color = "white";
  }
  draw(ctx) {
    ctx.fillStyle = TYPE_COLOR[this.type];
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
  hasPoint(point) {
    return !(
      this.x + this.w / 2 < point.x ||
      this.x - this.w / 2 > point.x ||
      this.y + this.h / 2 < point.y ||
      this.y - this.h / 2 > point.y
    );
  }
  collidedWith(target) {
    return !(
      this.x + this.w / 2 < target.x - this.w / 2 ||
      this.x - this.w / 2 > target.x + this.w / 2 ||
      this.y + this.h / 2 < target.y - this.h / 2 ||
      this.y - this.h / 2 > target.y + this.h / 2
    );
  }
}
