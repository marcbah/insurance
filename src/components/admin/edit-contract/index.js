/**
 * EditContract Administration
 */

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import {AdminAPI} from '../../../api';
import EditContractForm from "../../common/EditContractForm";
import axios from "axios";

export default class EditContractAdmin extends Component {

    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        this.state = {
            loading: true,
            formData: {careNetworks: [], interventions: [], drugs: [], exams:[], pharmaciesWithHospitalization: []}
        };

        if (id) {
            this.state = {...this.state, contract: null}
        }
    }

    componentWillMount() {
        const {id} = this.props.match.params;
        this.loadFormData();
        if (id) {
            this.loadContract(id);
        }
    }

    loadFormData = () => {
        axios.all([
            AdminAPI.get("care-networks"),
            AdminAPI.get("med-interventions"),
            AdminAPI.post("drugs/pagination?begin=0&limit=1000"),
            AdminAPI.post("exams/pagination?begin=0&limit=1000"),
            AdminAPI.get("pharmacies-hospitalization")
        ]).then(axios.spread((careNetworksResponse, interventionsResponse, drugsResponse, examsResponse, pharmaciesHospitalizationResponse) => {
            careNetworksResponse.data = [{name: "-- Réseau de soin --"}, ...(careNetworksResponse.data)];
            interventionsResponse.data = [{name: "-- Intervention --"}, ...(interventionsResponse.data)];
            drugsResponse.data.data = [{name: "-- Médicament --"}, ...(drugsResponse.data.data)];
            examsResponse.data.data = [{name: "-- Examen --"}, ...(examsResponse.data.data)];
            pharmaciesHospitalizationResponse.data = [{name: "-- Pharmacie avec hospitalisation --"}, ...(pharmaciesHospitalizationResponse.data)];
            this.setState({
                formData: {
                    careNetworks: careNetworksResponse.data,
                    interventions: interventionsResponse.data,
                    drugs: drugsResponse.data.data || [],
                    exams: examsResponse.data.data || [],
                    pharmaciesWithHospitalization: pharmaciesHospitalizationResponse.data
                }
            })
        })).catch(error => {
            this.setState({
                loading: false,
                error: "Une erreur est survenue lors du chargement des données du formulaire."
            });
        });
    };

    /**
     * Loads contract details from service.
     * @param id    Contract identifier
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

    /**
     * Handles form submit.
     * @param values    Form elements values.
     * @param actions   Form possible actions.
     */
    handleSubmit = (values, actions) => {
        this.setState({message: {class: 'text-success', text: 'Sauvegarde en cours...'}});
        const {id} = this.props.match.params;
        let payload = this.buildPayload(values);
        console.log(payload);

        if (id) {
            payload.id = id;
            AdminAPI.put('contracts', payload).then(this.onSuccess, this.onError);
        } else {
            AdminAPI.post('contracts', payload).then(this.onSuccess, this.onError);
        }
    };

    onSuccess = (response) => {
        this.setState({
            redirect: true,
            message: null
        });
    };

    onError = (error) => {
        this.setState({
            message: {
                class: 'text-danger',
                text: 'Une erreur est survenue lors de la sauvegarde.'
            }
        });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            console.log("Redirect");
            return <Redirect to='/admin/contracts'/>
        }
    };

    /**
     * Build insured create/edit payload from the form values.
     * @param formValues    Form values
     */
    buildPayload = (formValues) => {
        return {
            "name": formValues.name,
            "care_network_id": formValues.caresConnection,
            "year_person_cap": formValues.annualRoof.person,
            "year_family_cap": formValues.annualRoof.family,
            "number_of_people_supported": formValues.family.noOfChildren,
            "additional_prime_per_child": formValues.family.additionalBonus,
            "drug_cap": formValues.drugs.defaultValue,
            "exam_cap": formValues.exams.defaultValue,
            "intervention_cap": formValues.interventions.defaultValue,
            "pharmacy_hospitalization_cap": formValues.pharmaciesWithHospitalization.defaultValue,
            "specific_intervention_caps": this.buildSpecificInterventionCaps(formValues),
            "specific_drug_caps": this.buildSpecificDrugCaps(formValues),
            "specific_exam_caps": this.buildSpecificExamCaps(formValues),
            "specific_pharmacy_hospitalization_caps": this.buildSpecificPharmaciesWithHospitalizationCaps(formValues),
            "child_primes": this.buildChildPrime(formValues)
        }
    };

    buildSpecificInterventionCaps = formValues => {
        let caps = [];
        formValues.interventions.values.map(item => {
            caps.push({
                id: item.entryId,
                contract_id: item.contractId,
                intervention_id: item.id,
                cap: item.value
            })
        });
        return caps;
    };

    buildSpecificDrugCaps = formValues => {
        let caps = [];
        formValues.drugs.values.map(item => {
            caps.push({
                id: item.entryId,
                contract_id: item.contractId,
                drug_id: item.id,
                cap: item.value
            })
        });
        return caps;
    };

    buildSpecificExamCaps = formValues => {
        let caps = [];
        formValues.exams.values.map(item => {
            caps.push({
                id: item.entryId,
                contract_id: item.contractId,
                exam_id: item.id,
                cap: item.value
            })
        });
        return caps;
    };

    buildSpecificPharmaciesWithHospitalizationCaps = formValues => {
        let caps = [];
        formValues.pharmaciesWithHospitalization.values.map(item => {
            caps.push({
                id: item.entryId,
                contract_id: item.contractId,
                pharmacy_hospitalization_id: item.id,
                cap: item.value
            })
        });
        return caps;
    };

    buildChildPrime = formValues => {
        let primes = [];
        formValues.family.values.map(item => {
            primes.push({
                id: item.id,
                from: item.from,
                to: item.to,
                prime: item.value
            })
        });
        return primes;
    };

    /**
     * gets form initial values from the given parameter.
     * In most cases, this parameter is the service call response.
     * @param data
     */
    getFormInitialValues = (data) => {
        return {
            "name": data.name,
            "caresConnection": data.care_network_id,
            "annualRoof": {
                "person": data.year_person_cap,
                "family": data.year_family_cap,
            },
            "family": {
                "noOfChildren": data.number_of_people_supported,
                "additionalBonus": data.additional_prime_per_child,
                "values": data.child_primes.map(this.buildFamilyChildPrime)
            },
            "drugs": {
                "defaultValue": data.drug_cap,
                "values": data.specific_drug_caps.map(this.buildDrugEntry)
            },
            "exams": {
                "defaultValue": data.exam_cap,
                "values": data.specific_exam_caps.map(this.buildExamEntry)
            },
            "interventions": {
                "defaultValue": data.intervention_cap,
                "values": data.specific_intervention_caps.map(this.buildInterventionEntry)
            },
            "pharmaciesWithHospitalization": {
                "defaultValue": data.pharmacy_hospitalization_cap,
                "values": data.specific_pharmacy_hospitalization_caps.map(this.buildPharmaciesWithHospitalizationEntry)
            }
        };
    };

    buildInterventionEntry = entry => {
        return {
            entryId: entry.id,
            contractId: entry.contract_id,
            id: entry.intervention_id,
            value: entry.cap
        }
    };

    buildDrugEntry = entry => {
        return {
            entryId: entry.id,
            contractId: entry.contract_id,
            id: entry.drug_id,
            value: entry.cap
        }
    };

    buildExamEntry = entry => {
        return {
            entryId: entry.id,
            contractId: entry.contract_id,
            id: entry.exam_id,
            value: entry.cap
        }
    };

    buildPharmaciesWithHospitalizationEntry = entry => {
        return {
            entryId: entry.id,
            contractId: entry.contract_id,
            id: entry.pharmacy_hospitalization_id,
            value: entry.cap
        }
    };

    buildFamilyChildPrime = entry => {
        return {
            id: entry.id,
            from: entry.from,
            to: entry.to,
            value: entry.value
        }
    };

    //region ====== DROPDOWN DATA ======
    getData = () => {
        const {careNetworks, interventions, drugs, exams, pharmaciesWithHospitalization} = this.state.formData;
        return {
            caresConnections: careNetworks,
            interventions,
            drugs,
            exams,
            pharmaciesWithHospitalization
        };
    };

    //endregion

    render() {
        const {match, match: {params: {id}}} = this.props;
        const {loading, contract, error, message} = this.state;

        return (
            <div className="col-sm-10 widget-container p-10">
                {this.renderRedirect()}

                {/*<PageTitleBar title={id ? `Editer le contrat ID: ${id}` : 'Nouveau contrat'} match={match}/>*/}

                <div className="row">
                    {!id ?
                        <EditContractForm title="" onSubmit={this.handleSubmit} data={this.getData()}/>
                        :
                        <div>
                            {loading && <span>Chargement en cours...</span>}
                            {!loading && error && <span>{error}</span>}
                            {!loading && !error &&
                            <EditContractForm
                                title=""
                                onSubmit={this.handleSubmit}
                                initialValues={this.getFormInitialValues(contract)}
                                data={this.getData()}/>
                            }
                        </div>
                    }

                    {message && <span className={message.class}>{message.text}</span>}
                </div>
            </div>
        )
    }
}
