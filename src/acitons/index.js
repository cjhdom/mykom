import {ROUTE_TO} from "../data/ActionTypes";

export const routeTo = (page, payload) => ({
    type: ROUTE_TO,
    page,
    payload
})