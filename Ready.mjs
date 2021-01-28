export default class Ready {
  constructor(x = 0, y = 300) {
    this.x = x;
    this.y = y;
    this.people = new Set();
  }

  add(people){
      this.people.add(people);
      people.x = this.x + people.w * this.people.size;
      people.y = this.y;
      people.draggable = true;
  }

  draw(ctx) {
    let k = 0;
    this.people.forEach((p) => {
      p.draw(ctx);
    });
  }
}
