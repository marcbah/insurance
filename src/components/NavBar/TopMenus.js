import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class TopMenus extends Component {
    render() {
        return (
            <header className="header black-bg">
                <div className="sidebar-toggle-box">
                    <div className="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation" />
                </div>
                {/*logo start*/}
                <a href="" className="logo"><b>Coo<span>Sante</span></b></a>
                {/*logo end*/}

                <div className="top-menu">
                    <ul className="nav pull-right top-menu">
                        <li><a className="logout" href="login.html">Deconnexion</a></li>
                    </ul>
                </div>
            </header>
        );
    }
}

export default TopMenus;
