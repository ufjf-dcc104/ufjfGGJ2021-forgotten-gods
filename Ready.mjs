import Area from "./Area.mjs";

export default class Ready extends Area{
  
  add(people){
      super.add(people);
      people.draggable = true;
  }
}
