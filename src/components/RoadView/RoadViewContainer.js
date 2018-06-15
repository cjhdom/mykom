import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class RoadViewContainer extends Component {
    render() {
        const {data} = this.props
        if (!data) {
            return (
                <div>
                    <div className="header_jh">
                        로드뷰
                        <div className="header_jh_left">
                            <img src="/img/back_btn.png" align="absmiddle" width="52px" height="52px"
                                 onClick={this.props.history.goBack}/>
                        </div>
                    </div>
                </div>
            )
        } else {
            const {kosiwonName, location} = data
            return (
                <div>
                    <div className="header_jh">
                        로드뷰 - {kosiwonName}
                        <div className="header_jh_left">
                            <img src="/img/back_btn.png" align="absmiddle" width="52px" height="52px"
                                 onClick={this.props.history.goBack}/>
                        </div>
                    </div>
                    <iframe
                        src={`http://m.kosirock.com/daumJuso/roadview.html?latitude=${location[1]}&longitude=${location[0]}`}
                        width="100%" id='daumIframe' style={{
                        position: 'absolute',
                        height: '100%'
                    }}/>
                </div>
            );
        }
    }
}

RoadViewContainer.propTypes = {};

export default connect(
    state => ({
        ...state.view
    })
)(RoadViewContainer);
