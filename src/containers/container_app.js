import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import Game from './container_game';
import Rules from '../components/component_rules';
import Final from '../components/component_final';
import '../styles/app.css';

class App extends Component {
    componentDidUpdate() {
        if (this.props.screen != 'Final' && Object.values(this.props.scoresTaken).every(score => score > -1)) {
            this.props.finishGame();
        }
    }

    createAction(type) {
        switch (type) {
            case actionCreators.RETURN_TO_GAME:
                this.props.returnToGame();
                break;
            case actionCreators.NEW_GAME:
                this.props.newGame();
                break;
            default:
                // This should never occur
                console.log('Error: Attempting to pass an unknown action in App');
                break;
        }
    }

    calculateScore() {
        return Object.values(this.props.scoresTaken).reduce((total, score) => {
            return total + (score > -1 ? score : 0);
        }, 0);
    }

    render() {
        switch (this.props.screen) {
            case 'Game':
                return (
                    <Game
                        scoresTaken={ this.props.scoresTaken }
                        createAction={ type => this.createAction(type) }
                        score={ this.calculateScore() } />
                );
            case 'Rules':
                return (
                    <Rules
                        createAction={ type => this.createAction(type) } />
                );
            case 'Final':
                return (
                    <Final
                        place={ this.props.place }
                        createAction={ type => this.createAction(type) }
                        score={ this.calculateScore() } />
                );
            default:
                // This should never occur
                return (
                    <div>Error: Unknown screen</div>
                );
        }
    }
}

function mapStateToProps({ scoresTaken, screen, place }) {
    return { scoresTaken, screen, place };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);