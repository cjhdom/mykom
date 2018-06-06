import React from 'react';
import ReactDom from 'react-dom';
import 'whatwg-fetch'
import {AppContainer} from 'react-hot-loader'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'
import ReduxApp from './ReduxApp'
import {EnumRoute} from "./data/consts";


let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production' || !devTools) {
    devTools = a => a;
}

const store = createStore(
    reducers,
    {
        currentPage: EnumRoute.detail,
        payload: '59a50a4c337f5a34066ea095'
    },
    devTools
)

const rootElement = document.getElementById('root');

const renderApp = () => {
    ReactDom.render(
        <AppContainer>
            <ReduxApp store={store}/>
        </AppContainer>,
        rootElement
    );
};

if (module.hot) {
    // module.hot.accept()
    module.hot.accept('./components/App', () => {
        const App = require('./components/App').default;
        ReactDom.render(
            <AppContainer>
                <ReduxApp store={store}/>
            </AppContainer>,
            rootElement
        );
    })

    /*module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers/index');
        store.replaceReducer(nextRootReducer);
    });*/
}

renderApp();