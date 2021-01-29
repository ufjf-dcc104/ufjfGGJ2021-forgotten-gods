import Sprite from "./Sprite.mjs";

export default class Area {
  constructor(title = "", x = 0, y = 300, visible = true) {
    this.x = x;
    this.y = y;
    this.people = [];
    this.title = title;
    this.max = 5;
    this.visible = visible;
  }

  loadAll(people) {
    people.forEach((p) => {
      for (let c = 0; c < p.qty; c++) {
        this.add(new Sprite(p.type));
      }
    });
  }

  add(people) {
    const n = this.people.length;
    const l = Math.floor(n / this.max);
    const c = n % this.max;
    people.x = this.x + (people.w + 8) * c + (l % 2 === 0 ? 0 : people.w / 2);
    people.y = this.y + (people.h / 3) * l;
    people.draggable = false;
    this.people.push(people);
  }

  draw(ctx) {
    if (!this.visible) return;
    ctx.fillStyle = "white";
    //ctx.font = "25px monospace";
    //ctx.fillText(this.title, this.x, this.y - 50);
    this.people.forEach((p) => {
      p.draw(ctx);
    });
  }

  transfer(sourceArea, quantity = 2) {
    let transferPeople = sourceArea.people.splice(0, quantity);
    transferPeople.forEach((person) => {
      this.add(person);
    });
  }

  addAll(sourceArea) {
    this.transfer(sourceArea, sourceArea.size());
  }

  delete(people) {
    const idx = this.people.indexOf(people);
    this.people.splice(idx, 1);
  }

  size() {
    return this.people.length;
  }
}
