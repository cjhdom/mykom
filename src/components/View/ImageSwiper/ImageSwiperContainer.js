import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageView from "./ImageView";
import {routeTo, setImageIndex} from "../../../acitons";
import {connect} from "react-redux";

class ImageSwiperContainer extends Component {
    render() {
        const {imageList, id, pageNo, index} = this.props
        let {routeTo} = this.props

        if (!routeTo) {
            routeTo = () => {
            }
        }

        const settings = {
            dots: true,
            dotsClass: 'indicator',
            customPaging: (i) => {
                return (
                    <a style={{cursor: 'pointer'}}>{i}번 이미지</a>
                )
            },
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            lazyLoad: false,
            arrows: false,
            adaptiveHeight: false,
            swipeToSlide: true,
            initialSlide: 0, //pageNo || index || 0, 요청에 의한 삭제
            afterChange: ((i) => this.props.setImageIndex(i)).bind(this),
            touchThreshold: 3,
            draggable: false
        };
        if (imageList.length > 0) {
            return (
                <ImageView settings={settings}
                           imageList={imageList}
                           id={id}
                           routeTo={routeTo}/>
            )
        } else {
            return (
                <div className="slider" style={{width: '100%', visibility: 'visible'}}>
                    <div className="slider-slides">
                        <img src="/img/detail_pic.jpg" style={{width: '100%'}}/>
                    </div>
                </div>
            )
        }
    }
}

ImageSwiperContainer.propTypes = {};

export default connect(
    () => ({}),
    {
        setImageIndex
    }
)(ImageSwiperContainer);
