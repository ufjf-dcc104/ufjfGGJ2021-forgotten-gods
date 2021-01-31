import Game from "./Game.mjs";


    const canvas = document.createElement("canvas");
    canvas.width = 320*3;
    canvas.height = 560*3;
    document.body.appendChild(canvas);
    const game = new Game(canvas);
    game.setup();
    game.start();