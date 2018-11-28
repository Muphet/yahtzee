import { ROLL_DICE, FINISH_ROLL, NEW_GAME } from '../actions/index';

export default function(state = false, action) {
    switch (action.type) {
        case ROLL_DICE:
            return true;
        case FINISH_ROLL:
        case NEW_GAME:
            return false;
        default:
            return state;
    }
}