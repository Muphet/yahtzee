import React, { Component } from 'react';
import { connect } from 'react-redux';
// Import containers/other components here
import Rules from './container_rules';
import Game from '../components/component_game';
// Sets up usage of css_loader
import '../styles/app.css';

class App extends Component {
    render() {
        switch (this.props.screen) {
            case 'Game':
                return (
                    <Game />
                );
            case 'Rules':
                return (
                    <Rules />
                );
            case 'Final':
                return (
                    <Final />
                );
            default:
                return (
                    <div>Error</div>
                );
        }
    }
}

function mapStateToProps({ screen }) {
    return { screen };
}

export default connect(mapStateToProps)(App);