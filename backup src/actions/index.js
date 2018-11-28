// Export constants used for Action Types
export const ROLL_DICE = 'ROLL_DICE';
export const FINISH_ROLL = 'FINISH_ROLL';
export const HOLD_UNHOLD = 'HOLD_UNHOLD';
export const SELECT_SCORE = 'SELECT_SCORE';
export const VIEW_RULES = 'VIEW_RULES';
export const RETURN_TO_GAME = 'RETURN_TO_GAME';
export const FINISH_GAME = 'FINISH_GAME';
export const NEW_GAME = 'NEW_GAME';

export function rollDice() {
    return {
        type: ROLL_DICE
    };
}

export function finishRoll() {
    return {
        type: FINISH_ROLL
    };
}

export function holdUnhold(index) {
    return {
        type: HOLD_UNHOLD,
        payload: index
    };
}

export function selectScore(id, score) {
    return {
        type: SELECT_SCORE,
        payload: {id, score}
    };
}

export function viewRules() {
    return {
        type: VIEW_RULES,
        payload: ''
    };
}

export function finishGame() {
    return {
        type: FINISH_GAME,
        payload: ''
    }
}

export function returnToGame() {
    return {
        type: RETURN_TO_GAME,
        payload: ''
    }
}

export function newGame() {
    return {
        type: NEW_GAME,
        payload: ''
    };
}