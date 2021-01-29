import Sprite from "./Sprite.mjs";

export const ALL_SACRIFICES = [
  { type: 0, expire: 15 },
  { type: 1, expire: 10 },
  { type: 2, expire: 12 },
  { type: 3, expire: 15, effect: (game) => {
      game.available.add(new Sprite(0));
  } },
];

export const ALL_AVAILABLE = [
  { type: 0, qty: 4 },
  { type: 1, qty: 4 },
  { type: 2, qty: 4 },
  { type: 3, qty: 4 },
];
