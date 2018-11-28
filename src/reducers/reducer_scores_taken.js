import { START_ROLL, FINISH_ROLL, SELECT_SCORE, NEW_GAME } from '../actions/index';
import { SCORES, SCORE_LABELS } from '../data';
// Creates an object using [key, value] pairs; hopefully implemented by Object.fromEntries() in the future
import { fromPairs } from 'lodash';

function defaultScores() {
    return SCORES.reduce((obj, score) => {
        obj[score.id] = score.value;
        return obj;
    }, {});
}

export default function(state = defaultScores(), action) {
    switch (action.type) {
        case START_ROLL:
            return fromPairs(Object.entries(state).map(([ id, value ]) => [ id, value < 0 ? -2 : value ]));
        case FINISH_ROLL:
            const stateObj = Object.assign({}, state);
            // Check for joker
            if (action.payload.joker) {
                const jokerCategory = SCORE_LABELS[action.payload.face - 1];
                // Reward 100 bonus points if Yahtzee category was positively scored
                if (stateObj['yahtzee'] === 50) {
                    stateObj['yahtzee-bonus'] += 100;
                }
                // Check if Upper Score category matching joker face is available
                if (stateObj[jokerCategory] < 0) {
                    // If it's available, force it to be taken by making it the only option
                    return fromPairs(Object.entries(stateObj).map(([ id, value ]) => {
                        return [ id, id === jokerCategory ? -1 : id < 0 ? -2 : value ];
                    }));
                // Check if any Lower Score categories are available
                } else if (SCORE_LABELS.slice(7, 13).some(score => stateObj[score] < 0)) {
                    // If any are avaiable, force one of them to be taken by removing Upper Score options
                    return fromPairs(Object.entries(stateObj).map(([ id, value ]) => {
                        return [ id, value > -1 ? value : SCORE_LABELS.slice(0, 6).includes(id) ? -2 : -1 ];
                    }));
                }
            }
            return fromPairs(Object.entries(stateObj).map(([ id, value ]) => [ id, value < 0 ? -1 : value ]));
        case SELECT_SCORE:
            const tempObj = Object.assign({}, state, {[action.payload.id]: action.payload.score});
            if (Object.entries(tempObj).reduce((total, score) => {
                return total + (SCORE_LABELS.slice(0, 6).includes(score[0]) && score[1] > 0 ? score[1] : 0);
            }, 0) > 62) {
                tempObj['bonus'] = 35;
            }
            return fromPairs(Object.entries(tempObj).map(([ id, value ]) => [ id, value < 0 ? -2 : value ]));
        case NEW_GAME:
            return defaultScores();
        default:
            return state;
    }
}