import Button from "../Button.mjs";
import getXY from "../util/getXY.mjs";

export default class EndScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.expire = 2;
    this.grace = 5;
    this.reputation = 5;
    this.dragging = null;
    this.t0;
    this.dt;
    this.areas = {};
    const touches = [];
    this.createAreas();
  }
  start() {
    requestAnimationFrame((t) => {
      this.step(t);
    });
  }
  stop() {}
  setup() {
    this.expire = 2;
    this.canvas.onmousedown = (e) => {
      this.mousedown(e);
    };
    this.canvas.onmouseup = (e) => {
      this.mouseup(e);
    };
    this.canvas.onclick = (e) => {
      this.click(e);
    };
    this.canvas.onmousemove = (e) => {
      this.mousemove(e);
    };
    this.canvas.onmouseout = (e) => {
      this.mouseout(e);
    };
    this.canvas.ontouchstart = (e) => {
      this.touchstart(e);
    };
    this.canvas.ontouchend = (e) => {
      this.touchend(e);
    };
    this.canvas.ontouchmove = (e) => {
      this.touchmove(e);
    };
  }

  step(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;
    this.expire += (this.expire > 0) ? -1 * this.dt : 0;
    this.ctx.fillStyle = "hsl(200, 7%, 84%)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "hsl(200, 7%, 74%)";
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.assets.img("menuBg"),
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    
    if (this.expire <= 0) {
      this.mainMenu.draw(this.ctx);
      this.newGame.draw(this.ctx);
    };
    this.ctx.fillStyle = "black";
    let fontSize = 0.07142857142857142 * this.canvas.height;
    this.ctx.font = `${fontSize}px 'Skranji'`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `GAME OVER!`,
      this.canvas.width / 2,
      this.canvas.height * 0.4
    );
    fontSize = 0.026785714285714284 * this.canvas.height;
    this.ctx.font = `${fontSize}px 'Skranji'`;
    this.ctx.textAlign = "right";

    for (let i = this.game.messages.length - 1; i >= 0; i--) {
      const message = this.game.messages[i];
      if (message.indexOf("-") >= 0) {
        this.ctx.fillStyle = "red";
      } else {
        this.ctx.fillStyle = "hsl(0,0%,20%)";
      }
      this.ctx.fillText(
        message,
        0.85 * this.canvas.width,
        (0.46 + i * 0.04) * this.canvas.height
      );
    }
    requestAnimationFrame((t) => {
      this.step(t);
    });
    this.t0 = t;
  }

  createAreas() {
    this.newGame = new Button(
      0.5 * this.canvas.width,
      0.7 * this.canvas.height,
      0.3 * this.canvas.width,
      0.07 * this.canvas.height,
      "New Game"
    );
    this.mainMenu = new Button(
      0.5 * this.canvas.width,
      0.8 * this.canvas.height,
      0.3 * this.canvas.width,
      0.07 * this.canvas.height,
      "Main Menu"
    );
  }

  mousedown(e) {
    if (this.expire > 0) return;
    const [x, y] = getXY(e, this.canvas);

    if (this.newGame.hasPoint({ x, y })) {
      this.game.setScene("game");
    }
    if (this.mainMenu.hasPoint({ x, y })) {
      this.game.setScene("start");
    }
  }
  mouseup(e) {}
  click(e) {
    const [x, y] = getXY(e, this.canvas);

    if (this.newGame.hasPoint({ x, y })) {
    }
  }
  mousemove(e) {}
  mouseout(e) {}

  touchstart(e) {
    const newTouch = e.changedTouches[0];
    this.mousedown(newTouch);
  }
  touchend(e) {
    const newTouch = e.changedTouches[0];
    this.mouseup(newTouch);
  }
  touchmove(e) {
    e.preventDefault();
    const newTouch = e.changedTouches[0];
    this.mousemove(newTouch);
  }
}
