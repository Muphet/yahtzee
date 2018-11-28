import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import Scores from '../components/component_scores';
import Buttons from '../components/component_buttons';
import Dice from '../components/component_dice';

class Game extends Component {
    createAction(type, arg1, arg2) {
        switch (type) {
            case actionCreators.START_ROLL:
                this.props.startRoll();
                break;
            case actionCreators.ROLL_DICE:
                this.props.rollDice(arg1);
                break;
            case actionCreators.FINISH_ROLL:
                this.props.finishRoll(arg1, arg2);
                break;
            case actionCreators.HOLD_UNHOLD:
                this.props.holdUnhold(arg1);
                break;
            case actionCreators.SELECT_SCORE:
                this.props.selectScore(arg1, arg2);
                break;
            case actionCreators.VIEW_RULES:
                this.props.viewRules();
                break;
            case actionCreators.FINISH_GAME:
                this.props.finishGame();
                break;
            case actionCreators.NEW_GAME:
                this.props.createAction(type);
                break;
            default:
                // This should never occur
                console.log('Error: Attempting to pass an unknown action in Game');
                break;
        }
    }

    landOnYahtzee() {
        return this.yahtzee() && this.props.diceRolling === 0;
    }

    yahtzee() {
        return Math.max(...this.faceCountArray()) === 5;
    }

    faceCountArray() {
        return [1, 2, 3, 4, 5, 6].map(face => this.countFace(face));
    }

    countFace(face) {
        return this.props.dice.reduce((count, die) => count + (die.face === face ? 1 : 0), 0);
    }

    render() {
        return (
            <div id="game">
                <Scores
                    dice={ this.props.dice }
                    scoresTaken={ this.props.scoresTaken }
                    createAction={ (type, arg1, arg2) => this.createAction(type, arg1, arg2) }
                    landOnYahtzee = { () => this.landOnYahtzee() }
                    yahtzee={ () => this.yahtzee() }
                    faceCountArray={ () => this.faceCountArray() }
                    countFace={ (face) => this.countFace(face) } />
                <Buttons
                    dice={ this.props.dice }
                    rollsMade={ this.props.rollsMade }
                    diceRolling={ this.props.diceRolling }
                    createAction={ (type, arg1, arg2) => this.createAction(type, arg1, arg2) }
                    yahtzee={ () => this.yahtzee() }
                    score={ this.props.score } />
                <Dice
                    dice={ this.props.dice }
                    rollsMade={ this.props.rollsMade }
                    scoresTaken={ this.props.scoresTaken }
                    diceRolling={ this.props.diceRolling }
                    createAction={ (type, arg1, arg2) => this.createAction(type, arg1, arg2) }
                    landOnYahtzee = { () => this.landOnYahtzee() }
                    yahtzee={ () => this.yahtzee() } />
            </div>
        );
    }
}

function mapStateToProps({ dice, rollsMade, diceRolling }) {
    return { dice, rollsMade, diceRolling };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);