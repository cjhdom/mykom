import {
    ROUTE_TO
} from '../data/ActionTypes'
import {EnumRoute} from "../data/consts";

const defaultState = {
    currentPage: EnumRoute.main,
    payload: null
}

const ui = (state = defaultState, action) => {
    switch (action.type) {
        case ROUTE_TO:
            return {
                ...state,
                currentPage: action.page,
                payload: action.payload || null
            }
        default:
            return state
    }
}

export default ui
