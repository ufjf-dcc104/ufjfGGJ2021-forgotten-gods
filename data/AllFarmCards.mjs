import { PRIEST, SOLDIER, FARMER, SENATOR , FAST ,SLOW } from "./AllTimeConstants.mjs";
export const ALL_FARM_CARDS = [
  { demands: [FARMER, FARMER, FARMER, PRIEST], expire: SLOW, type: FARMER, qty: 1 },
  { demands: [FARMER, FARMER, PRIEST], expire: SLOW, type: FARMER, qty: 1 },
  { demands: [FARMER, FARMER, SOLDIER], expire: SLOW, type: FARMER, qty: 1 },
  { demands: [FARMER, FARMER], expire: FAST, type: FARMER, qty: 1 , effect:()=>{}},
];
