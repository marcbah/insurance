/**
 * List of Insureds Administration
 */

import React, {Component} from 'react'
import {AdminAPI} from '../../../api';
import {Link} from "react-router-dom";

export default class InsuredsAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: true, data: [], error: ''};
    }

    componentDidMount() {
        this.loadInsureds();
    }

    loadInsureds = () => {
        AdminAPI.get('insureds')
            .then(res => {
                this.setState({loading: false, data: res.data, error: ''});
            }, error => {
                this.setState({
                    loading: false,
                    data: null,
                    error: "An error occurred"
                });
            });
    };

    displayInsureds = (insureds) => {
        return (
            <div className="table-responsive">
                <table className="table table-hover mb-0">
                    <thead>
                    <tr>
                        <th># ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Date de naissance</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                    {insureds.map((item, key) => {
                        return(
                            <tr key={key}>
                                <td>{item.id}</td>
                                <td>{item.last_name}</td>
                                <td>{item.first_name}</td>
                                <td>{item.dob}</td>
                                <td>{item.mobile}</td>
                                <td>{item.email}</td>
                                <td>
                                    <a type="button" className="btn text-success" href={`/admin/insureds/${item.id}`}>
                                        <span><i className="fa fa-eye"></i></span>
                                    </a>
                                    <a type="button" className="btn text-warning" href={`/admin/insureds/${item.id}/edit`}>
                                        <span><i className="fa fa-edit"></i></span>
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    };

    render() {
        const {match} = this.props;
        const {loading, data, error} = this.state;

        return (
            <div className="col-sm-10 widget-container p-10">
                <Link to={match.url}>
                    <h2>Liste des assurés</h2>
                </Link>

                <Link className="btn btn-success m-b-20" to="/admin/new-insured">
                    <span className="fa fa-plus"> Nouvel assuré</span>
                </Link>

                {loading && <div>Loading ...</div>}
                {!loading && error && <div className="m-10"><span className="text-danger">{error}</span></div>}
                {!loading && !error && this.displayInsureds(data)}
            </div>
        )
    }
}
