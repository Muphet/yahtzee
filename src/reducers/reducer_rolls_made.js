import { START_ROLL, SELECT_SCORE, NEW_GAME } from '../actions/index';

export default function(state = 0, action) {
    switch (action.type) {
        case START_ROLL:
            return state + 1;
        case SELECT_SCORE:
        case NEW_GAME:
            return 0;
        default:
            return state;
    }
}