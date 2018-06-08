import {push} from 'react-router-redux'
import * as ActionTypes from '../data/ActionTypes'

export const routeTo = url => push(url)

export const setPriceRange = (id, price) => ({
    type: ActionTypes.SET_PRICE_RANGE,
    [id]: price
})

export const toggleSearch = () => ({
    type: ActionTypes.TOGGLE_SEARCH
})