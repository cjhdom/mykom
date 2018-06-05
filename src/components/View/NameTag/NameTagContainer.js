import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class NameTagContainer extends Component {
    render() {
        return (
            <Fragment>
                <div className="detail_cell_jh">
                    <span style={{fontSize: '16px', fontWeight: 'bold'}} className="ng-binding">모두인 원룸텔</span>&nbsp;
                    <span style={{color: '#ff9999', fontWeight: 'bold'}} className="ng-binding">36~48만원</span><br/>
                    <span className="infoo ng-binding" style={{color: 'gray', fontSize: '11px'}}>
                        동대문 신설동역 3번 축구에서 도보 2분거리에 위치하고 있습니다.
                    </span>
                    <div ng-className="model.isParking ?  'possible2' : 'impossible2'" className="impossible2">
                        주차가능
                    </div>
                    <div ng-className="model.isMeal ?     'possible2' : 'impossible2'" className="impossible2">
                        식사제공
                    </div>
                    <div ng-className="model.isSeparate ? 'possible2' : 'impossible2'" className="impossible2">
                        남녀층 분리
                    </div>
                    <div ng-className="model.isRestRoom ? 'possible2' : 'impossible2'" className="possible2">
                        개별 화장실
                    </div>
                </div>
                <div className="detail_cell_under">
                    <div className="fifty" ng-click="doFavorite()">
                        <img align="absmiddle" width="19px" height="17px" style={{verticalAlign: 'middle'}}
                             ng-src="img/pink_heart.png" src="img/pink_heart.png"/> &nbsp;
                        <span style={{color: '#6d6e71'}}>찜하기</span>
                    </div>
                    <div className="fifty2" ng-click="vars.isSharePopup=true">
                        <img src="img/share.png" align="absmiddle" width="19px" height="17px"
                             style={{verticalAlign: 'middle'}}/> &nbsp; 공유하기
                    </div>
                </div>
            </Fragment>
        );
    }
}

NameTagContainer.propTypes = {};

export default NameTagContainer;
