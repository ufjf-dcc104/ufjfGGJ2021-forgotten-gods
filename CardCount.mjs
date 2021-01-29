import Area from "./Area.mjs";

export default class CardCount extends Area{
  
  add(people){
      super.add(people);
      people.draggable = true;
  }

}
