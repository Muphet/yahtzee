import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { SELECT_SCORE } from '../actions';
import { SCORES } from '../data';
//import { selectScore } from '../actions';

export default class Scores extends Component {
    mapScores(arr) {
        return arr.map(objScore => {
            const score = this.props.scoresTaken[objScore.id];
            return (
                <div
                    id={ objScore.id }
                    key={ objScore.id }
                    className="score"
                    onClick={ () => this.handleScoreClick(objScore.id) }>
                    <div className="score-name">
                        { objScore.name }
                    </div>
                    <div className={ score < 0 ? 'score-value possible' : 'score-value' }>
                        { score === -2 ? '' : score === -1 ? this.calculateScorePossible(objScore.id) : score }
                    </div>
                </div>
            );
        });
    }

    handleScoreClick(id) {
        if (this.props.scoresTaken[id] === -1) {
            this.props.createAction(SELECT_SCORE, id, this.calculateScorePossible(id));
        }
    }

    calculateScorePossible(id) {
        switch (id) {
            case 'ones':
                return this.props.countFace(1);
            case 'twos':
                return this.props.countFace(2) * 2;
            case 'threes':
                return this.props.countFace(3) * 3;
            case 'fours':
                return this.props.countFace(4) * 4;
            case 'fives':
                return this.props.countFace(5) * 5;
            case 'sixes':
                return this.props.countFace(6) * 6;
            case 'three-of-a-kind':
                return Math.max(...this.props.faceCountArray()) >= 3 ? this.calculateDiceTotal() : 0;
            case 'four-of-a-kind':
                return Math.max(...this.props.faceCountArray()) >= 4 ? this.calculateDiceTotal() : 0;
            case 'full-house':
                const arrFaceCount = this.props.faceCountArray();
                return arrFaceCount.includes(2) && arrFaceCount.includes(3) ? 25 : 0;
            case 'small-straight':
                const arrSmallStraight = [
                    [1, 2, 3, 4],
                    [2, 3, 4, 5],
                    [3, 4, 5, 6]
                ];
                return this.verifyStraight(arrSmallStraight) ? 30 : 0;
            case 'large-straight':
                const arrLargeStraight = [
                    [1, 2, 3, 4, 5],
                    [2, 3, 4, 5, 6]
                ];
                return this.verifyStraight(arrLargeStraight) ? 40 : 0;
            case 'chance':
                return this.calculateDiceTotal();
            case 'yahtzee':
                return this.props.yahtzee() ? 50 : 0;
                //return Math.max(...this.props.faceCountArray()) === 5 ? 50 : 0;
            default:
                return 9999; // 9999 used for debugging; this should never occur
        }
    }

    /*countFace(face) {
        return this.props.dice.reduce((count, die) => count + (die.face === face ? 1 : 0), 0);
    }

    faceCountArray() {
        return [1, 2, 3, 4, 5, 6].map(face => this.countFace(face));
    }*/

    calculateDiceTotal() {
        return this.props.dice.reduce((total, die) => total + die.face, 0);
    }

    verifyStraight(arrStraight) {
        return arrStraight.some(arr => arr.every(value => this.props.dice.map(die => die.face).includes(value)));
    }

    calculateSubtotal() {
        const arrUpper = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
        const scoresTaken = this.props.scoresTaken;
        return arrUpper.reduce((total, score) => total + (scoresTaken[score] > -1 ? scoresTaken[score] : 0), 0);
    }

    render() {
        return (
            <div id="scores">
                <div id="upper-scores">
                    { this.mapScores(SCORES.slice(0, 7)) }
                </div>
                <div>Upper Score Subtotal: { this.calculateSubtotal() }</div>
                <div id="lower-scores">
                    { this.mapScores(SCORES.slice(7)) }
                </div>
            </div>
        );
    }
}

/*function mapStateToProps({ dice, scoresTaken }) {
    return { dice, scoresTaken };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectScore }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scores);*/