import React from 'react';
import ReactDom from 'react-dom';
import 'whatwg-fetch'
import {AppContainer} from 'react-hot-loader'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {createBrowserHistory as createHistory} from 'history'
import thunk from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'

let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production' || !devTools) {
    devTools = a => a;
}

window.onerror = () => {}

const history = createHistory()
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    {
        home: {
            isShowMap: true,
            priceRange: {
                priceMin: '',
                priceMax: ''
            },
            options: {
                isParking: false,
                isMeal: false,
                isSeparate: false,
                isRestRoom: false
            },
            isShowClusterList: false,
            isShowSearch: false,
            clusterList: [],
            itemList: [],
            totalPages: 0,
            address: ''
        },
        view: {
            success: false,
            data: null,
            isQuestionPopup: false,
            isImagePopup: false
        }
    },
    compose(applyMiddleware(thunk, routerMiddleware(history)), devTools)
)

const rootElement = document.getElementById('root');

const renderApp = () => {
    ReactDom.render(
        <AppContainer>
            <App store={store} history={history}/>
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
                <App store={store} history={history}/>
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