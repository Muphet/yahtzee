import { ROLL_DICE, FINISH_ROLL, SELECT_SCORE, NEW_GAME } from '../actions/index';
import { SCORES } from '../data';

function defaultScores() {
    const objDefaultScores = {};

    for (let i = 0; i < SCORES.length; i++) {
        objDefaultScores[SCORES[i].id] = SCORES[i].value;
    }

    return objDefaultScores;
}

export default function(state = defaultScores(), action) {
    const objState = Object.assign({}, state);
    switch (action.type) {
        case ROLL_DICE:
            for (let score in objState) {
                if (objState[score] < 0) {
                    objState[score] = -2;
                }
            }
            return objState;
        case FINISH_ROLL:
            for (let score in objState) {
                if (objState[score] < 0) {
                    objState[score] = -1;
                }
            }
            return objState;
        case SELECT_SCORE:
            objState[action.payload.id] = action.payload.score;
            return objState;
        case NEW_GAME:
            return defaultScores();
        default:
            return state;
    }
}