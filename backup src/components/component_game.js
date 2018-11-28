import React, { Component } from 'react';
import Scores from '../containers/container_scores';
import Buttons from '../containers/container_buttons';
import Dice from '../containers/container_dice';

export default class Game extends Component {
    render() {
        return (
            <div id="game">
                <Scores />
                <Buttons />
                <Dice />
            </div>
        );
    }
}