import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Import Actions Creators from actions directory here
import { newGame } from '../actions';

class Final extends Component {
    handleOnClick() {
        this.props.newGame();
    }

    render() {
        return (
            <div onClick={() => this.handleOnClick()}></div>
        );
    }
}

function mapStateToProps({ place }) {
    return { place };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ newGame }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Final);