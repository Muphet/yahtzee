import { VIEW_RULES, RETURN_TO_GAME, FINISH_GAME, NEW_GAME } from '../actions/index';

export default function(state = 'Game', action) {
    switch (action.type) {
        case VIEW_RULES:
            return 'Rules';
        case RETURN_TO_GAME:
        case NEW_GAME:
            return 'Game';
        case FINISH_GAME:
            return 'Finish';
        default:
            return state;
    }
}