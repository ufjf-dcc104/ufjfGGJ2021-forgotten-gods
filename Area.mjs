export default class Area {
  constructor(title = "", x = 0, y = 300) {
    this.x = x;
    this.y = y;
    this.people = [];
    this.title = title;
  }

  add(people){
      this.people.push(people);
      people.x = this.x + people.w * this.people.length;
      people.y = this.y;
      people.draggable = false;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "25px monospace";
    ctx.fillText(this.title, this.x, this.y -50)
    this.people.forEach((p) => {
      p.draw(ctx);
    });
  }

  transfer(otherArea, quantity = 2){
    let transferPeople = this.people.splice(0, quantity);
    transferPeople.forEach(person => {
      otherArea.add(person);
    })
  }

  delete(people) {
    const idx = this.people.indexOf(people);
    this.people.splice(idx, 1);
  }
}
