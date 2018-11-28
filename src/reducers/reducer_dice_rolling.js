import { START_ROLL, ROLL_DICE, FINISH_ROLL, NEW_GAME } from '../actions/index';

export default function(state = 0, action) {
    switch (action.type) {
        case START_ROLL:
            return 1;
        case ROLL_DICE:
            return action.payload;
        case FINISH_ROLL:
        case NEW_GAME:
            return 0;
        default:
            return state;
    }
}