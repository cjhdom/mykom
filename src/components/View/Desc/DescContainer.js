import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class DescContainer extends Component {
    render() {
        const {desc} = this.props
        return (
            <Fragment>
                <div className="option_jh" style={{borderBottom:'1px solid #d4d4d4'}}>
                    <p>고시원 상세설명</p>
                    <span style={{fontWeight: 'normal'}}>
                        {desc}
		 	</span>
                </div>

                <div className="road_view">
                    <img src="img/see_detail.png" align="absmiddle" width="80px" height="39px"
                         ng-click="doShowDescription()"/>
                </div>
                <div className="road_view_under"/>

                <div className="road_view">
                    <a href="tel:02-911-9051" style={{textDecoration: 'none', color: 'black', verticalAlign: 'middle'}}>
                        <i className="icon ion-ios-telephone" style={{fontSize: '1em'}}/> &nbsp;<b
                        style={{fontSize: '.9em'}}>고시락 고객센터</b>
                    </a>
                </div>
                <div className="road_view_under"/>

                <div className="road_view"
                     ng-click="go('app.singo', {kosiwonId: model._id, kosiwonName: model.kosiwonName})">
                    <img src="img/red.png" align="absmiddle" width="18px" height="30px"
                         style={{marginTop: '1px', verticalAlign: 'top'}}/> &nbsp;&nbsp;<span
                    style={{fontSize: '12px'}}><font color="red">허위 정보 신고</font></span>
                </div>
                <div className="road_view_under"/>
            </Fragment>
        );
    }
}

DescContainer.propTypes = {};

export default DescContainer;