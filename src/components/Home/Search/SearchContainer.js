import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router";

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            priceRange: {...this.props.priceRange},
            options: {...this.props.options}
        }

        this.state = this.defaultState
        this.goBack = this.goBack.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handlePrice = this.handlePrice.bind(this)
        this.applyFilter = this.applyFilter.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
    }

    goBack() {
        this.props.setParentState({
            isShowSearch: false
        })
    }

    handleOnChange(e) {
        const {id, value} = e.target

        this.setState({
            ...this.state,
            options: {
                ...this.state.options,
                [id]: parseInt(value) ? value : !this.state.options[id]
            }
        })
    }

    handlePrice(e) {
        const {id, value} = e.target

        this.setState({
            ...this.state,
            priceRange: {
                ...this.state.priceRange,
                [id]: value
            }
        })
    }

    applyFilter() {
        const {setParentState} = this.props
        setParentState({
            ...this.state,
            isShowSearch: false
        })
    }

    resetFilter() {
        this.setState(this.defaultState)
    }

    render() {
        const {options, priceRange} = this.state
        const {priceMin, priceMax} = priceRange
        const {isParking, isMeal, isSeparate, isRestRoom} = options
        return (
            <div>
                <div className="header_jh">
                    검색필터 설정
                    <div className="header_jh_left">
                        <img src="img/back_btn.png" align="absmiddle" width="52px" height="52px"
                             onClick={this.goBack}/>
                    </div>

                </div>

                <div style={{height: '100%'}}>
                    <br/><br/><br/><br/><br/>
                    <div className="form_title">
                        가격 설정
                    </div>
                    <div className="form2">
                        <div className="form2_cell0">
                            <input ng-model="vars.priceMin" type="text"
                                   style={{
                                       borderBottom: '1px solid black',
                                       width: '35%',
                                       display: 'inline-block',
                                       verticalAlign: 'top',
                                       textAlign: 'center'
                                   }}
                                   value={priceMin}
                                   placeholder="0만원" onChange={this.handlePrice}/> &nbsp;&nbsp;&nbsp;&nbsp;
                            ~ &nbsp;&nbsp;&nbsp;&nbsp;
                            <input ng-model="vars.priceMax" type="text"
                                   style={{
                                       borderBottom: '1px solid black',
                                       width: '35%',
                                       display: 'inline-block',
                                       verticalAlign: 'top',
                                       textAlign: 'center'
                                   }}
                                   value={priceMax}
                                   placeholder="0만원" onChange={this.handlePrice}/>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div className="form_title">
                        옵션 설정
                    </div>
                    <div className="form2">
                        <div className="form2_cell">
					<span ng-style="{color: vars.isParking ? '#ff9999' : '#cccccc'}">
						주차 가능
					</span>
                            <div style={{position: 'absolute', top: '-1px', right: '0px'}}>
                                <label className="toggle toggle-positive">
                                    <input type="checkbox" id="isParking" onChange={this.handleOnChange}
                                           checked={isParking}/>
                                    <div className="track">
                                        <div className="handle"/>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="form2_cell">
					<span ng-style="{color: vars.isMeal ? '#ff9999' : '#cccccc'}">
						식사제공
					</span>
                            <div style={{position: 'absolute', top: '-1px', right: '0px'}}>
                                <label className="toggle toggle-positive">
                                    <input type="checkbox" id="isMeal" onChange={this.handleOnChange}
                                           checked={isMeal}/>
                                    <div className="track">
                                        <div className="handle"/>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="form2_cell">
					<span ng-style="{color: vars.isSeparate ? '#ff9999' : '#cccccc'}">
						남녀층 분리
					</span>
                            <div style={{position: 'absolute', top: '-1px', right: '0px'}}>
                                <label className="toggle toggle-positive">
                                    <input type="checkbox" id="isSeparate" onChange={this.handleOnChange}
                                           checked={isSeparate}/>
                                    <div className="track">
                                        <div className="handle"/>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="form2_cell_last">
					<span ng-style="{color: vars.isRestRoom ? '#ff9999' : '#cccccc'}">
						개별화장실
					</span>
                            <div style={{position: 'absolute', top: '-1px', right: '0px'}}>
                                <label className="toggle toggle-positive">
                                    <input type="checkbox" id="isRestRoom" onChange={this.handleOnChange}
                                           checked={isRestRoom}/>
                                    <div className="track">
                                        <div className="handle"/>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="refresh" onClick={this.resetFilter}>
                    <img src="img/refresh.png" align="absmiddle" width="33px" height="33px"
                         style={{marginTop: '10px'}}/>
                </div>
                <div className="filter_apply" onClick={this.applyFilter}>
                    필터 적용
                </div>
            </div>
        );
    }
}

SearchContainer.propTypes = {};

export default withRouter(SearchContainer);
