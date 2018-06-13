import {push} from 'react-router-redux'
import * as ActionTypes from '../data/ActionTypes'

export const routeTo = url => push(url)

export const setSearchOption = (option) => ({
    type: ActionTypes.SET_SEARCH_OPTION,
    option
})

export const setShowCluster = (showCluster) => ({
    type: ActionTypes.SET_SHOW_CLUSTER,
    showCluster
})

export const setLocation = ({lat, lng}) => ({
    type: ActionTypes.SET_LOCATION,
    lat,
    lng
})

export const setItemList = itemList => ({
    type: ActionTypes.SET_ITEM_LIST,
    itemList
})

export const setClusterList = clusterList => ({
    type: ActionTypes.SET_CLUSTER_LIST,
    clusterList
})

export const setAddress = address => ({
    type: ActionTypes.SET_ADDRESS,
    address
})

export const toggleSearch = () => ({
    type: ActionTypes.TOGGLE_SEARCH
})

export const toggleMap = () => ({
    type: ActionTypes.TOGGLE_MAP
})

export const saveMapState = ({lat, lng, level}) => ({
    type: ActionTypes.SAVE_MAP_STATE,
    lat,
    lng,
    level
})

export const setViewData = ({
                                success,
                                data
                            }) => ({
    type: ActionTypes.SET_VIEW_DATA,
    success,
    data
})