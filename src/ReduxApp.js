import React from 'react'
import App from './components/App';
import {Provider} from "react-redux";

const ReduxApp = ({store}) => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default ReduxApp