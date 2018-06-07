import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ImageSwiperContainer from "./ImageSwiper/ImageSwiperContainer";
import NameTagContainer from "./NameTag/NameTagContainer";
import ViewMapContainer from "./ViewMap/ViewMapContainer";
import OptionContainer from "./Option/OptionContainer";
import DescContainer from "./Desc/DescContainer";
import {connect} from "react-redux";
import {routeTo} from "../../acitons/index";
import {EnumRoute, fetchHeader} from "../../data/consts";
import {getId} from "../../reducers/index";

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            data: null,
            isQuestionPopup: false,
            isImagePopup: false
        }
    }

    setStateAsync(newState) {
        return Promise.resolve(this.setState({
            ...this.state,
            ...newState
        }))
    }

    async componentDidMount() {
        await this.getData()
    }


    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            await this.getData()
        }
    }

    async getData() {
        const {id} = this.props

        try {
            const data = await fetch(`http://www.kosirock.co.kr/api/kosiwons/${id}`, {
                method: 'GET',
                headers: fetchHeader
            })
            await this.setStateAsync({
                success: true,
                data: await data.json()
            })
        } catch (e) {
            console.log(`error! ${e}`)
        }
    }

    toggleShare() {
        alert('공유하기 기능은 모바일 앱에서 로그인 후 사용해주세요.')
    }

    toggleFavorite() {
        alert('찜하기 기능은 모바일 앱에서 로그인 후 사용해주세요.')
    }

    render() {
        const {routeTo} = this.props
        const {
            success,
            isQuestionPopup,
            isImagePopup
        } = this.state
        if (success) {
            const {
                _id,
                description,
                optionAircon,
                optionBed,
                optionCloset,
                optionDesk,
                optionFan,
                optionRefrigerator,
                isElevator,
                isMeal,
                isParking,
                isPublic,
                isRestRoom,
                isSeparate,
                isWoman,
                kosiwonAddress,
                location,
                nanbangType,
                kosiwonName,
                kosiwonPhoneNo,
                kosiwonUrl,
                kosiwonVirtualNo,
                kosiwonZipcode,
                imageList,
                priceMax,
                priceMin,
                floor,
                intro
            } = this.state.data
            return (
                <Fragment>
                    <div className="header_jh" style={{position: 'absolute'}}>
                        <div className="header_jh_left">
                            <img src="img/back_btn.png" align="absmiddle" width="52px" height="52px"
                                 onClick={() => routeTo(EnumRoute.main)}/>
                        </div>
                        <img src="/img/logo.png" align="absmiddle" width="105px" height="23px"
                             style={{marginTop: '15px'}}/>
                    </div>

                    {isImagePopup && <div className="pane" style={{
                        background: 'rgb(0, 0, 0)',
                        transform: 'translate3d(0%, 0px, 0px)',
                        opacity: '1'
                    }}>
                        <ImageSwiperContainer imageList={imageList}/>
                    </div>}

                    {(isQuestionPopup) &&
                    <div className="dark_wall"
                         ng-show="vars.isQuestionPopup || vars.isSharePopup || vars.isDetailPopup"/>}

                    <div className="c4 scroll-view ionic-scroll overflow-scroll scroll-y"
                         style={{
                             position: 'absolute',
                             top: '53px',
                             height: `${window.innerHeight - 52 * 2}px`,
                             overflowX: 'auto'
                         }}>
                        {success && <div className="scroll">
                            <ImageSwiperContainer imageList={imageList}/>
                            <NameTagContainer kosiwonName={kosiwonName}
                                              priceMin={priceMin}
                                              priceMax={priceMax}
                                              isMeal={isMeal}
                                              isParking={isParking}
                                              isRestRoom={isRestRoom}
                                              isSeparate={isSeparate}
                                              intro={intro}
                                              toggleShare={this.toggleShare}
                                              toggleFavorite={this.toggleFavorite}/>
                            <ViewMapContainer kosiwonAddress={kosiwonAddress}
                                              location={location}/>
                            <OptionContainer floor={floor}
                                             nanbangType={nanbangType}
                                             isElevator={isElevator}
                                             isParking={isParking}
                                             isWoman={isWoman}
                                             isMeal={isMeal}
                                             isRestRoom={isRestRoom}
                                             isSeparate={isSeparate}
                                             optionDesk={optionDesk}
                                             optionBed={optionBed}
                                             optionCloset={optionCloset}
                                             optionRefrigerator={optionRefrigerator}
                                             optionAircon={optionAircon}/>
                            <DescContainer desc={description}/>
                        </div>}
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
        } else {
            return null
        }
    }
}

View.propTypes = {};

export default connect(
    state => ({
        id: getId(state)
    }),
    {
        routeTo
    }
)(View);
