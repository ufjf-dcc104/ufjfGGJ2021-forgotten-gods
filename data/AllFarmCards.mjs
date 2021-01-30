import { PRIEST, SOLDIER, FARMER, SENATOR } from "../util/peopleTypes.mjs";
export const ALL_FARM_CARDS = [
  { demands: [FARMER, FARMER, FARMER, PRIEST], type: 0, qty: 1 },
  { demands: [FARMER, FARMER, PRIEST], type: 0, qty: 1 },
  { demands: [FARMER, FARMER, SOLDIER], type: 0, qty: 1 },
  { demands: [FARMER, FARMER], type: 0, qty: 1 },
];
