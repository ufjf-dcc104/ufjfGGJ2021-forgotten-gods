import EndScene from "./EndScene.mjs";
import GameScene from "./GameScene.mjs";

export default class Game {
  constructor(canvas) {
    this.scenes = new Map();
    this.addScene("game", new GameScene(canvas));
    this.addScene("end", new EndScene(canvas));
    this.setScene("game");
  }
  addScene(key, scene) {
    scene.game = this;
    this.scenes.set(key, scene);
  }
  setScene(scene) {
    if (this.scenes.has(scene)) {
        console.log(scene);
      this.scene = this.scenes.get(scene);
      this.setup();
      this.start();
    }
  }
  setup() {
    this.scene.setup();
  }
  start() {
    this.scene.start();
  }
}
