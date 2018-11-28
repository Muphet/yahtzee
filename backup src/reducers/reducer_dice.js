import { FINISH_ROLL, HOLD_UNHOLD, NEW_GAME } from '../actions/index';

function createEmptyDice() {
    const emptyDice = [];

    for (let i = 0; i < 5; i++) {
        emptyDice.push({face: 0, held: false});
    }

    return emptyDice;
}

export default function(state = createEmptyDice(), action) {
    const arrState = state.slice();
    switch (action.type) {
        case FINISH_ROLL:
            for (let i = 0; i < arrState.length; i++) {
                if (!arrState[i].held) {
                    arrState[i].face = Math.floor(Math.random() * 6) + 1;
                }
            }
            return arrState;
        case HOLD_UNHOLD:
            if (arrState[action.payload].held) {
                arrState[action.payload].held = false;
            } else {
                arrState[action.payload].held = true;
            }
            return arrState;
        case NEW_GAME:
            return createEmptyDice();
        default:
            return state;
    }
}