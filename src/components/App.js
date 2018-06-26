import React from 'react'
import Home from './Home/index';
import View from './View/index';
import {Provider} from "react-redux";
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux'
import KosiwonListContainer from "./KosiwonList/KosiwonListContainer";
import ViewImageContainer from "./ViewImage/ViewImageContainer";
import ReportContainer from "./Report/ReportContainer";
import RoadViewContainer from "./RoadView/RoadViewContainer";
import MapViewContainer from "./MapView/MapViewContainer";

const App = ({store, history}) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/kosiwon-list" component={KosiwonListContainer}/>
                    <Route path="/view/:id" component={View}/>
                    <Route path="/view-image/:id/:pageNo" component={ViewImageContainer}/>
                    <Route path="/road-view" component={RoadViewContainer}/>
                    <Route path="/map-view" component={MapViewContainer}/>
                    <Route path="/report/:id/:kosiwonName" component={ReportContainer}/>
                </Switch>
            </ConnectedRouter>
        </Provider>
    )
}

export default App