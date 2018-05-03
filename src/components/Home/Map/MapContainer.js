import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MapContainer extends Component {


    render() {
        return (
            <div ng-show="vars.isShowMap" className="map_canvas" style={{marginTop: '53px'}}>

                <div id="map" align="absmiddle" style={{width: '100%', height: '83%'}}/>

                <div className="place_btn" ng-click="doSetCurrentPosition()">
                    <img src="img/place.png" align="absmiddle" width="18px" height="18px" style="margin-top:6px;"/>
                </div>

                <div className="place_search">
                    <img src="img/magnify.png" ng-click="doImgClick()" align="absmiddle" width="16px" height="15px"
                         style="position:absolute;top:8px;left:10px;"/>
                    <input id="place" type="search" size="60" name="search_bar" googleplace="" g-places-autocomplete
                           ng-model="autocomplete" placeholder="지역명, 지하철역명, 대학교명을 입력하세요."
                           ng-keydown="doEnterkey($event)" force-selection="true" data-ng-click="clearSearch()"
                           options="autocompleteOptions" data-tap-disabled="true" ng-change='disableTap()'
                           ng-model="search" kr-input/>
                </div>
            </div>
        )
    }
}

MapContainer.propTypes = {};

export default MapContainer;
