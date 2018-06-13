import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {toggleMap} from "../../acitons";
import Home from '../Home'
import {connect} from "react-redux";

const noMap = true

class KosiwonListContainer extends Component {
    render() {
        return (
            <Home isNoMap={noMap}/>
        );
    }
}

KosiwonListContainer.propTypes = {};

export default connect(
    () => ({}),
    {
        toggleMap
    }
)(KosiwonListContainer);
