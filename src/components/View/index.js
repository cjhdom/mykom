import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ImageSwiperContainer from "./ImageSwiper/ImageSwiperContainer";
import NameTagContainer from "./NameTag/NameTagContainer";
import ViewMapContainer from "./ViewMap/ViewMapContainer";
import OptionContainer from "./Option/OptionContainer";
import DescContainer from "./Desc/DescContainer";
import {connect} from "react-redux";
import {routeTo} from "../../acitons/index";
import {EnumRoute} from "../../data/consts";

class View extends Component {
    render() {
        const {routeTo} = this.props
        return (
            <Fragment>
                <div className="header_jh" style={{position: 'fixed'}}>
                    <div className="header_jh_left">
                        <img src="img/back_btn.png" align="absmiddle" width="52px" height="52px"
                             onClick={() => routeTo(EnumRoute.main)}/>
                    </div>
                    <img src="/img/logo.png" align="absmiddle" width="105px" height="23px" style={{marginTop: '15px'}}/>
                </div>

                <div className="c4 scroll-view ionic-scroll overflow-scroll scroll-y"
                     style={{
                         position: 'absolute',
                         top: '53px',
                         height: `${window.innerHeight - 52 * 2}px`,
                         overflowX: 'auto'
                     }}>
                    <div className="scroll">
                        <div className="list_spacer"/>
                        <ImageSwiperContainer/>
                        <NameTagContainer/>
                        <ViewMapContainer/>
                        <OptionContainer/>
                        <DescContainer/>
                    </div>
                </div>
                <div style={{bottom: '0px', position: 'fixed', height: '52px', zIndex: '10000'}}>
                    <div className="question_50_left" ng-click="doOpenKosiwonHomepage()">
                        <img src="img/home.png" align="absmiddle" width="17px" height="18px"
                             style={{verticalAlign: 'middle'}}/> &nbsp;홈페이지
                    </div>
                    <div className="question_50" ng-click="vars.isQuestionPopup = true">
                        <img src="img/phone.png" align="absmiddle" width="17px" height="18px"
                             style={{verticalAlign: 'middle'}}/> &nbsp;문의하기
                    </div>
                </div>
            </Fragment>
        );
    }
}

View.propTypes = {};

export default connect(
    () => ({}),
    {
        routeTo
    }
)(View);
