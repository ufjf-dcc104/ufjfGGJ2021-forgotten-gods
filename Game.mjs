import Sprite from "./Sprite.mjs";
import Ready from "./Ready.mjs";
import Sacrifices from "./Sacrifices.mjs";
import Activities from "./Activities.mjs";
import Activity from "./Activity.mjs";
import Area from "./Area.mjs";
import { ALL_SACRIFICES } from "./AllCards.mjs";
import { ALL_AVAILABLE } from "./AllCards.mjs";
import People from "./People.mjs";
import Button from "./Button.mjs";

export const bg = new Image();
bg.src = "./assets/gamejam.png";



export default class Game {
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

    this.areas.ready.add(new People(0));
    this.areas.ready.add(new People(1));
    this.areas.ready.add(new People(2));
    this.areas.ready.add(new People(3));
    this.areas.ready.add(new People(0));

    this.areas.cardCount.add(new People(0));
    this.areas.cardCount.add(new People(1));
    this.areas.cardCount.add(new People(2));
    this.areas.cardCount.add(new People(3));

    this.areas.activities.add(new Activity(0, 10));
    this.areas.activities.add(new Activity(1, 7));
    this.areas.activities.add(new Activity(2, 6));
    this.areas.activities.add(new Activity(3, 3));

  }

  step(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;
    this.ctx.fillStyle = "hsl(200, 7%, 84%)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "hsl(200, 7%, 74%)";
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(bg, 0, 0, this.canvas.width, this.canvas.height);

    this.areas.cardCount.draw(this.ctx);
    this.areas.activities.expire(this.dt, this);
    this.areas.activities.draw(this.ctx);
    this.areas.died.drawCount(this.ctx);
    this.areas.available.drawCount(this.ctx);
    this.areas.resting.drawCount(this.ctx);
    this.areas.ready.draw(this.ctx);
    this.newTurn.draw(this.ctx);

    this.expire -= Math.min(this.expire, 1 * this.dt);
    const min = padzero(Math.floor(this.expire / 60), 2);
    const seg = padzero(Math.floor(this.expire % 60), 2);
    this.ctx.font = "30px bold monospace";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`${min}:${seg}`, 130, 25);
    this.ctx.font = "20px bold monospace";
    this.ctx.fillText(`Grace ${this.grace}`, 10, 20);
    this.ctx.fillText(`Reputation ${this.reputation}`, 10, 40);
    requestAnimationFrame((t) => {
      this.step(t);
    });
    this.t0 = t;
  }

  createAreas() {
    this.areas.sacrifices = new Sacrifices(130, 100);
    this.areas.sacrifices.loadAll(ALL_SACRIFICES);

    this.areas.ready = new Ready("Ready", 62, this.canvas.height - 148);
    this.areas.cardCount = new Area(
      "Card Count",
      47,
      this.canvas.height - 53,
      true
    );
    this.areas.died = new Area("Died", 47, this.canvas.height - 53, false);
    this.areas.resting = new Area(
      "Resting",
      47,
      this.canvas.height - 53,
      false
    );
    this.areas.resting = new Area(
      "Resting",
      47,
      this.canvas.height - 53,
      false
    );
    this.areas.available = new Area(
      "Available",
      47,
      this.canvas.height - 53,
      true
    );
    this.areas.available.loadAll(ALL_AVAILABLE);

    this.areas.activities = new Activities(80, this.canvas.height - 300);
    this.newTurn = new Button( this.canvas.width / 2,
      this.canvas.height - 230,
       100,
       30,
       "End Turn"
    );
  }

  mousedown(e) {
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
    this.areas.ready.people.forEach((s) => {
      if (s.draggable && s.hasPoint({ x, y })) {
        this.dragging = s;
        this.dragging.oldx = this.dragging.x;
        this.dragging.oldy = this.dragging.y;
      }
    });
  }
  mouseup(e) {
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
    if (this.dragging !== null) {
      this.dragging.x = x;
      this.dragging.y = y;
      const s = this.areas.sacrifices.check(x, y);
      const a = this.areas.activities.check(x, y);
      if (s) {
        if (s.type === this.dragging.type) {
          this.grace++;
          s.effect(this);
        } else {
          this.grace--;
          this.reputation--;
        }
        this.areas.died.add(this.dragging);
        this.areas.ready.delete(this.dragging);
        this.areas.sacrifices.delete(s);
        this.dragging = null;
        return;
      }
      if (a) {
        if (a.deliver(this.dragging.type)) {
        } else {
          this.reputation--;
        }
        this.areas.resting.add(this.dragging);
        this.areas.ready.delete(this.dragging);
        if (a.demands.length === 0) {
          this.reputation++;
          this.areas.activities.delete(a);
        }
        this.dragging = null;
        return;
      }
      this.dragging.x = this.dragging?.oldx;
      this.dragging.y = this.dragging?.oldy;
      this.dragging = null;
    }
  }
  click(e) {
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
    if (this.newTurn.hasPoint({ x, y })) {
      this.areas.resting.addAll(this.areas.ready);

      if (this.areas.available.size() <= 5) {
        this.areas.ready.addAll(this.areas.available);
        this.areas.available.addAll(this.areas.resting);
      }
      while (this.areas.ready.size() < 5 && this.areas.available.size() > 0) {
        const r = Math.floor(Math.random() * this.areas.available.size());
        const p = this.areas.available.people[r];
        this.areas.ready.add(p);
        this.areas.available.delete(p);
      }
    }
  }
  mousemove(e) {
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
    if (this.dragging) {
      this.dragging.x = x;
      this.dragging.y = y;
    }
  }
  mouseout(e) {
    if (this.dragging) {
      this.dragging.x = this.dragging?.oldx;
      this.dragging.y = this.dragging?.oldy;
      this.dragging = null;
    }
  }

  touchstart(e) {
    e.preventDefault();
    const newTouch = e.changedTouches[0];
    mousedown(newTouch);
  }
  touchend(e) {
    e.preventDefault();
    const newTouch = e.changedTouches[0];
    mouseup(newTouch);
  }
  touchmove(e) {
    e.preventDefault();
    const newTouch = e.changedTouches[0];
    mousemove(newTouch);
  }
}
function padzero(num, places) {
  return String(num).padStart(places, "0");
}
