import { PRIEST, SOLDIER, FARMER, SENATOR } from "../util/peopleTypes.mjs";
export const ALL_TEMPLE_CARDS = [
  { demands: [PRIEST, PRIEST, PRIEST, SENATOR], type: 0, qty: 1 },
  { demands: [PRIEST, PRIEST, SENATOR], type: 0, qty: 1 },
  { demands: [PRIEST, PRIEST, FARMER], type: 0, qty: 1 },
  { demands: [PRIEST, PRIEST], type: 0, qty: 1 },
];
