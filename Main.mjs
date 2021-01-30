import EndScene from "./EndScene.mjs";
import Game from "./GameScene.mjs";


window.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 560;
    document.body.appendChild(canvas);
    const game = new EndScene(canvas);
    game.setup();
    game.start();
  };