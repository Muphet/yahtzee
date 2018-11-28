import React, { Component } from 'react';
import { RETURN_TO_GAME } from '../actions';

export default class Rules extends Component {
    handleOnClick() {
        this.props.createAction(RETURN_TO_GAME);
    }

    render() {
        return (
            <div onClick={() => this.handleOnClick()}>Rules Screen</div>
        );
    }
}