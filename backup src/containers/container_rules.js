import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Import Actions Creators from actions directory here
import { returnToGame } from '../actions';

class Rules extends Component {
    handleOnClick() {
        this.props.returnToGame();
    }

    render() {
        return (
            <div onClick={() => this.handleOnClick()}>Rules Screen</div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ returnToGame }, dispatch);
}

export default connect(null, mapDispatchToProps)(Rules);