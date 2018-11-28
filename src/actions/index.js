export const START_ROLL = 'START_ROLL';
export const ROLL_DICE = 'ROLL_DICE';
export const FINISH_ROLL = 'FINISH_ROLL';
export const HOLD_UNHOLD = 'HOLD_UNHOLD';
export const SELECT_SCORE = 'SELECT_SCORE';
export const VIEW_RULES = 'VIEW_RULES';
export const RETURN_TO_GAME = 'RETURN_TO_GAME';
export const FINISH_GAME = 'FINISH_GAME';
export const NEW_GAME = 'NEW_GAME';

export function startRoll() {
    return {
        type: START_ROLL
    };
}

export function rollDice(i) {
    return {
        type: ROLL_DICE,
        payload: i
    };
}

export function finishRoll(joker, face) {
    return {
        type: FINISH_ROLL,
        payload: { joker, face }
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
        payload: { id, score }
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
    };
}

export function returnToGame() {
    return {
        type: RETURN_TO_GAME,
        payload: ''
    };
}

export function newGame() {
    return {
        type: NEW_GAME,
        payload: ''
    };
}