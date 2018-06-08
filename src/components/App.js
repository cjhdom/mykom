import React from 'react'
import Home from './Home/index';
import View from './View/index';
import {Provider} from "react-redux";
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux'

const App = ({store, history}) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/view/:id" component={View}/>
                    {/*<Route exact path="/view/:id/image" component={View}/>*/}
                </Switch>
            </ConnectedRouter>
        </Provider>
    )
}

export default App