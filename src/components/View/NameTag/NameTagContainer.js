import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class NameTagContainer extends Component {
    render() {
        const {
            kosiwonName,
            priceMin,
            priceMax,
            isParking,
            isMeal,
            isSeparate,
            isRestRoom,
            intro,
            toggleShare,
            toggleFavorite
        } = this.props
        return (
            <Fragment>
                <div className="detail_cell_jh">
                    <span style={{fontSize: '16px', fontWeight: 'bold'}}>{kosiwonName}</span>&nbsp;
                    <span style={{color: '#ff9999', fontWeight: 'bold'}}>{priceMin}~{priceMax}만원</span><br/>
                    <span className="infoo ng-binding" style={{color: 'gray', fontSize: '11px'}}>
                        {intro}
                    </span>
                    <div className={isParking ? 'possible2' : 'impossible2'} style={{marginLeft: '2px', marginRight: '2px'}}>
                        주차가능
                    </div>
                    <div className={isMeal ? 'possible2' : 'impossible2'} style={{marginLeft: '2px', marginRight: '2px'}}>
                        식사제공
                    </div>
                    <div className={isSeparate ? 'possible2' : 'impossible2'} style={{marginLeft: '2px', marginRight: '2px'}}>
                        남녀층 분리
                    </div>
                    <div className={isRestRoom ? 'possible2' : 'impossible2'} style={{marginLeft: '2px', marginRight: '2px'}}>
                        개별 화장실
                    </div>
                </div>
                <div className="detail_cell_under">
                    <div className="fifty" onClick={toggleFavorite}>
                        <img align="absmiddle" width="19px" height="17px" style={{verticalAlign: 'middle'}}
                             ng-src="/img/pink_heart.png" src="/img/pink_heart.png"/> &nbsp;
                        <span style={{color: '#6d6e71'}}>찜하기</span>
                    </div>
                    <div className="fifty2" onClick={toggleShare}>
                        <img src="/img/share.png" align="absmiddle" width="19px" height="17px"
                             style={{verticalAlign: 'middle'}}/> &nbsp; 공유하기
                    </div>
                </div>
            </Fragment>
        );
    }
}

NameTagContainer.propTypes = {};

export default NameTagContainer;
