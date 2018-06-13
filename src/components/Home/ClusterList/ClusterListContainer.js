import React, {Component, Fragment} from 'react';
import {routeTo} from "../../../acitons";
import {connect} from "react-redux";

const resultStyle = {
    overflowX: 'hidden'
}
const getListStyle = (isShowMap) => {
    return isShowMap ? resultStyle : {
        ...resultStyle,
        height: `${window.innerHeight - 54}px`
    }
}

class ClusterListContainer extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.forceUpdate()
    }


    render() {
        const {isShowClusterList, clusterList, isShowMap, isNoMap, itemList, routeTo, setShowCluster} = this.props
        const length = isShowClusterList ? clusterList.length : itemList.length

        return (
            <Fragment>
                {isShowMap && <div className={`main_under${isShowClusterList ? '2' : ''}`}
                                   style={{paddingLeft: isShowClusterList ? '33px' : '0px'}}>
                    {length > 0 && isShowClusterList &&
                    <img src={isShowClusterList ? 'img/main_down.png' : 'img/main_up.png'}
                         align="absmiddle" width="33px" height="33px"
                         style={{position: 'absolute', top: '8px', left: '10px'}} onClick={() => setShowCluster(!isShowClusterList)}/>}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>이 지역 고시원 {length}개
                    {length > 0 && isShowClusterList && <img src="/img/seeall.png" align="absmiddle" width="107px"
                                                             height="33px"
                                                             style={{position: 'absolute', top: '8px', right: '15px'}}
                                                             onClick={() => routeTo('/kosiwon-list')}/>}
                </div>}

                {isShowClusterList && <div className={isShowMap ? 'main_under_list' : 'main_under_list_all'}
                                           style={getListStyle(isShowMap)}>
                    {clusterList.map(data => {
                        return (
                            <div className="main_under_list_cell" onClick={() => routeTo(`/view/${data._id}`)}
                                 key={data._id}>
                                <div style={{width: '120px', height: '105px', float: 'left', marginRight: '10px'}}>
                                    <img src={data.thumbnailUri} align="absmiddle" width="100%" height="100%"/>
                                </div>
                                <div style={{width: '2%', height: '100%', float: 'left'}}>

                                </div>
                                <div className="under_detail" style={{marginTop: '8px'}}>
                                    <span style={{fontSize: ' 18px', fontWeight: 'bold'}}>{data.kosiwonName}</span>
                                    <div style={{
                                        color: '#ff9999',
                                        fontSize: '14px',
                                        marginTop: '3px',
                                        fontWeight: 'bold'
                                    }}>
                                        입실료 {data.priceMin}~{data.priceMax}만원
                                    </div>
                                    <span
                                        style={{
                                            color: '#999999',
                                            fontSize: '10px'
                                        }}>{data.intro || 'substring_25이거 먼지 체크'}</span>
                                    <div className="ululul">
                                        <span className={`${data.isParking ? 'possible' : 'impossible'}`}>주차가능</span>
                                        <span className={`${data.isMeal ? 'possible' : 'impossible'}`}>식사제공</span>
                                        <span className={`${data.isSeparate ? 'possible' : 'impossible'}`}>남녀층분리</span>
                                        <span className={`${data.isRestRoom ? 'possible' : 'impossible'}`}>개별화장실</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>}
            </Fragment>
        );
    }
}

ClusterListContainer.propTypes = {};

export default connect(
    () => ({}),
    {
        routeTo
    }
)(ClusterListContainer);
