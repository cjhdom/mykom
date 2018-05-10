import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import Home from "./Home";

class App extends Component {
    render() {
        const {store, history} = this.props
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div id="wrapper">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                        </Switch>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

App.propTypes = {};

export default App;
