import {
    ROUTE_TO
} from '../data/ActionTypes'

const defaultState = {
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

const home = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default home