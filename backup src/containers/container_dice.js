import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Import Actions Creators from actions directory here'
import { finishRoll, holdUnhold } from '../actions';
import { DICE, PIPS, DIE_PIPS } from '../data';
import $ from 'jquery';

class Dice extends Component {
    componentDidUpdate() {
        console.log('UPDATE');
        if (this.props.diceRolling) {
            this.randomizeDice();
            this.randomizeDice();
            console.log('BLAHBLAHBLAHBLAH');
            console.log( this.props.dice );
            setTimeout(() => this.props.finishRoll(), 2000);
        }
    }

    randomizeDice() {
        console.log('RANDOMIZE');
        for (let i = 0; i < this.props.dice.length; i++) {
            if (!this.props.dice[i].held) {
                this.changeFace(i, Math.floor(Math.random() * 6))
            }
        }
    }

    changeFace(index, face) {
        console.log(face + 1);
        for (let j = 0; j < PIPS.length; j++) {
            const pip = `#${DICE[index]}-die > .${PIPS[j]}`;
            if (DIE_PIPS[face][j]) {
                $(pip).addClass('show-pip');
            } else {
                $(pip).removeClass('show-pip');
            }
        }
    }

    handleDieClick(dieIndex) {
        if (this.props.rollsMade > 0 && this.props.rollsMade < 3) {
            this.props.holdUnhold(dieIndex);
        }
    }

    determinePip(dieIndex, pipId, pipIndex) {
        if (DIE_PIPS[this.props.dice[dieIndex].face - 1][pipIndex]) {
            return `${pipId} pip show-pip`;
        } else {
            return `${pipId} pip`;
        }
    }

    render() {
        console.log('RENDER');
        if (this.props.rollsMade > 0) {
            console.log('RENDER DICE!!!');
            return (
                <div id="dice">
                    { DICE.map((dieId, dieIndex) => {
                        return (
                            <div id={ dieId } key={ dieId} className="die-container">
                                <div id={ `${dieId}-held` } className="held">{ this.props.dice[dieIndex].held ? 'Hold' : '' }</div>
                                <div id={ `${dieId}-die` } className="die" onClick={ () => this.handleDieClick(dieIndex) }>
                                    { PIPS.map((pipId, pipIndex) => {
                                        return (
                                            <div key={ pipId } className={ this.determinePip(dieIndex, pipId, pipIndex) } />
                                        );
                                    }) }
                                </div>
                            </div>
                        );
                    }) }
                </div>
            );
        } else if (this.props.diceRolling) {
            console.log('RENDER BLANK DICE');
            return (
                <div id="dice">
                    { DICE.map((dieId, dieIndex) => {
                        return (
                            <div id={ dieId } key={ dieId} className="die-container">
                                <div id={ `${dieId}-held` } className="held">{ this.props.dice[dieIndex].held ? 'Hold' : '' }</div>
                                <div id={ `${dieId}-die` } className="die" onClick={ () => this.handleDieClick(dieIndex) }>
                                    { PIPS.map((pipId) => {
                                        return (
                                            <div key={ pipId } className={`${pipId} pip`} />
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

function mapStateToProps({ dice, rollsMade, diceRolling }) {
    return { dice, rollsMade, diceRolling };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ finishRoll, holdUnhold }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dice);