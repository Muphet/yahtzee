import { START_ROLL, FINISH_ROLL, SELECT_SCORE, NEW_GAME } from '../actions/index';
import { SCORES } from '../data';
// Creates an object using [key, value] pairs; hopefully implemented by Object.fromEntries() in the future
import { fromPairs } from 'lodash';

function defaultScores() {
    //return objectArrayToObject(SCORES, 'id', 'value');
    return SCORES.reduce((obj, score) => {
        obj[score.id] = score.value;
        return obj;
    }, {});
    /*const objDefaultScores = {};

    for (let i = 0; i < SCORES.length; i++) {
        objDefaultScores[SCORES[i].id] = SCORES[i].value;
    }

    return objDefaultScores;*/
}
// Takes an array of objects and converts it to a single object with defined key/value pairs
/*function objectArrayToObject(arr, key, value) {
    return arr.reduce((obj, item) => {
        obj[item[key]] = item[value];
        return obj;
    }, {});
}*/

export default function(state = defaultScores(), action) {
    //const objState = Object.assign({}, state);
    switch (action.type) {
        case START_ROLL:
            return fromPairs(Object.entries(state).map(([ id, value ]) => [ id, value < 0 ? -2 : value ]));
            //return Object.assign({}, state, {...[Object.keys.map(score => [score]: 2)]});
            /*for (let score in objState) {
                if (objState[score] < 0) {
                    objState[score] = -2;
                }
            }
            return objState;*/
        case FINISH_ROLL:
            return fromPairs(Object.entries(state).map(([ id, value ]) => [ id, value < 0 ? -1 : value ]));
            /*
            for (let score in objState) {
                if (objState[score] < 0) {
                    objState[score] = -1;
                }
            }
            return objState;*/
        case SELECT_SCORE:
            const arrUpper = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
            const tempObj = Object.assign({}, state, {[action.payload.id]: action.payload.score});
            if (Object.entries(tempObj).reduce((total, score) => {
                return total + (arrUpper.includes(score[0]) && score[1] > 0 ? score[1] : 0);
            }, 0) > 62) {
                tempObj['bonus'] = 35;
            }
            return fromPairs(Object.entries(tempObj).map(([ id, value ]) => [ id, value < 0 ? -2 : value ]));
            /*let upperTotal = 0;
            objState[action.payload.id] = action.payload.score;
            for (let i = 0; i < arrUpper.length; i++) {
                if (objState[arrUpper[i]] > 0) {
                    upperTotal += objState[arrUpper[i]];
                }
            }
            if (upperTotal > 62) {
                objState['bonus'] = 35;
            }
            for (let score in objState) {
                if (objState[score] < 0) {
                    objState[score] = -2;
                }
            }
            return objState;*/
        case NEW_GAME:
            return defaultScores();
        default:
            return state;
    }
}