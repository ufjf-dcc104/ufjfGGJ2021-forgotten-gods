import People from "./People.mjs";

export const ALL_SACRIFICES = [
  { 
    type: 0,
    expire: 15,
    effect: (game) => {

    }
  },
  { 
    type: 1,
    expire: 10,
    effect: (game) => {
    game.areas.available.add(new People(2))
    game.areas.available.add(new People(3))
    game.areas.available.add(new People(0))
    }
  },
  { 
    type: 2,
    expire: 12,
    effect: (game) => {

    }
  },
  {
    type: 3,
    expire: 15,
    effect: (game) => {

    },
  },
];

export const ALL_ACTIVITIES = [
  { demands: [0, 0, 0, 3], type: 0, qty: 4 },
  { demands: [3, 1, 1], type: 1, qty: 4 },
  { demands: [0, 0], type: 2, qty: 4 },
  { demands: [3], type: 3, qty: 4 },
];

export const ALL_AVAILABLE = [
  { type: 0, qty: 4 },
  { type: 1, qty: 4 },
  { type: 2, qty: 4 },
  { type: 3, qty: 4 },
];
