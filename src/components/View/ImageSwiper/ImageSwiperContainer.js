import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageView from "./ImageView";

class ImageSwiperContainer extends Component {
    render() {
        const {imageList} = this.props
        const settings = {
            dots: true,
            dotsClass: 'indicator',
            customPaging: (i) => {
                return (
                    <a style={{cursor:'pointer'}}>{i}번 이미지</a>
                )
            },
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            lazyLoad: false,
            arrows: false,
            adaptiveHeight: false,
            swipeToSlide: true
        };
        return (
            <ImageView settings={settings}
                       imageList={imageList}/>
        )
    }
}

ImageSwiperContainer.propTypes = {};

export default ImageSwiperContainer;
