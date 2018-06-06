import React, {Component} from 'react';
import {connect} from 'react-redux'
import {EnumRoute} from '../data/consts'
import Home from "./Home";
import View from "./View";

const styleBlock = {display: 'block'}
const styleNone = {display: 'none'}

class App extends Component {
    constructor(props) {
        super(props)
        this.getStyle = this.getStyle.bind(this)
    }

    getStyle(page) {
        if (this.props.currentPage === page) {
            return styleBlock
        } else {
            return styleNone
        }
    }

    render() {
        return (
            <div>
                <div id="wrapper" style={this.getStyle(EnumRoute.main)}>
                    <Home/>
                </div>
                <div style={this.getStyle(EnumRoute.detail)}>
                    <View/>
                </div>
            </div>
        );
    }
}

App.propTypes = {};

export default connect(
    state => ({
        currentPage: state.currentPage
    })
)(App);
