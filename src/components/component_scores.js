import React, { Component } from 'react';
import { SELECT_SCORE } from '../actions';
import { SCORES, SCORE_LABELS } from '../data';

export default class Scores extends Component {
    joker() {
        return this.props.landOnYahtzee() && this.props.scoresTaken['yahtzee'] > -1;
    }

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
                return (arrFaceCount.includes(2) && arrFaceCount.includes(3)) || this.joker() ? 25 : 0;
            case 'small-straight':
                const SMALL_STRAIGHT = [
                    [1, 2, 3, 4],
                    [2, 3, 4, 5],
                    [3, 4, 5, 6]
                ];
                return this.verifyStraight(SMALL_STRAIGHT) || this.joker() ? 30 : 0;
            case 'large-straight':
                const LARGE_STRAIGHT = [
                    [1, 2, 3, 4, 5],
                    [2, 3, 4, 5, 6]
                ];
                return this.verifyStraight(LARGE_STRAIGHT) || this.joker() ? 40 : 0;
            case 'chance':
                return this.calculateDiceTotal();
            case 'yahtzee':
                return this.props.yahtzee() ? 50 : 0;
            default:
                return 9999; // 9999 used for debugging; this should never occur
        }
    }

    calculateDiceTotal() {
        return this.props.dice.reduce((total, die) => total + die.face, 0);
    }

    verifyStraight(arrStraight) {
        return arrStraight.some(arr => arr.every(value => this.props.dice.map(die => die.face).includes(value)));
    }

    calculateSubtotal() {
        const scoresTaken = this.props.scoresTaken;
        return SCORE_LABELS.slice(0, 6).reduce((total, score) => total + (scoresTaken[score] > -1 ? scoresTaken[score] : 0), 0);
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