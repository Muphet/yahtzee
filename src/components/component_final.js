import React, { Component } from 'react';
import { NEW_GAME } from '../actions';

export default class Final extends Component {
    handleOnClick() {
        this.props.createAction(NEW_GAME);
    }

    render() {
        return (
            <div id="final">
                <div>Final Score: { this.props.score }</div>
                <div onClick={() => this.handleOnClick()}>New Game</div>
            </div>
        );
    }
}