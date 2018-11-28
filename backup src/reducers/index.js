import { combineReducers } from 'redux';
// Import reducers
import Dice from './reducer_dice';
import RollsMade from './reducer_rolls_made';
import ScoresTaken from './reducer_scores_taken';
import Screen from './reducer_screen';
import Place from './reducer_place';
import DiceRolling from './reducer_dice_rolling';

const rootReducer = combineReducers({
    dice: Dice,
    rollsMade: RollsMade,
    scoresTaken: ScoresTaken,
    screen: Screen,
    place: Place,
    diceRolling: DiceRolling
});

export default rootReducer;