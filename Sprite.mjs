export default class Sprite {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.draggable = true;
    this.color = "white";
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
  hasPoint(point) {
    return !(
      this.x + this.w / 2 < point.x  ||
      this.x - this.w / 2 > point.x  ||
      this.y + this.h / 2 < point.y  ||
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
