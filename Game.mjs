import EndScene from "./EndScene.mjs";
import StartScene from "./StartScene.mjs";
import GameScene from "./GameScene.mjs";
import AssetManager from "./AssetManager.mjs";
import { FARMER, SOLDIER, SENATOR, PRIEST } from "./data/AllTimeConstants.mjs";

export const assets = new AssetManager();
assets.loadImage("bg", "./assets/gamejam.png");
assets.loadImage(`people${PRIEST}`, "./assets/Priest.png");
assets.loadImage(`people${FARMER}`, "./assets/Farmer.png");
assets.loadImage(`people${SOLDIER}`, "./assets/soldier.png");
assets.loadImage(`people${SENATOR}`, "./assets/politician.png");


export default class Game {
  constructor(canvas) {
    this.assets = assets;
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
