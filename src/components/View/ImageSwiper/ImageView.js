import React from 'react';
import Slider from 'react-slick';

const ImageView = ({settings, imageList}) => {
    return (
        <div className="slider" style={{width: '100%', visibility: 'visible'}}>
            <div className="slider-slides">
                <Slider {...settings}>
                    {imageList.map((image, i) => {
                        return (
                            <div className="slider-slide">
                                <div className="detail_img" key={i}>
                                    <img src={`http://www.kosirock.co.kr${image.imageUri}`} className="detail_img"/>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default ImageView;