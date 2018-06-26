import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

const initMap = (location) => {
    const container = document.getElementById('detail_map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(location[1], location[0]), //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
    };
    const map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

    var content = '<div class="detail_map_spot"></div>';
    var customOverlay = new daum.maps.CustomOverlay({
        position: options.center,
        content: content
    });
    customOverlay.setMap(map);
}

class MapViewContainer extends Component {

    componentDidMount() {
        const {success, data} = this.props
        if (success && data) {
            initMap(data.location)
        }
    }

    render() {
        return (
            <div>
                <div className="header_jh">
                    지도
                    <div className="header_jh_left">
                        <img src="/img/back_btn.png" align="absmiddle" width="52px" height="52px"
                             onClick={this.props.history.goBack}/>
                    </div>
                </div>
                <div id="detail_map" align="absmiddle"
                     style={{
                         width: '100%',
                         height: `${window.innerHeight - 53}px`,
                         position: 'absolute',
                         top: '53px'
                     }}
                />
            </div>
        );
    }
}

MapViewContainer.propTypes = {};

export default connect(
    state => ({
        ...state.view
    })
)(MapViewContainer);
