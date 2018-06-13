import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageView from "./ImageView";
import {routeTo} from "../../../acitons";

class ImageSwiperContainer extends Component {
    render() {
        const {imageList, id, pageNo} = this.props
        let {routeTo} = this.props

        if (!routeTo) {
            routeTo = () => {}
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
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            lazyLoad: false,
            arrows: false,
            adaptiveHeight: false,
            swipeToSlide: true,
            initialSlide: pageNo || 0
        };
        return (
            <ImageView settings={settings}
                       imageList={imageList}
                       id={id}
                       routeTo={routeTo}/>
        )
    }
}

ImageSwiperContainer.propTypes = {};

export default ImageSwiperContainer;
