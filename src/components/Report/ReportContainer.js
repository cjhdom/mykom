import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fetchHeader} from "../../data/consts";

class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'R',
            isShowPopup: false
        }
        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
    }

    onChange(e) {
        const {id, value} = e.target
        this.setState({
            ...this.state,
            [id]: value
        })
    }

    togglePopup() {
        this.setState({
            ...this.state,
            isShowPopup: !this.state.isShowPopup
        })
    }

    async onClick() {
        const {type, question} = this.state
        const {id, kosiwonName} = this.props.match.params
        if (!question) {
            return alert('문의내용을 입력하지 않았습니다.')
        } else {
            try {
                const questionResult = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: fetchHeader,
                    body: JSON.stringify({
                        type,
                        status: 'Q',
                        kosiwonName,
                        kosiwonId: id,
                        question
                    })
                })
            } catch (e) {
                alert('문의')
            }

            this.togglePopup()
        }
    }


    render() {
        const {type, isShowPopup, question} = this.state
        return (
            <div>
                {isShowPopup && <div className="dark_wall"/>}
                <div className="header_jh">
                    허위정보 신고
                    <div className="header_jh_left" onClick={this.props.history.goBack}>
                        <img src="/img/back_btn.png" align="absmiddle" width="52px" height="52px" ng-click="goBack()"/>
                    </div>
                </div>

                <div className="c4" style={{textAlign: 'center', height: `${window.innerHeight - 53}px`, top: '53px'}}>
                    <br/>
                    <div style={{width: '100%', textAlign: 'left', paddingLeft: '5%', display: 'inline-block'}}>
                        <input id="type" value="R" className="check_box_class" type="checkbox" name="checkbox1"
                               checked={type === 'R'} onChange={this.onChange}/>
                        <label htmlFor="checkbox1"><span/></label> 잘못된 정보
                    </div>

                    <div style={{width: '100%', textAlign: 'left', paddingLeft: '5%', display: 'inline-block'}}>
                        <input id="type" value="E" className="check_box_class" type="checkbox" name="checkbox2"
                               checked={type === 'E'} onChange={this.onChange}/>
                        <label htmlFor="checkbox2"><span/></label> 기타
                    </div>
                    <br/><br/>
                    <textarea id="question"
                              style={{
                                  width: '80%',
                                  height: '50vh',
                                  resize: 'none',
                                  outline: 'none',
                                  border: '1px solid #d4d4d4',
                                  display: 'inline-block',
                                  padding: '5%',
                                  background: '#ffffff',
                                  whiteSpace: 'pre-line',
                                  lineHeight: '1.8'
                              }}
                              placeholder="신고 내용 작성"
                              value={question}
                              onChange={this.onChange}/>
                </div>

                <div className="singo_btn" onClick={this.onClick}>
                    문의하기
                </div>

                {isShowPopup && <div className="popup-container popup-showing active cssClass" style={{zIndex: '99999'}}>
                    <div className="popup">
                        <div className="popup-head"><h3 className="popup-title">Information</h3></div>
                        <div className="popup-body"><span>저장되었습니다.</span></div>
                        <div className="popup-buttons">
                            <button onClick={this.togglePopup}
                                    className="button button-positive">OK
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

ReportContainer.propTypes = {};

export default ReportContainer;
