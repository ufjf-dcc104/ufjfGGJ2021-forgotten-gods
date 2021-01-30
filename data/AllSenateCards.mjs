import { PRIEST, SOLDIER, FARMER, SENATOR , SLOW } from "./AllTimeConstants.mjs";
export const ALL_SENATE_CARDS = [
  { demands: [SENATOR, SENATOR, SENATOR, PRIEST],expire: SLOW, type: SENATOR, qty: 1 },
  { demands: [SENATOR, SENATOR, PRIEST],expire: SLOW, type: SENATOR, qty: 1 },
  { demands: [SENATOR, SENATOR, SOLDIER],expire: SLOW, type: SENATOR, qty: 1 },
  { demands: [SENATOR, SENATOR],expire: SLOW, type: SENATOR, qty: 1 },
];
