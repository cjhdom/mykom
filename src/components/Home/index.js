import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {every} from 'lodash';
import MapContainer from "./Map/MapContainer";
import SearchContainer from "./Search/SearchContainer";
import ClusterListContainer from "./ClusterList/ClusterListContainer";

const checkIsAllSelected = original => every(original)
const getStyle = anyBool => ({
    display: anyBool ? 'block' : 'none'
})

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMap: true,
            priceRange: {
                priceMin: '',
                priceMax: ''
            },
            options: {
                isParking: false,
                isMeal: false,
                isSeparate: false,
                isRestRoom: false
            },
            isShowClusterList: false,
            isShowSearch: false,
            clusterList: [],
            itemList: [],
            totalPages: 0,
            address: ''
        }
        /*this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnChangeAll = this.handleOnChangeAll.bind(this)*/
        this.handleSelect = this.handleSelect.bind(this)
        this.setParentState = this.setParentState.bind(this)
        this.setParentStateAsync = this.setParentStateAsync.bind(this)
        this.toggleSearch = this.toggleSearch.bind(this)
        this.toggleMap = this.toggleMap.bind(this)
    }

    handleSelect(e) {
        const {id, value} = e.target

        this.setState({
            ...this.state,
            priceRange: {
                ...this.state.priceRange,
                [id]: value
            }
        })
    }

    /*handleOnChange(e, original) {
        const {id, value} = e.target

        this.setState({
            ...this.state,
            [original]: {
                ...this.state[original],
                [id]: parseInt(value) ? value : !this.state[original][id]
            }
        }, () => {
            const {isAllSelected, ...originalFiltered} = this.state[original]
            this.setState({
                ...this.state,
                [original]: {
                    ...this.state[original],
                    isAllSelected: checkIsAllSelected(originalFiltered)
                }
            })
        })
    }

    handleOnChangeAll(e, original) {
        const {isAllSelected} = this.state[original]
        this.setState({
            ...this.state,
            [original]: Object.keys(this.state[original]).reduce((result, key) => {
                return {
                    ...result,
                    [key]: !isAllSelected
                }
            }, {})
        })
    }*/

    setParentState(newState) {
        this.setState({
            ...this.state,
            ...newState
        })
    }

    setParentStateAsync(newState) {
        return new Promise(resolve =>
            resolve(this.setState({...this.state, ...newState}))
        )
    }

    toggleSearch() {
        this.setState({
            ...this.state,
            isShowSearch: !this.state.isShowSearch
        })
    }

    toggleMap() {
        this.setState({
            ...this.state,
            isShowMap: !this.state.isShowMap
        })
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
            address
        } = this.state

        return (
            <Fragment>
                <div style={getStyle(!isShowSearch)}>
                    <div className="header_jh" style={{position: 'fixed'}}>

                        {!isShowMap && <Fragment>
                            {itemList.length}개의 고시원
                            <div className="header_jh_left">
                                <img src="img/back_btn.png" align="absmiddle" width="52px" height="52px"
                                     onClick={this.toggleMap}/>
                            </div>
                        </Fragment>}
                        {isShowMap && <img src="/img/logo.png" align="absmiddle" width="105px" height="23px"  style={{marginTop: '15px'}}/>}
                        <div className="header_jh_right">
                            <img src="/img/search_btn.png" align="absmiddle" width="52px" height="52px"
                                 onClick={this.toggleSearch}/>
                        </div>
                    </div>
                    <div style={getStyle(isShowMap)}>
                        <MapContainer
                            setParentState={this.setParentState}
                            setParentStateAsync={this.setParentStateAsync}
                            isShowClusterList={isShowClusterList}
                            itemList={itemList}
                            priceRange={priceRange}
                            options={options}
                            lat={lat}
                            lng={lng}
                            address={address}
                        />
                    </div>

                    <ClusterListContainer setParentState={this.setParentState}
                                          isShowClusterList={isShowClusterList}
                                          clusterList={clusterList}
                                          isShowMap={isShowMap}
                                          itemList={itemList}/>
                </div>

                <div style={getStyle(isShowSearch)}>
                    <SearchContainer setParentState={this.setParentState}
                                     priceRange={priceRange}
                                     options={options}
                    />
                </div>
            </Fragment>
        )
    }
}

Home.propTypes = {};

export default Home;
