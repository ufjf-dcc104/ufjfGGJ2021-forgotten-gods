import EndScene from "./EndScene.mjs";
import StartScene from "./StartScene.mjs";
import GameScene from "./GameScene.mjs";
import AssetManager from "./AssetManager.mjs";

export default class Game {
  constructor(canvas) {
    this.assets = new AssetManager();
    this.assets.loadImage("bg", "./assets/gamejam.png");
    this.assets.loadImage("priest", "./assets/Priest.png");
    this.assets.loadImage("farmer", "./assets/Farmer.png");
    this.assets.loadImage("soldier", "./assets/soldier.png");
    this.assets.loadImage("senator", "./assets/politician.png");

    this.scenes = new Map();
    this.addScene("game", new GameScene(canvas));
    this.addScene("end", new EndScene(canvas));
    this.addScene("start", new StartScene(canvas));
    this.setScene("start");
  }
  addScene(key, scene) {
    scene.game = this;
    scene.assets = this.assets;
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
