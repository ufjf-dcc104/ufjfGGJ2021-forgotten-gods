import Game from "./Game.mjs";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ASPECT = 1.80149015434;
const cw = document.body.clientWidth;
const ch = document.body.clientHeight;
if (ch > cw) {
  canvas.height = ch;
  canvas.width = ch / ASPECT;
  if (canvas.width > cw) {
    canvas.width = cw;
    canvas.height = cw * ASPECT;
  }
} else {
  canvas.width = cw;
  canvas.height = cw * ASPECT;
  if (canvas.height > ch) {
    canvas.height = ch;
    canvas.width = ch / ASPECT;
  }
}

const game = new Game(canvas);
game.setup();
game.start();
