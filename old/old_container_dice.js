import React, { Component } from 'react';
/*import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { rollDice, finishRoll, holdUnhold } from '../actions';*/
import { ROLL_DICE, FINISH_ROLL, HOLD_UNHOLD } from '../actions';
import { DICE, PIPS, DIE_PIPS } from '../data';

export let timeOut = null;

export default class Dice extends Component {
    componentDidUpdate() {
        // Dice animation
        let diceBounce = this.props.diceRolling;

        if (diceBounce > 0 && diceBounce <= 9) {
            timeOut = setTimeout(() => this.props.createAction(ROLL_DICE, diceBounce + 1), 100);
        } else if (diceBounce > 9 && diceBounce <= 18) {
            // Stop dice one at a time
            while (diceBounce <= 18) {
                if (this.props.dice[diceBounce % 2 === 0 ? (diceBounce - 10) / 2 : (diceBounce - 11) / 2].held) {
                    diceBounce += 2;
                } else {
                    timeOut = setTimeout(() => this.props.createAction(ROLL_DICE ,diceBounce + 1), 100);
                    break;
                }
            }
        }
        if (diceBounce > 18) {
                this.props.createAction(FINISH_ROLL);
        }
    }

    handleDieClick(dieIndex) {
        if (this.props.rollsMade > 0 && this.props.rollsMade < 3 && this.props.diceRolling === 0) {
            this.props.createAction(HOLD_UNHOLD ,dieIndex);
        }
    }

    /*yahtzee() {
        return Math.max(...this.faceCountArray()) === 5
    }

    countFace(face) {
        return this.props.dice.reduce((count, die) => count + (die.face === face ? 1 : 0), 0);
    }

    faceCountArray() {
        return [1, 2, 3, 4, 5, 6].map(face => this.countFace(face));
    }*/

    determinePip(dieIndex, pipId, pipIndex) {
        if (DIE_PIPS[this.props.dice[dieIndex].face - 1][pipIndex]) {
            return `${pipId} pip show-pip`;
        } else {
            return `${pipId} pip`;
        }
    }

    render() {
        if (this.props.rollsMade > 0) {
            return (
                <div id="dice">
                    { DICE.map((dieId, dieIndex) => {
                        return (
                            <div
                                id={ dieId }
                                key={ dieId}
                                className="die-container"
                                onClick={ () => this.handleDieClick(dieIndex) }>
                                <div
                                    id={ `${dieId}-held` }
                                    className="held">{ this.props.dice[dieIndex].held ? 'Hold' : '' }</div>
                                <div
                                    id={ `${dieId}-die` }
                                    className={ this.props.yahtzee() && this.props.diceRolling === 0 ?
                                    `die animate-${dieId}` : 'die' }>
                                    { PIPS.map((pipId, pipIndex) => {
                                        return (
                                            <div
                                                key={ pipId }
                                                className={ this.determinePip(dieIndex, pipId, pipIndex) } />
                                        );
                                    }) }
                                </div>
                            </div>
                        );
                    }) }
                </div>
            );
        } else {
            return (
                <div id="dice" />
            );
        }
    }
}

/*function mapStateToProps({ dice, rollsMade, diceRolling }) {
    return { dice, rollsMade, diceRolling };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ rollDice, finishRoll, holdUnhold }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dice);*/