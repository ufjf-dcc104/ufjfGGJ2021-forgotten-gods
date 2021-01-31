export const PRIEST = 0;
export const FARMER = 1;
export const SENATOR = 2;
export const SOLDIER = 3;

export const GAME_TIME = 180;

export const FAST = 20.0;
export const SLOW = 30.0;
export const SLOWEST = 40.0;

export const TYPE_COLOR = {};
export let PW = 0;
export let PH = 0;
export const setPeopleSize = (w, h)=>{
    PW = w;
    PH = h;
}

TYPE_COLOR[PRIEST] = "white";
TYPE_COLOR[FARMER] = "green";
TYPE_COLOR[SENATOR] = "red";
TYPE_COLOR[SOLDIER] = "blue";

