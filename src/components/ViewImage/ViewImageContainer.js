import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageSwiperContainer from "../View/ImageSwiper/ImageSwiperContainer";
import {connect} from "react-redux";

class ViewImageContainer extends Component {
    render() {
        const {id, pageNo} = this.props.match.params
        const {imageList, _id} = this.props.data
        if (id === _id) {
            return (
                <div className="pane" style={{
                    background: 'rgb(0, 0, 0)',
                    transform: 'translate3d(0%, 0px, 0px)',
                    opacity: '1'
                }}>
                    <div className="pic_close" onClick={this.props.history.goBack}>
                        <img src="/img/close.png" align="absmiddle" width="100%"/>
                    </div>
                    <ImageSwiperContainer imageList={imageList}
                                          pageNo={pageNo}/>
                </div>
            );
        } else {
            this.props.history.push('/')
        }
    }
}

ViewImageContainer.propTypes = {};

export default connect(
    state => ({
        ...state.view
    })
)(ViewImageContainer);
