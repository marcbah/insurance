/**
 * App Header
 */
import React, { Component } from 'react';
import UserMenu from '../NavBar/UserMenu';
import TopMenus from '../NavBar/TopMenus';


class Header extends Component {
    render() {
        return (
            <div className="navbar navbar-fixed-top scroll-hide">

                    <UserMenu />


                <div className="container-fluid main-nav clearfix">
                    <TopMenus />
                </div>
            </div>

        );
    }
}
export default Header;
