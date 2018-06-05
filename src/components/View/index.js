import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ImageSwiperContainer from "./ImageSwiper/ImageSwiperContainer";
import NameTagContainer from "./NameTag/NameTagContainer";
import ViewMapContainer from "./ViewMap/ViewMapContainer";
import OptionContainer from "./Option/OptionContainer";
import DescContainer from "./Desc/DescContainer";

class View extends Component {
    render() {
        return (
            <Fragment>
                <div className="header_jh" style={{position: 'fixed'}}>
                    <div className="header_jh_left">
                        <img src="img/back_btn.png" align="absmiddle" width="52px" height="52px"
                             onClick={this.toggleMap}/>
                    </div>
                    <img src="/img/logo.png" align="absmiddle" width="105px" height="23px" style={{marginTop: '15px'}}/>
                </div>

                <ImageSwiperContainer/>
                <NameTagContainer/>
                <ViewMapContainer/>
                <OptionContainer/>
                <DescContainer/>

                <div className="question_50_left" ng-click="doOpenKosiwonHomepage()">
                    <img src="img/home.png" align="absmiddle" width="17px" height="18px"
                         style={{verticalAlign: 'middle'}}/> &nbsp;홈페이지
                </div>
                <div className="question_50" ng-click="vars.isQuestionPopup = true">
                    <img src="img/phone.png" align="absmiddle" width="17px" height="18px"
                         style={{verticalAlign: 'middle'}}/> &nbsp;문의하기
                </div>
            </Fragment>
        );
    }
}

View.propTypes = {};

export default View;
