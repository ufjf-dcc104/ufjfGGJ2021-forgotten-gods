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
assets.loadImage(`godA${SOLDIER}`, "./assets/DeusH_Azul.png");
assets.loadImage(`godA${PRIEST}`, "./assets/DeusH_Branco.png");
assets.loadImage(`godA${FARMER}`, "./assets/DeusH_Verde.png");
assets.loadImage(`godA${SENATOR}`, "./assets/DeusH_Vermelho.png");
assets.loadImage(`godB${SOLDIER}`, "./assets/DeusF_Azul.png");
assets.loadImage(`godB${PRIEST}`, "./assets/DeusF_Branco.png");
assets.loadImage(`godB${FARMER}`, "./assets/DeusF_Verde.png");
assets.loadImage(`godB${SENATOR}`, "./assets/DeusF_Vermelho.png");
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
