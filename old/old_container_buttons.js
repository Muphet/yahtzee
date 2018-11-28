import React, { Component } from 'react';
/*import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startRoll, viewRules, newGame } from '../actions';*/
import { START_ROLL, VIEW_RULES, NEW_GAME } from '../actions';
import { timeOut } from './container_dice';

export default class Buttons extends Component {
    handleNewGameClick() {
        if (confirm('Are you sure you want to start a new game?')) {
            clearTimeout(timeOut);
            this.props.createAction(NEW_GAME);
        }
    }

    calculateScore() {
        return Object.values(this.props.scoresTaken).reduce((total, score) => {
            return total + (score > -1 ? score : 0);
        }, 0);
    }

    handleRulesClick() {
        if (this.props.diceRolling < 1) {
            this.props.createAction(VIEW_RULES);
        }
    }

    handleRollClick() {
        if (this.props.diceRolling < 1 && this.props.rollsMade < 3 && this.props.dice.some(die => !die.held)) {
            this.props.createAction(START_ROLL);
        }
    }

    render() {
        return (
            <div id="buttons">
                <div id="new-score-rules">
                    <div id="button-new-game" onClick={ () => this.handleNewGameClick() }>New Game</div>
                    <div id="score">Score: { this.calculateScore() }</div>
                    <div id="button-rules" onClick={ () => this.handleRulesClick() }>Rules</div>
                </div>
                <div id="roll">
                    <div id="button-roll" onClick={ () => this.handleRollClick() }>Roll</div>
                    <div id="rolls">Rolls: { this.props.rollsMade }</div>
                </div>
            </div>
        );
    }
}

/*function mapStateToProps({ dice, rollsMade, scoresTaken, diceRolling }) {
    return { dice, rollsMade, scoresTaken, diceRolling };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ startRoll, viewRules, newGame }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);*/