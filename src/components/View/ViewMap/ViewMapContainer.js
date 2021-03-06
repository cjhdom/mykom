import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const initMap = (kosiwonName, location) => {
    const container = document.getElementById('location_map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(location[1], location[0]), //지도의 중심좌표.
        level: 4, //지도의 레벨(확대, 축소 정도)
        draggable: false,
        disableDoubleClick: true,
        disableDoubleClickZoom: true
    };
    const map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

    /*const marker = new daum.maps.Marker({
        position: new daum.maps.LatLng(location[1], location[0])
    });

    //map.setDraggable(true);
    marker.setMap(map);*/

    var content = '<div class="detail_map_spot"></div>';
    var customOverlay = new daum.maps.CustomOverlay({
        position: options.center,
        content: content
    });
    customOverlay.setMap(map);
}

class ViewMapContainer extends Component {

    componentDidMount() {
        const {location, kosiwonName} = this.props
        initMap(kosiwonName, location)
    }

    render() {
        const {
            kosiwonAddress
        } = this.props
        return (
            <Fragment>
                <div className="place_info_cell">
                    {kosiwonAddress}
                </div>
                <Link to="/map-view">
                    <div className="detail_map_canvas">
                        <div id="location_map" align="absmiddle" style={{height: '270px'}}/>
                    </div>
                </Link>
                <Link to="/road-view">
                    <div className="road_view">
                        <img src="/img/road_view.png" align="absmiddle" width="106px" height="39px"/>
                    </div>
                </Link>
                <div className="road_view_under"/>
            </Fragment>
        );
    }
}

ViewMapContainer.propTypes = {};

export default ViewMapContainer;
