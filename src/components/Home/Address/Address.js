import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import $ from 'jquery'

class Address extends Component {
    constructor() {
        super()
        this.position = {
            left: 0,
            width: 0
        }
        this.getDrawerPosition = this.getDrawerPosition.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.getDrawerPosition)
        this.getDrawerPosition()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.getDrawerPosition)
    }

    getDrawerPosition() {
        const domEl = document.getElementById('place')
        const rect = domEl.getBoundingClientRect()
        const docEl = document.documentElement
        const body = document.body
        const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
        const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

        this.position = {
            width: rect.width - 20,
            height: rect.height,
            top: rect.top + rect.height + scrollTop,
            left: rect.left + scrollLeft
        };
    }

    render() {
        const styles = {
            autocompleteContainer: {
                position: 'absolute !important',
                mozBoxSizing: 'border-box',
                WebkitBoxSizing: 'border-box',
                left: this.position.left + 'px',
                width: this.position.width + 'px',
                height: this.position.height + 'px',
                backgroundColor: '#fff',
                zIndex: '-1000',
                borderRadius: '2px',
                borderTop: '1px solid #d9d9d9',
                fontFamily: 'Arial, sans-serif',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                boxSizing: 'border-box',
                overflow: 'visible',
                top: this.position.top + 'px',
            }
        }
        const cssClasses = {
            // autocompleteContainer: 'pac-container',
            autocompleteItem: 'pac-item',
            autocompleteItemActive: 'pac-item-selected pac-item-selected:hover'
        }
        const options = {
            types: ['geocode'],
            componentRestrictions: {country: 'kr'}
        }

        return (
            <PlacesAutocomplete
                inputProps={this.props.inputProps}
                classNames={cssClasses}
                options={options}
                shouldFetchSuggestions={this.props.shouldFetchSuggestions}
                googleLogo={false}
                autocompleteItem={this.props.autocompleteItem}
                styles={styles}
                onSelect={this.props.handleSelect}
            />
        )
    }
}

Address.propTypes = {};

export default Address;
