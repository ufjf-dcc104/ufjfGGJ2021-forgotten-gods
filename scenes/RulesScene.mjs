import Button from "../Button.mjs";

export default class RulesScene {
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
  stop(){
    
  }

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
    this.mainMenu.draw(this.ctx);

    this.ctx.drawImage(
      this.assets.img("menuBg"),
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.mainMenu.draw(this.ctx);
    this.ctx.fillStyle = "black";
    let fontSize = 0.055 * this.canvas.height;
    this.ctx.font = `${fontSize}px 'Skranji'`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(`How to Play`, this.canvas.width/2, 0.35*this.canvas.height);

    fontSize = 0.01951428571428571 * this.canvas.height;
    this.ctx.font = `${fontSize}px 'Skranji'`;
    this.ctx.fillText(`It is necessary to drag the cards around the scenario to`, 0.5*this.canvas.width, 0.40*this.canvas.height);
    this.ctx.fillText(`the proposed locations. Send the right card to the      `, 0.5*this.canvas.width, 0.43*this.canvas.height);
    this.ctx.fillText(`requested place within the time limit. get 1 point if   `, 0.5*this.canvas.width, 0.46*this.canvas.height);
    this.ctx.fillText(`you get it right, and lose 1 point if you don't         `, 0.5*this.canvas.width, 0.49*this.canvas.height);
    this.ctx.fillText(`(or get it wrong).Different scores when serving the gods`, 0.5*this.canvas.width, 0.52*this.canvas.height);
    this.ctx.fillText(`(Grace Points), or your tribe (Reputation Points).In the`, 0.5*this.canvas.width, 0.55*this.canvas.height);
    this.ctx.fillText(`the proposed locations. Send the right card to the      `, 0.5*this.canvas.width, 0.58*this.canvas.height);
    this.ctx.fillText(`end it is added and to win you need to have a positive  `, 0.5*this.canvas.width, 0.61*this.canvas.height);
    this.ctx.fillText(`score. When the marker for each tribe location is low,  `, 0.5*this.canvas.width, 0.64*this.canvas.height);
    this.ctx.fillText(`it will generate less respwan of the cards. Store the   `, 0.5*this.canvas.width, 0.67*this.canvas.height);
    this.ctx.fillText(`card in these places, it will remain in the reserve     `, 0.5*this.canvas.width, 0.70*this.canvas.height);
    this.ctx.fillText(`until the next round is drawn. Any card that is brought `, 0.5*this.canvas.width, 0.73*this.canvas.height);
    this.ctx.fillText(`to the Gods, it will be destroyed.                      `, 0.5*this.canvas.width, 0.76*this.canvas.height);   
      
        
    requestAnimationFrame((t) => {
      this.step(t);
    });
    this.t0 = t;
  }

  createAreas() {
    this.mainMenu = new Button(
      0.5 * this.canvas.width,
      0.85 * this.canvas.height,
      0.25 * this.canvas.width,
      0.05357142857142857 * this.canvas.height,
      "Main Menu"
    );
  }

  mousedown(e) {
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
    if (this.mainMenu.hasPoint({ x, y })) {
      this.game.setScene("start");
    }
  }
  mouseup(e) {}
  click(e) {
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
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
