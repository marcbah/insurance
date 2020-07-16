/**
 * Insured Details Administration
 */

import React, {Component} from 'react'
import {AdminAPI} from '../../../api';
// page title bar
import Thumb from '../../common/Thumb';
import {Link} from "react-router-dom";

export default class InsuredDetailsAdmin extends Component {

    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        if (id) {
            this.state = {loading: true, insured: null};
        } else {
            this.state = {loading: false}
        }
    }

    componentWillMount() {
        const {id} = this.props.match.params;
        if (id) {
            this.loadInsured(id);
        }
    }

    /**
     * Loads insured details from service.
     * @param id    Insured identifier
     */
    loadInsured = (id) => {
        AdminAPI.get(`insureds/${id}`)
            .then(response => this.loadInsuredPicture(response.data), this.onError)
    };

    /**
     * Loads insured photo from service.
     * @param insured    Insured
     */
    loadInsuredPicture = (insured) => {
        AdminAPI.get(`insureds/${insured.id}/picture`, {
            "responseType": "arraybuffer"
        }).then(response => this.onSuccessPictureLoad(response, insured), this.onError)
    };

    /**
     * Called when picture loaded successfully.
     *
     * @param response  The response that contents picture object. (array buffer)
     * @param insured   The insured information
     */
    onSuccessPictureLoad = (response, insured) => {
        let type = `${response.headers['content-type']}`;
        let fileName = `${insured.last_name}.${type.split('/')[1]}`;
        insured.picture = new File([response.data], fileName, {type});
        this.setState({
            loading: false,
            insured
        });
    };

    /**
     * Called when an error occurred while loading picture.
     *
     * @param error Error details.
     */
    onError = error => {
        this.setState({
            loading: false,
            error: "Une erreur est survenue lors du chargement des details de l'assuré."
        });
    };

    render() {
        const {match, match: {params: {id}}} = this.props;
        const {loading, insured, error} = this.state;

        return (
            <div className="col-sm-10 widget-container p-10">
                {/*{!loading && !error && <PageTitleBar title={`Assuré: ${insured.number}`} match={match}/>}*/}

                {loading && <span>Chargement en cours...<br/></span>}
                {!loading && error && <span>{error}</span>}
                {!loading && !error &&
                <div>
                    <Thumb file={insured.picture} width="100" height="100"/>
                    <div className="row-flex m-t-10">
                        <div className="col-flex-1">
                            <h3>Informations personnelles</h3>
                            <div className="m-b-20">
                                <label>Nom: </label>
                                <span className="m-10"><b>{insured.first_name}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Prénom: </label>
                                <span className="m-10"><b>{insured.last_name}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Date de naissane: </label>
                                <span className="m-10"><b>{insured.dob}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Lieu de naissane: </label>
                                <span className="m-10"><b>{insured.place_of_birth}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Pays de naissane: </label>
                                <span className="m-10"><b>{insured.country_of_birth}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Profession: </label>
                                <span className="m-10"><b>{insured.occupation}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Genre: </label>
                                <span className="m-10"><b>{insured.genre}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Email: </label>
                                <span className="m-10"><b>{insured.email}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Mobile: </label>
                                <span className="m-10"><b>{insured.mobile}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Mobile 2: </label>
                                <span className="m-10"><b>{insured.mobile_2}</b></span>
                            </div>
                        </div>
                        <div className="col-flex-1">
                            <h3>Adresse</h3>
                            <div className="m-b-20">
                                <label>Adresse: </label>
                                <span className="m-10"><b>{insured.address}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Quartier: </label>
                                <span className="m-10"><b>{insured.neighborhood}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>District: </label>
                                <span className="m-10"><b>{insured.town}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Ville: </label>
                                <span className="m-10"><b>{insured.city}</b></span>
                            </div>
                            <h3>Identification</h3>
                            <div className="m-b-20">
                                <label>Type de document</label>
                                <span className="m-10"><b>{insured.identity_type}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Numéro: </label>
                                <span className="m-10"><b>{insured.identity_number}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Nº CNPS: </label>
                                <span className="m-10"><b>{insured.cnps_number}</b></span>
                            </div>
                            <div className="m-b-20">
                                <label>Nº Extrait de naissance: </label>
                                <span className="m-10"><b>{insured.birth_act_number}</b></span>
                            </div>
                        </div>
                    </div>
                    <h3 className="m-t-10">Contacts</h3>
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Mobile</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {insured.contacts.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.last_name}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.email}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                }
                <Link className="btn" to="/admin/insureds">
                    <span className="">Retour à la liste</span>
                </Link>
            </div>
        )
    }
}
