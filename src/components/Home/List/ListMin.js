import React from 'react';
import PropTypes from 'prop-types';

const ListMin = ({dataLength}) => {
    return (
        <div className="main_under" ng-className="vars.infoBarClass">
            <img ng-show="vars.isShowClusterList"
                 ng-src="{{ vars.isShowClusterList ? 'img/main_down.png' : 'img/main_up.png'}}" align="absmiddle"
                 width="33px" height="33px" style={{position: 'absolute', top: '8px', left: '10px'}}
                 ng-click="doToggleInfoBar()"/>
            <span ng-show="vars.isShowClusterList">{'    '}</span>이 지역 고시원 {{dataLength}}개
            <img ng-show="vars.isShowClusterList" src="img/seeall.png" align="absmiddle" width="107px" height="33px"
                 style={{position: 'absolute', top: '8px', right: '15px'}} ng-click="doShowAll()"/>
        </div>
    );
};

ListMin.propTypes = {

};

export default ListMin;
