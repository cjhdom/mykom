import * as ActionTypes from '../data/ActionTypes'

const home = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SET_SEARCH_OPTION:
            return {
                ...state,
                ...action.option
            }
        case ActionTypes.SET_ITEM_LIST:
            return {
                ...state,
                itemList: action.itemList
            }
        case ActionTypes.SET_LOCATION:
            return {
                ...state,
                lat: action.lat,
                lng: action.lng
            }
        case ActionTypes.SET_ADDRESS:
            return {
                ...state,
                address: action.address
            }
        case ActionTypes.SET_CLUSTER_LIST:
            return {
                ...state,
                clusterList: action.clusterList
            }
        case ActionTypes.SET_SHOW_CLUSTER:
            return {
                ...state,
                isShowClusterList: action.showCluster
            }
        case ActionTypes.TOGGLE_MAP:
            return {
                ...state,
                isShowMap: !state.isShowMap
            }
        case ActionTypes.TOGGLE_SEARCH:
            return {
                ...state,
                isShowSearch: !state.isShowSearch
            }
        case ActionTypes.SAVE_MAP_STATE:
            return {
                ...state,
                lat: action.lat,
                lng: action.lng,
                level: action.level
            }
        default:
            return state
    }
}

export default home