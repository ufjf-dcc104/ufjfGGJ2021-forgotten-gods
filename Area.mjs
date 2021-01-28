export default class Area {
  constructor(x = 0, y = 300) {
    this.x = x;
    this.y = y;
    this.people = [];
  }

  add(people){
      this.people.push(people);
      people.x = this.x + people.w * this.people.length;
      people.y = this.y;
      people.draggable = false;
  }

  draw(ctx) {
    this.people.forEach((p) => {
      p.draw(ctx);
    });
  }

  delete(people) {
    const idx = this.people.indexOf(people);
    this.people.splice(idx, 1);
  }
}
