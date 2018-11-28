import { START_ROLL, ROLL_DICE, /*FINISH_ROLL, */HOLD_UNHOLD, SELECT_SCORE, NEW_GAME } from '../actions/index';

function resetDice(dice) {
    return dice.map(() => {
        return {
            face: 0,
            held: false,
            rolling: false
        };
    });
    /*const emptyDice = [];
    
    for (let i = 0; i < 5; i++) {
        emptyDice.push({ face: 0, held: false, rolling: false });
    }

    return emptyDice;*/
}

function changeFace(face) {
    let randomFace = Math.floor(Math.random() * 6) + 1;
    while (face === randomFace) {
        randomFace = Math.floor(Math.random() * 6) + 1;
    }
    return randomFace;
}

export default function(state = resetDice([0, 0, 0, 0, 0]), action) {
    switch (action.type) {
        case START_ROLL:
            return state.map(die => {
                return {
                    face: die.held ? die.face : changeFace(die.face),
                    held: die.held,
                    rolling: die.held ? false : true
                };
            });
            /*for (let i = 0; i < arrState.length; i++) {
                if (!arrState[i].held) {
                    arrState[i].face = changeFace(arrState[i].face);
                    arrState[i].rolling = true;
                }
            }
            return arrState;*/
        case ROLL_DICE:
            return state.map((die, index) => {
                return {
                    face: die.rolling ? changeFace(die.face) : die.face,
                    held: die.held,
                    rolling: die.rolling && action.payload > 2 * index + 10 ? false : die.rolling
                };
            });
            /*for (let i = 0; i < arrState.length; i++) {
                if (!arrState[i].held && arrState[i].rolling) {
                    arrState[i].face = changeFace(arrState[i].face);
                    if (action.payload > 2 * i + 10) {
                        arrState[i].rolling = false;
                    }
                }
            }
            return arrState;*/
        /*case FINISH_ROLL:
            return state.map(die => {
                return {
                    face: die.rolling ? changeFace(die.face) : die.face,
                    held: die.held,
                    rolling: false
                };
            });*/
            /*for (let i = 0; i < arrState.length; i++) {
                if (!arrState[i].held && arrState[i].rolling) {
                    arrState[i].face = changeFace(arrState[i].face);
                    arrState[i].rolling = false;
                }
            }
            return arrState;*/
        case HOLD_UNHOLD:
            return state.map((die, index) => {
                return {
                    face: die.face,
                    held: index !== action.payload ? die.held : die.held ? false : true,
                    rolling: die.rolling
                };
            });
            /*if (arrState[action.payload].held) {
                arrState[action.payload].held = false;
            } else {
                arrState[action.payload].held = true;
            }
            return arrState;*/
        case SELECT_SCORE:
        case NEW_GAME:
            return resetDice(state);
        default:
            return state;
    }
}