import { FINISH_GAME, NEW_GAME } from '../actions/index';

export default function(state = 4, action) {
    switch (action.type) {
        case FINISH_GAME:
            //return 'something';
        case NEW_GAME:
            return 4;
        default:
            return state;
    }
}