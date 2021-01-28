export default class Sprite {
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw(ctx){
        ctx.fillStyle = "white";
        ctx.fillRect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
    }
}