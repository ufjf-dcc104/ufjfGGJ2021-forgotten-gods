import { PRIEST, SOLDIER, FARMER, SENATOR ,SLOW } from "./AllTimeConstants.mjs";
export const ALL_TEMPLE_CARDS = [
  { demands: [PRIEST, PRIEST, PRIEST, SENATOR], expire:SLOW,type: PRIEST, qty: 1 },
  { demands: [PRIEST, PRIEST, SENATOR], expire:SLOW,type: PRIEST, qty: 1 },
  { demands: [PRIEST, PRIEST, FARMER], expire:SLOW,type: PRIEST, qty: 1 },
  { demands: [PRIEST, PRIEST], expire:SLOW,type: PRIEST, qty: 1 },
];
