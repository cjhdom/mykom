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
import {setViewData} from "../../acitons";

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDescription: false,
            isShowQuestion: false
        }
        this.toggleShowDescription = this.toggleShowDescription.bind(this)
        this.openHomepage = this.openHomepage.bind(this)
        this.toggleShowQuestion = this.toggleShowQuestion.bind(this)
    }

    async componentDidMount() {
        const prevId = this.props.data && this.props.data._id
        const {id} = this.props.match.params
        if (prevId !== id) {
            await this.getData(id)
        }
    }

    toggleShowDescription() {
        this.setState({
            ...this.state,
            isShowDescription: !this.state.isShowDescription
        })
    }

    toggleShowQuestion() {
        this.setState({
            ...this.state,
            isShowQuestion: !this.state.isShowQuestion
        })
    }

    async getData(id) {
        try {
            const data = await fetch(`http://www.kosirock.co.kr/api/kosiwons/${id}`, {
                method: 'GET',
                headers: fetchHeader
            })
            this.props.setViewData({
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

    openHomepage() {
        const {kosiwonUrl} = this.props.data
        if (kosiwonUrl) {
            window.open(kosiwonUrl, '_blank', 'location=yes');
        } else {
            alert('홈페이지 주소가 등록되지 않았습니다.')
        }
    }

    doCheckGa(kosiwonName) {
        window.ga && window.ga('send', 'event', 'Kosiwon Call in Mobile', kosiwonName)
    }

    render() {
        const {routeTo} = this.props
        const {
            success,
            isImagePopup
        } = this.props
        if (success) {
            const {isShowDescription, isShowQuestion} = this.state
            const {
                _id,
                description,
                optionAircon,
                optionBed,
                optionCloset,
                optionDesk,
                optionRefrigerator,
                isElevator,
                isMeal,
                isParking,
                isRestRoom,
                isSeparate,
                isWoman,
                kosiwonAddress,
                location,
                nanbangType,
                kosiwonName,
                imageList,
                priceMax,
                priceMin,
                floor,
                intro,
                kosiwonPhoneNo,
                kosiwonVirtualNo
            } = this.props.data
            return (
                <Fragment>
                    <div className="header_jh" style={{position: 'absolute'}}>
                        <div className="header_jh_left">
                            <img src="/img/back_btn.png" align="absmiddle" width="52px" height="52px"
                                 onClick={() => routeTo(EnumRoute.main)}/>
                        </div>
                        <img src="/img/logo.png" align="absmiddle" width="105px" height="23px"
                             style={{marginTop: '15px'}}/>
                    </div>

                    {isShowDescription && <div className="kosi_detail_pop" style={{zIndex: '999999'}}>
                        <div className="detail_kosi_title">고시원 상세설명</div>
                        <div className="detail_kosi_contents">
                            <pre>{description}</pre>
                        </div>
                        <div className="share_pop_close2" onClick={this.toggleShowDescription}>
                            <img src="/img/close.png" align="absmiddle" width="100%"/>
                        </div>
                    </div>}

                    {isShowQuestion && <div className="question_pop" style={{zIndex: '999999'}}>
                        <img src="/img/question_pop_logo.png" align="absmiddle" width="100px"/><br/>
                        <span>고시락에서 연락받았다고 하면<br/>빠르게 연락받을 수 있습니다.</span><br/>
                        <div className="question_pop_kosi">{kosiwonName}</div>
                        <div>{kosiwonVirtualNo || kosiwonPhoneNo}</div>
                        <div className="question_pop_btns">
                            <a>
                            </a>
                            <div className="q_btn_1" onClick={() => this.doCheckGa(kosiwonName)}><a>
                            </a><a href={`tel:${kosiwonVirtualNo || kosiwonPhoneNo}`} style={{color: 'inherit'}}>
                                <img src="/img/phone_2.png" align="absmiddle" width="18px" height="18px"
                                     style={{marginTop: '6px'}}/>
                                <br/>
                                전화하기
                            </a>
                            </div>
                            <a>
                            </a>
                            <div className="q_btn_2" onClick={this.toggleShowQuestion}><a>
                            </a><a href={`sms:${kosiwonVirtualNo || kosiwonPhoneNo}`} style={{color: 'inherit'}}>
                                <img src="/img/message.png" align="absmiddle" width="25px" height="16px"
                                     style={{marginTop: '8px'}}/>
                                <br/>문자보내기
                            </a>
                            </div>

                        </div>
                        <div className="share_pop_close2" onClick={this.toggleShowQuestion}>
                            <img src="/img/close.png" align="absmiddle" width="100%"/>
                        </div>
                    </div>}

                    {(isShowQuestion || isShowDescription) &&
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
                            <ImageSwiperContainer imageList={imageList}
                                                  routeTo={routeTo}
                                                  id={_id}/>
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
                            <DescContainer desc={description}
                                           toggleShowDescription={this.toggleShowDescription}/>
                        </div>}
                    </div>
                    <div style={{bottom: '0px', position: 'fixed', height: '52px', zIndex: '10000'}}>
                        <div className="question_50_left" onClick={this.openHomepage}>
                            <img src="/img/home.png" align="absmiddle" width="17px" height="18px"
                                 style={{verticalAlign: 'middle'}}/> &nbsp;홈페이지
                        </div>
                        <div className="question_50" onClick={this.toggleShowQuestion}>
                            <img src="/img/phone.png" align="absmiddle" width="17px" height="18px"
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
        ...state.view
    }),
    {
        routeTo,
        setViewData
    }
)(View);
