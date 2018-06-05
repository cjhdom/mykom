import React, {Component} from 'react';
import {connect, Provider} from 'react-redux'
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
        const {store} = this.props
        return (
            <Provider store={store}>
                <div>
                    <div id="wrapper" style={this.getStyle(EnumRoute.main)}>
                        <Home/>
                    </div>
                    <div style={this.getStyle(EnumRoute.detail)}>
                        <View/>
                    </div>
                </div>
            </Provider>
        );
    }
}

App.propTypes = {};

export default connect(
    state => ({
        currentPage: state.currentPage
    })
)(App);
