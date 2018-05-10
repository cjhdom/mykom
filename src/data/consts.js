'use strict'

export const fetchHeader = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache'
})

export const defaultPosition = {
    latitude: 37.59248,
    longitude: 127.011876
}