import * as ActionTypes from '../data/ActionTypes'

const view = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SET_VIEW_DATA:
            return {
                ...state,
                success: action.success,
                data: action.data
            }
        case ActionTypes.SET_IMAGE_INDEX:
            return {
                ...state,
                index: action.index
            }
        default:
            return state
    }
}

export default view