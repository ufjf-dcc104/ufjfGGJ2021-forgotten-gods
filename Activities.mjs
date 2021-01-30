import Activity from "./Activity.mjs";
import People from "./People.mjs";

export default class Activities {
  constructor(x = 300, y = 120, type=0) {
    this.x = x;
    this.y = y;
    this.activities = [];
    this.max = 1;
    this.reputation = 4;
    this.spawn = 1;
    this.type = type;
  }

  loadAll(activities) {
    activities.forEach((s) => {
      for (let c = 0; c < s.qty; c++) {        
        this.add(new Activity(s.demands, s.type, s.expire, s.effect));
      }
    });
  }

  add(activity) {
    this.activities.push(activity);
    activity.draggable = false;
  }
  delete(activity) {
    const idx = this.activities.indexOf(activity);
    this.activities.splice(idx, 1);
  }

  draw(ctx) {
    for (let s = 0; s < Math.min(this.activities.length, this.max); s++) {
      const activity = this.activities[s];
      activity.x = this.x + (activity.w + 8) * s;
      activity.y = this.y;
      activity.draw(ctx);
      const y = this.y + 70;
      const x = this.x - 30;
      ctx.fillStyle = "white";
      ctx.fillRect(x, y - 2, 60, 9);
      ctx.fillStyle = "black";
      ctx.fillStyle = "yellow";
      ctx.fillRect(x, y, (60 * (1 - this.spawn)), 5);
      ctx.strokeStyle = "black";
      ctx.strokeRect(x, y - 2, 60, 9);
      ctx.fillStyle = `hsl(${(240 * this.reputation) / 4}, 100%, 50%)`;
      ctx.beginPath();
      ctx.ellipse(
        x + (this.reputation * 60) / 4,
        y + 3,
        3,
        3,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
    }
  }

  expire(dt, game) {
    this.spawn -= (this.reputation + 1)/60 * dt;
    if (this.spawn <= 0) {
      game.areas.available.people.push(new People(this.type));
      this.spawn = 1;
    }
    for (let s = 0; s < Math.min(this.activities.length, 1); s++) {
      const activity = this.activities[s];
      activity.expire -= 1 * dt;
      if (activity.expire <= 0) {
        this.reputation = this.reputation > 0 ? this.reputation - 1 : 0;
        activity.expire = activity.total;
        this.sendToBottom(activity);
      }
    }
  }

  check(x, y) {
    return this.activities.find((sac) => sac.hasPoint({ x, y }));
  }
  sendToBottom(activity){
    const idx = this.activities.indexOf(activity);
    const act = this.activities.splice(idx, 1)[0];
    this.activities.push(act);
  }
}
