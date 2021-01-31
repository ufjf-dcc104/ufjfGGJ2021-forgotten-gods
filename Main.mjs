import Game from "./Game.mjs";


window.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 560;
    document.body.appendChild(canvas);
    const game = new Game(canvas);
    game.setup();
    game.start();
  };