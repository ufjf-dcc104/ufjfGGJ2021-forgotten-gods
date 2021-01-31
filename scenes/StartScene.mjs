import Button from "../Button.mjs";
import getXY from "../util/getXY.mjs";

export default class StartScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.expire = 180;
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

    this.newGame.draw(this.ctx);
    this.credits.draw(this.ctx);
    this.rules.draw(this.ctx);
    this.ctx.fillStyle = "black";

    let fontSize = 0.08928571428571429 * this.canvas.height;
    this.ctx.font = `${fontSize}px 'Skranji'`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `Tela inicial`,
      this.canvas.width / 2,
      0.4 * this.canvas.height
    );

    fontSize = 0.03571428571428571 * this.canvas.height;
    this.ctx.font = `${fontSize}px 'Skranji'`;
    this.ctx.fillText(
      `Carregando... ${this.assets.progresso()}%`,
      0.5 * this.canvas.width,
      0.56 * this.canvas.height
    );

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
    this.rules = new Button(
      0.5 * this.canvas.width,
      0.8 * this.canvas.height,
      0.3 * this.canvas.width,
      0.07 * this.canvas.height,
      "How to Play"
    );
    this.credits = new Button(
      0.5 * this.canvas.width,
      0.9 * this.canvas.height,
      0.3 * this.canvas.width,
      0.07 * this.canvas.height,
      "Credits"
    );
  }

  mousedown(e) {
    const [x,y] = getXY(e, this.canvas);
    if (this.newGame.hasPoint({ x, y })) {
      this.game.setScene("game");
    }
    if (this.credits.hasPoint({ x, y })) {
      this.game.setScene("credits");
    }
    if (this.rules.hasPoint({ x, y })) {
      this.game.setScene("rules");
    }
  }
  mouseup(e) {}
  click(e) {
    this.mousedown(e);
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
