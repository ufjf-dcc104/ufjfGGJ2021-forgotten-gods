import { PRIEST, SOLDIER, FARMER, SENATOR , FAST, SLOW } from "./AllTimeConstants.mjs";
export const ALL_BARRACKS_CARDS = [
  { demands: [SOLDIER, SOLDIER, SOLDIER, FARMER], expire: SLOW, type: SOLDIER, qty: 1 },
  { demands: [SOLDIER, SOLDIER, PRIEST], expire: SLOW, type: SOLDIER, qty: 1 },
  { demands: [SOLDIER, FARMER, PRIEST], expire: SLOW, type: SOLDIER, qty: 1 },
  { demands: [FARMER, FARMER], expire: FAST, type: SOLDIER, qty: 1 },
];
