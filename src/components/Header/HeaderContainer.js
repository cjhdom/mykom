import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HeaderContainer extends Component {
    render() {
        const {isLogo, title} = this.props
        return (
            <div className="header_jh">
                {isLogo && <img src="img/logo.png" align="absmiddle" width="105px" height="23px" style={{marginTop: '15px'}}/>}
                <div className="header_jh_right">
                    <img src="img/search_btn.png" align="absmiddle" width="52px" height="52px"
                         ng-click="doShowModalSearchFilter()"/>
                </div>
            </div>
        );
    }
}

HeaderContainer.propTypes = {
    isLogo: PropTypes.bool,
    title: PropTypes.string
};

HeaderContainer.defaultProps = {
    isLogo: false
}

export default HeaderContainer;
