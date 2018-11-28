import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Import Actions Creators from actions directory here
import { rollDice, viewRules, newGame } from '../actions';

class Buttons extends Component {
    calculateScore() {
        let totalScore = 0;
        
        for (let score in this.props.scoresTaken) {
            if (this.props.scoresTaken[score] > -1) {
                totalScore += this.props.scoresTaken[score];
            }
        }
        return totalScore;
    }

    handleRulesClick() {
        if (!this.props.diceRolling) {
            this.props.viewRules();
        }
    }

    handleRollClick() {
        if (!this.props.diceRolling && this.props.rollsMade < 3) {
            console.log('ROLL THE DICE!');
            this.props.rollDice();
        }
    }

    render() {
        return (
            <div id="buttons">
                <div id="new-score-rules">
                    <div id="button-new-game">New Game</div>
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

function mapStateToProps({ rollsMade, scoresTaken, diceRolling }) {
    return { rollsMade, scoresTaken, diceRolling };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ rollDice, viewRules, newGame }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);