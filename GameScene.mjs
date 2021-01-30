import Ready from "./Ready.mjs";
import Sacrifices from "./Sacrifices.mjs";
import Activities from "./Activities.mjs";
import Area from "./Area.mjs";
import { ALL_SACRIFICES, ALL_AVAILABLE } from "./AllCards.mjs";
import People from "./People.mjs";
import Button from "./Button.mjs";
import { ALL_FARM_CARDS } from "./data/AllFarmCards.mjs";
import { ALL_GOD_A_CARDS } from "./data/AllGodACards.mjs";
import { FARMER, SOLDIER, SENATOR, PRIEST } from "./data/AllTimeConstants.mjs";
import { ALL_BARRACKS_CARDS } from "./data/AllBarracksCards.mjs";
import { ALL_SENATE_CARDS } from "./data/AllSenateCards.mjs";
import { ALL_TEMPLE_CARDS } from "./data/AllTempleCards.mjs";
import { bg } from "./AssetManager.mjs";
import { GAME_TIME } from "./data/AllTimeConstants.mjs";

export default class GameScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.grace = 5;
    this.reputation = 5;
    this.dragging = null;
    this.t0 = null;
    this.dt = null;
    this.areas = {};
    const touches = [];
    this.createAreas();
    this.animID = null;
  }
  start() {
    
    this.animID = requestAnimationFrame((t) => {
      this.step(t);
    });
  }

  setup() {
    this.expire = GAME_TIME;
    this.grace = 5;
    this.reputation = 5;
    this.dragging = null;
    this.t0 = null;
    this.dt = null;;
    this.areas = {};
    const touches = [];
    this.createAreas();
    this.animID = null;

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


    this.areas.ready.add(new People(PRIEST));
    this.areas.ready.add(new People(SOLDIER));
    this.areas.ready.add(new People(SENATOR));
    this.areas.ready.add(new People(FARMER));
    this.areas.ready.add(new People(PRIEST));

    this.areas.cardCount.add(new People(PRIEST));
    this.areas.cardCount.add(new People(SOLDIER));
    this.areas.cardCount.add(new People(SENATOR));
    this.areas.cardCount.add(new People(FARMER));

    this.areas.gods[0].loadAll(ALL_GOD_A_CARDS);
    this.areas.buildings[SOLDIER].loadAll(ALL_BARRACKS_CARDS);
    this.areas.buildings[FARMER].loadAll(ALL_FARM_CARDS);
    this.areas.buildings[SENATOR].loadAll(ALL_SENATE_CARDS);
    this.areas.buildings[PRIEST].loadAll(ALL_TEMPLE_CARDS);
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
    this.areas.gods.forEach((god) => {
      god.draw(this.ctx);
      god.expire(this.dt, this);
    });
    this.areas.buildings.forEach((building) => {
      building.draw(this.ctx);
      building.expire(this.dt, this);
    });
    
    this.areas.died.drawCount(this.ctx);
    this.areas.available.drawCount(this.ctx);
    this.areas.resting.drawCount(this.ctx);
    this.areas.ready.draw(this.ctx);
    this.newTurn.draw(this.ctx);
    this.showResting.draw(this.ctx);
    this.showAvailable.draw(this.ctx);
    
    this.expire -= Math.min(this.expire, 1 * this.dt);
    const min = padzero(Math.floor(this.expire / 60), 2);
    const seg = padzero(Math.floor(this.expire % 60), 2);
    this.ctx.font = "30px bold monospace";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`${min}:${seg}`, 130, 25);
    this.ctx.font = "20px bold monospace";
    this.ctx.fillText(`Grace ${this.grace}`, 10, 20);
    this.ctx.fillText(`Reputation ${this.reputation}`, 10, 40);
    if (this.expire <= 0) {
      //cancelAnimationFrame(this.animID);
      this.game.setScene("end");
      return;
    }
    this.animID = requestAnimationFrame((t) => {
      this.step(t);
    });
    this.t0 = t;
  }

  createAreas() {
    this.areas.sacrifices = new Sacrifices(42, 80);
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

    this.areas.gods = [];
    this.areas.gods.push(new Activities(42, 80, 0));
    // this.areas.gods.push(new Activities(75, 200, 2));

    this.areas.buildings = [];
    this.areas.buildings.push(new Activities(150, 100, 0));
    this.areas.buildings.push(new Activities(75, 200, 2));
    this.areas.buildings.push(new Activities(250, 200, 1));
    this.areas.buildings.push(new Activities(170, 300, 3));
    this.newTurn = new Button(
      this.canvas.width - 30,
      this.canvas.height - 100,
      50,
      30,
      "End Turn"
    );
    this.showAvailable = new Button(
      this.canvas.width - 58,
      this.canvas.height - 38,
      70,
      30,
      "Available"
    );
    this.showResting = new Button(
      this.canvas.width - 58,
      this.canvas.height - 68,
      70,
      30,
      "Resting"
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
      this.areas.gods.forEach((god) => {
        const checked = god.check(x, y);
        if (checked) {
          if (!checked.deliver(this.dragging.type)) {
            god.reputation--;
          }
          this.areas.died.add(this.dragging);
          this.areas.ready.delete(this.dragging);
          if (checked.demands.length === 0) {
            god.reputation++;
            checked.effect(this);
            checked.resetDemands();
            god.sendToBottom(checked);
          }
          this.dragging = null;
          return;
        }
      });
      this.areas.buildings.forEach((building) => {
        const checked = building.check(x, y);
        if (checked) {
          if (!checked.deliver(this.dragging.type)) {
            this.reputation--;
            building.reputation--;
          }
          this.areas.resting.add(this.dragging);
          this.areas.ready.delete(this.dragging);
          if (checked.demands.length === 0) {
            this.reputation++;
            building.reputation++;
            checked.resetDemands();
            building.sendToBottom(checked);
          }
          this.dragging = null;
          return;
        }
      });
      if (this.dragging != null) {
        this.dragging.x = this.dragging?.oldx;
        this.dragging.y = this.dragging?.oldy;
      }
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
    if (this.showAvailable.hasPoint({ x, y })) {
      this.areas.available.visible = true;
      this.areas.resting.visible = false;
    }
    if (this.showResting.hasPoint({ x, y })) {
      this.areas.resting.visible = true;
      this.areas.available.visible = false;
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
function padzero(num, places) {
  return String(num).padStart(places, "0");
}
