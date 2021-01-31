import EndScene from "./scenes/EndScene.mjs";
import StartScene from "./scenes/StartScene.mjs";
import GameScene from "./scenes/GameScene.mjs";
import CreditsScene from "./scenes/CreditsScene.mjs";
import RulesScene from "./scenes/RulesScene.mjs";
import AssetManager from "./AssetManager.mjs";
import { FARMER, SOLDIER, SENATOR, PRIEST } from "./data/AllTimeConstants.mjs";

export const assets = new AssetManager();
assets.loadImage("bg", "./assets/gamejam.png");
assets.loadImage(`people${PRIEST}`, "./assets/Priest.png");
assets.loadImage(`people${FARMER}`, "./assets/Farmer.png");
assets.loadImage(`people${SOLDIER}`, "./assets/soldier.png");
assets.loadImage(`people${SENATOR}`, "./assets/politician.png");
assets.loadImage(`godb${SOLDIER}`, "./assets/DeusF_Azul.png");
assets.loadImage(`godb${PRIEST}`, "./assets/DeusF_Branco.png");
assets.loadImage(`godb${FARMER}`, "./assets/DeusF_Verde.png");
assets.loadImage(`godb${SENATOR}`, "./assets/DeusF_Vermelho.png");
assets.loadAudio(`theme`, "./assets/theme.mp3");
assets.loadAudio(`lost`, "./assets/lost.mp3");
assets.loadAudio(`win`, "./assets/win.mp3");
assets.loadAudio(`gore`, "./assets/gore.mp3");
assets.loadAudio(`thunder`, "./assets/thunder.mp3");


export default class Game {
  constructor(canvas) {
    this.assets = assets;
    this.scenes = new Map();
    this.messages = [];
    this.addScene("game", new GameScene(canvas));
    this.addScene("end", new EndScene(canvas));
    this.addScene("start", new StartScene(canvas));
    this.addScene("credits", new CreditsScene(canvas));
    this.addScene("rules", new RulesScene(canvas));
    this.setScene("start");
  }
  addScene(key, scene) {
    scene.game = this;
    scene.assets = this.assets;
    this.scenes.set(key, scene);
  }
  setScene(scene) {
    if (this.scenes.has(scene)) {
      this.scene?.stop();
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
