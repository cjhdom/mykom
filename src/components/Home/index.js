import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {every} from 'lodash';
import MapContainer from "./Map/MapContainer";
import SearchContainer from "./Search/SearchContainer";
import ClusterListContainer from "./ClusterList/ClusterListContainer";
import {getHomeState} from "../../reducers";
import {
    routeTo, saveMapState,
    setAddress, setClusterList, setItemList, setLocation, setSearchOption, setShowCluster, toggleMap,
    toggleSearch
} from "../../acitons";
import {connect} from "react-redux";

const checkIsAllSelected = original => every(original)
const getStyle = anyBool => ({
    display: anyBool ? 'block' : 'none'
})

class Home extends Component {
    componentDidMount() {
        const {isNoMap, isShowMap} = this.props
        if ((!isNoMap && !isShowMap) || (isNoMap && isShowMap)) {
            this.props.toggleMap()
        }
    }

    render() {
        const {
            isShowMap,
            clusterList,
            priceRange,
            options,
            itemList,
            isShowClusterList,
            isShowSearch,
            lat,
            lng,
            address,
            toggleMap,
            toggleSearch,
            setShowCluster,
            setLocation,
            setItemList,
            setAddress,
            setSearchOption,
            setClusterList,
            routeTo,
            saveMapState,
            map,
            clusterer,
            level,
            isNoMap
        } = this.props

        const length = isShowClusterList ? clusterList.length : itemList.length

        return (
            <Fragment>
                <div style={getStyle(!isShowSearch)}>
                    <div className="header_jh" style={{position: 'fixed'}}>

                        {!isShowMap && <Fragment>
                            {length}개의 고시원
                            <div className="header_jh_left">
                                <img src="img/back_btn.png" align="absmiddle" width="52px" height="52px"
                                     onClick={() => {
                                         routeTo('/')
                                     }}/>
                            </div>
                        </Fragment>}
                        {isShowMap && <img src="/img/logo.png" align="absmiddle" width="105px" height="23px"
                                           style={{marginTop: '15px'}}/>}
                        <div className="header_jh_right">
                            <img src="/img/search_btn.png" align="absmiddle" width="52px" height="52px"
                                 onClick={toggleSearch}/>
                        </div>
                    </div>
                    {!isNoMap && <div style={getStyle(isShowMap)}>
                        <MapContainer
                            level={level}
                            isShowMap={isShowMap}
                            setShowCluster={setShowCluster}
                            setLocation={setLocation}
                            setItemList={setItemList}
                            setAddress={setAddress}
                            isShowClusterList={isShowClusterList}
                            itemList={itemList}
                            priceRange={priceRange}
                            options={options}
                            lat={lat}
                            lng={lng}
                            address={address}
                            setClusterList={setClusterList}
                            saveMapState={saveMapState}
                            map={map}
                            clusterer={clusterer}
                        />
                    </div>}

                    <ClusterListContainer isShowClusterList={isShowClusterList}
                                          clusterList={clusterList}
                                          isShowMap={isShowMap}
                                          isNoMap={isNoMap}
                                          itemList={itemList}
                                          setShowCluster={setShowCluster}/>
                </div>

                <div style={getStyle(isShowSearch)}>
                    <SearchContainer setSearchOption={setSearchOption}
                                     toggleMap={toggleMap}
                                     toggleSearch={toggleSearch}
                                     priceRange={priceRange}
                                     options={options}
                    />
                </div>
            </Fragment>
        )
    }
}

Home.propTypes = {
    isNoMap: PropTypes.bool
};

Home.defaultProps = {
    isNoMap: false
}

export default connect(
    state => ({
        ...getHomeState(state)
    }),
    {
        setSearchOption,
        setShowCluster,
        setLocation,
        setItemList,
        setClusterList,
        setAddress,
        toggleSearch,
        toggleMap,
        routeTo,
        saveMapState
    }
)(Home);
