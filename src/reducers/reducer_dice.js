import { START_ROLL, ROLL_DICE, HOLD_UNHOLD, SELECT_SCORE, NEW_GAME } from '../actions/index';

function resetDice(dice) {
    return dice.map(() => {
        return {
            face: 0,
            held: false,
            rolling: false
        };
    });
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
        case ROLL_DICE:
            return state.map((die, index) => {
                return {
                    face: die.rolling ? changeFace(die.face) : die.face,
                    held: die.held,
                    rolling: die.rolling && action.payload > 2 * index + 10 ? false : die.rolling
                };
            });
        case HOLD_UNHOLD:
            return state.map((die, index) => {
                return {
                    face: die.face,
                    held: index !== action.payload ? die.held : die.held ? false : true,
                    rolling: die.rolling
                };
            });
        case SELECT_SCORE:
        case NEW_GAME:
            return resetDice(state);
        default:
            return state;
    }
}