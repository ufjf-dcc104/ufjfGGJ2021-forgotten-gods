import { PRIEST, SOLDIER, FARMER, SENATOR } from "../util/peopleTypes.mjs";
export const ALL_BARRACKS_CARDS = [
  { demands: [SOLDIER, SOLDIER, SOLDIER, FARMER], type: 0, qty: 1 },
  { demands: [SOLDIER, SOLDIER, PRIEST], type: 0, qty: 1 },
  { demands: [SOLDIER, FARMER, PRIEST], type: 0, qty: 1 },
  { demands: [FARMER, FARMER], type: 0, qty: 1 },
];
