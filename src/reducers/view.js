import * as ActionTypes from '../data/ActionTypes'

const view = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SET_VIEW_DATA:
            return {
                ...state,
                success: action.success,
                data: action.data
            }
        default:
            return state
    }
}

export default view