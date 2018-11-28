import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SCORES } from '../data';
// Import Actions Creators from actions directory here
import { selectScore } from '../actions';

class Scores extends Component {
    constructor(props) {
        super(props);

        this.UPPER_SCORES = SCORES.slice(0, 7);
        this.LOWER_SCORES = SCORES.slice(7)
    }

    mapScores(arr) {
        return arr.map((objScore) => {
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
            this.props.selectScore(id, this.calculateScorePossible(id));
        }
    }

    calculateScorePossible(id) {
        const dice = this.props.dice;

        switch (id) {
            case 'ones':
                return this.calculateUpperScore(1, dice);
            case 'twos':
                return this.calculateUpperScore(2, dice);
            case 'threes':
                return this.calculateUpperScore(3, dice);
            case 'fours':
                return this.calculateUpperScore(4, dice);
            case 'fives':
                return this.calculateUpperScore(5, dice);
            case 'sixes':
                return this.calculateUpperScore(6, dice);
            case 'three-of-a-kind':
                for (let i = 1; i < 7; i++) {
                    let match = 0;
                    for (let j = 0; j < dice.length; j++) {
                        if (dice[j].face === i) {
                            match++
                            if (match === 3) {
                                return this.calculateDiceTotal(dice);
                            }
                        }
                    }
                }
                return 0;
            case 'four-of-a-kind':
                for (let i = 1; i < 7; i++) {
                    let match = 0;
                    for (let j = 0; j < dice.length; j++) {
                        if (dice[j].face === i) {
                            match++
                            if (match === 4) {
                                return this.calculateDiceTotal(dice);
                            }
                        }
                    }
                }
                return 0;
            case 'full-house':
                let matchTwo = false;
                let matchThree = false;
                for (let i = 1; i < 7; i++) {
                    let match = 0;
                    for (let j = 0; j < dice.length; j++) {
                        if (dice[j].face === i) {
                            match++
                        }
                    }
                    if (match === 2) {
                        matchTwo = true;
                    }
                    if (match === 3) {
                        matchThree = true;
                    }
                    if (matchTwo && matchThree) {
                        return 25;
                    }
                }
                return 0;
            case 'small-straight':
                if ([1, 2, 3, 4].every((value) => this.checkMatches(value, dice)) ||
                [2, 3, 4, 5].every((value) => this.checkMatches(value, dice)) ||
                [3, 4, 5, 6].every((value) => this.checkMatches(value, dice))) {
                    return 30;
                } else {
                    return 0;
                }
            case 'large-straight':
                if ([1, 2, 3, 4, 5].every((value) => this.checkMatches(value, dice)) ||
                [2, 3, 4, 5, 6].every((value) => this.checkMatches(value, dice))) {
                   return 40;
                } else {
                    return 0;
                }
            case 'chance':
                return this.calculateDiceTotal(dice);
            case 'yahtzee':
                let match = 0;
                for (let i = 1; i < dice.length; i++) {
                    if (dice[0] === dice[i]) {
                        match++
                    }
                }
                if (match === 4) {
                    return 50;
                } else {
                    return 0;
                }
        }
    }

    calculateUpperScore(num, dice) {
        let upperScore = 0;

        for (let i = 0; i < dice.length; i++) {
            if (dice[i].face === num) {
                upperScore += num;
            }
        }
        return upperScore;
    }

    calculateDiceTotal(dice) {
        let diceTotal = 0;

        for (let i = 0; i < dice.length; i++) {
            diceTotal += dice[i].face;
        }
        return diceTotal;
    }

    checkMatches(value, dice) {
        for (let i = 0; i < dice.length; i++) {
            if (value === dice[i].face) {
                return true;
            }
        }
        return false;
    }

    render() {
        return (
            <div id="scores">
                <div id="upper-scores">
                    { this.mapScores(this.UPPER_SCORES) }
                </div>
                <div id="lower-scores">
                    { this.mapScores(this.LOWER_SCORES) }
                </div>
            </div>
        );
    }
}

function mapStateToProps({ dice, scoresTaken }) {
    return { dice, scoresTaken };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectScore }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scores);