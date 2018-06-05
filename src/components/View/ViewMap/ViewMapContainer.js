import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class ViewMapContainer extends Component {
    render() {
        return (
            <Fragment>
                <div className="place_info_cell">
                    서울 동대문구 신설동 25-33모두인
                </div>
                <div className="detail_map_canvas" ng-click="go('app.map')">
                    <div id="location_map" align="absmiddle" style={{height:'270px'}}/>
                </div>
                <div className="road_view" ng-click="go('app.road_view')">
                    <img src="img/road_view.png" align="absmiddle" width="106px" height="39px"/>
                </div>
                <div className="road_view_under"></div>
            </Fragment>
        );
    }
}

ViewMapContainer.propTypes = {};

export default ViewMapContainer;
