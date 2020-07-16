/**
 * Insured Details Administration
 */

import React, {Component} from 'react'
import {AdminAPI} from '../../../api';

export default class ContractDetailsAdmin extends Component {

    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        if (id) {
            this.state = {loading: true, contract: null};
        } else {
            this.state = {loading: false}
        }
    }

    componentWillMount() {
        const {id} = this.props.match.params;
        if (id) {
            this.loadContract(id);
        }
    }

    /**
     * Loads contract details from service.
     * @param id    contract identifier
     */
    loadContract = (id) => {
        AdminAPI.get(`contracts/${id}`)
            .then(res => {
                this.setState({
                    loading: false,
                    contract: res.data
                });
            }, error => {
                this.setState({
                    loading: false,
                    error: "Une erreur est survenue lors du chargement des details du contrat."
                });
            })
    };

    render() {
        const {match, match: {params: {id}}} = this.props;
        const {loading, contract, error} = this.state;

        return (
            <div className="col-sm-10 widget-container p-10">
                <h1>{`Contrat ID: ${id}`}</h1>
                {loading && <span>Chargement en cours...</span>}
                {!loading && error && <span>{error}</span>}
                {!loading && !error &&
                <div>
                    <div className="m-b-20">
                        <label>Nom: </label>
                        <span className="m-10">{contract.name}</span>
                    </div>
                    <hr/>
                    <div className="m-b-20">
                        <h2>Plafond pour les interventions</h2>
                        <label>Plafond par défaut: </label>
                        <span className="m-10">{contract.intervention_cap}</span>
                        {contract.not_reimbursed_interventions.map(item => <label>Plafond pour: {item.name} = {item.recommended_price}</label>)}
                    </div>
                    <hr/>
                    <div className="m-b-20">
                        <h2>Plafond pour les pharmacies</h2>
                        <label>Plafond par défaut: </label>
                        <span className="m-10">{contract.drug_cap}</span>
                        {contract.not_reimbursed_drugs.map(item => <label>Plafond pour: {item.name} = {item.recommended_price}</label>)}
                    </div>
                    <hr/>
                    <div className="m-b-20">
                        <h2>Plafond pour les examens</h2>
                        <label>Plafond par défaut: </label>
                        <span className="m-10">{contract.exam_cap}</span>
                        {contract.not_reimbursed_exams.map(item => <label>Plafond pour: {item.name} = {item.recommended_price}</label>)}
                    </div>
                    <hr/>
                </div>
                }
                <a type="button" className="btn m-b-20" href="/admin/contracts">
                    <span className="jss727">Retour à la liste</span>
                </a>
            </div>
        )
    }
}
