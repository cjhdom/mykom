import React from 'react';
import Slider from 'react-slick';
import {routeTo} from "../../../acitons";

const ImageView = ({settings, imageList, routeTo, id}) => {
    return (
        <div className="slider" style={{width: '100%', visibility: 'visible'}}>
            <div className="slider-slides">
                <Slider {...settings}>
                    {imageList.map((image, i) => {
                        return (
                            <div className="slider-slide" key={i} onClick={() => routeTo(`/view-image/${id}/${i}`)}>
                                <div className="detail_img">
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