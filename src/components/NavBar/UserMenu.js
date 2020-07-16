import React, { Component } from 'react';
import avatarMale from '../../assets/img/ui-sam.jpg';
import {Link} from "react-router-dom";

class UserMenu extends Component {
    render() {
        return (
            <aside>
                <div id="sidebar" className="nav-collapse mr-5" >
                    {/* sidebar menu start*/}
                    <ul className="sidebar-menu" id="nav-accordion">
                        <p className="centered">
                            <a href="#">
                                <img src={avatarMale} className="img-circle" width={80}/>
                            </a>
                        </p>
                        <h5 className="centered">Boerma<br/>Sebastiaan<br/>N°: 19880208AS410</h5>
                        <li className="mt">
                            <Link to="#">
                                <i className="fa fa-home"/>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="sub-menu">
                            <Link to="/admin/contracts">
                                <i className="fa fa-file-text"/>
                                <span>Contrats</span>
                            </Link>
                        </li>
                        <li className="sub-menu">
                            <Link to="#">
                                <i className="fa fa-tasks"/>
                                <span>Conventions</span>
                            </Link>

                            <ul className="">
                                <li> <Link to="/admin/conventions">
                                    <i className="fa fa-tasks"/>
                                    <span>Dashboard</span>
                                </Link>
                                </li>
                                <li>
                                    <Link to="/admin/conventions/care-networks-list">
                                        <i className="fa fa-hospital-o"/>
                                        <span>Réseau de soins</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>
                        <li>
                            <Link to="/admin/subscriptions/list">
                                <i className="fa fa-handshake-o"/>
                                <span>Souscriptions</span>
                            </Link>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-envelope"/>
                                <span>Mail </span>
                                <span className="label label-theme pull-right mail-info">2</span>
                            </a>
                        </li>
                        <li className="sub-menu">
                            <Link href="javascript:;">
                                <i className=" fa fa-bar-chart-o"/>
                                <span>Rapports</span>
                            </Link>
                            <ul className="sub">
                                <li><Link to="/reports" >Mensuel</Link></li>
                            </ul>
                        </li>
                    </ul>
                    {/* sidebar menu end*/}
                </div>
            </aside>

        );
    }
}

export default UserMenu;