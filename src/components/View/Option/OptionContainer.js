import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class OptionContainer extends Component {
    render() {
        const {
            floor,
            nanbangType,
            isElevator,
            isParking,
            isWoman,
            isMeal,
            isRestRoom,
            isSeparate,
            optionDesk,
            optionBed,
            optionCloset,
            optionRefrigerator,
            optionAircon
        } = this.props
        return (
            <Fragment>
                <div className="detail_info_title">
                    고시원 정보
                </div>
                <div className="detail_info_cell_wrap">
                    <div className="detail_info_cell">
                        건물 층
                        <div style={{float: 'right', fontWeight: 'bold'}}>{floor}층</div>
                    </div>
                    <div className="detail_info_cell">
                        냉난방 종류
                        <div style={{
                            float: 'right',
                            fontWeight: 'bold'
                        }}>{nanbangType == 'C' ? '중앙냉난방' : '개별 냉방'}</div>
                    </div>
                    <div className="detail_info_cell">
                        엘레베이터
                        <div style={{float: 'right', fontWeight: 'bold'}}>{isElevator ? '있음' : '없음'}</div>
                    </div>
                    <div className="detail_info_cell">
                        남녀층 분리
                        <div style={{float: 'right', fontWeight: 'bold'}}>{isSeparate ? '분리' : '분리안됨'}</div>
                    </div>
                    <div className="detail_info_cell">
                        주차장
                        <div style={{float: 'right', fontWeight: 'bold'}}>{isParking ? '있음' : '없음'}</div>
                    </div>
                    <div className="detail_info_cell">
                        여성 전용
                        <div style={{float: 'right', fontWeight: 'bold'}}>{isWoman ? '전용' : '혼용'}</div>
                    </div>
                    <div className="detail_info_cell">
                        식사 제공
                        <div style={{float: 'right', fontWeight: 'bold'}}>{isMeal ? '제공' : '제공안함'}</div>
                    </div>
                    <div className="detail_info_cell_last">
                        개별 화장실
                        <div style={{float: 'right', fontWeight: 'bold'}}>{isRestRoom ? '있음' : '없음'}</div>
                    </div>
                </div>
                <div className="road_view_under">

                </div>
                <div className="option_jh">
                    <p>내부 옵션</p>
                    <img ng-show="optionDesk" src="img/desk.png" align="absmiddle"/>
                    <img ng-show="optionBed" src="img/bed.png" align="absmiddle"/>
                    <img ng-show="optionCloset" src="img/suitcase.png" align="absmiddle"/>
                    <img ng-show="optionRefrigerator" src="img/refrigerator.png" align="absmiddle"/>
                    <img ng-show="optionAircon" src="img/airconditioner.png" align="absmiddle"/>
                </div>
                <div className="road_view_under"/>
            </Fragment>
        );
    }
}

OptionContainer.propTypes = {};

export default OptionContainer;
