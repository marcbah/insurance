import React from "react";
import $ from 'jquery';
import {AdminAPI} from '../../../../../api';
import ToggleBar from "./toggle-bar";
import {FieldLabel} from "../../../fields/field-label";
import PageController from "../../../page-controller";
import {FormTemplate} from '../form-template';


export default class Tresholds extends PageController {

    componentDidMount() {
        this.careNetworks();
        this.pharmacyNetworks();
        this.contract();
        $(".togglebox").click(function(){
            $('.togglebox_content').hide();
        });

    }
    constructor(props) {
        super(props);
        this.state = {insuranceId: 1, loading: true, careNetworkData: [], pharmacyNetworkData: [], contractData:[], formTemplateData:FormTemplate, error: ''};
     }
    /*

    Cette partie est loadée via json-server

     */
    careNetworks = () => {
        AdminAPI.get('care-networks')
            .then(res => {
                this.setState({loading: false, careNetworkData: res.data, error: ''});
            }, error => {
                this.setState({
                    loading: false,
                    careNetworkData: null,
                    error: "An error occurred"
                });
                console.log(error.message);
            });
    }
    pharmacyNetworks = () => {
        AdminAPI.get('pharmacy_networks')
            .then(res => {
                this.setState({loading: false, pharmacyNetworkData: res.data, error: ''});
            }, error => {
                this.setState({
                    loading: false,
                    careNetworkSata: null,
                    error: "An error occurred"
                });
                console.log(error.message);
            });
    }

    contract = () => {
        AdminAPI.get('contracts/'+this.props.contractId)
            .then(res =>{
                this.setState({loading: false, contractData: res.data, error: ''});
                console.log("contract data");
                console.log(this.state.contractData);
            }, error => {
                console.log(error.message);
            });
    }

    objectToOptions = (obj) => {
        let tab = [];
        if(obj != undefined){
            obj.forEach(function(item){
                tab[item.id] = item.name;
            });
        }
        return tab;
    }

    render() {
        const global_intervention_cap = (this.state.formTemplateData != null?this.state.formTemplateData.globalInterventionCap:undefined);
        const hospitalization_intervention_cap = (this.state.formTemplateData != null?this.state.formTemplateData.hospitalizationInterventionCap:undefined);
        const dental_intervention_cap = (this.state.formTemplateData != null?this.state.formTemplateData.dentalInterventionCap:undefined);
        const optical_intervention_cap = (this.state.formTemplateData != null?this.state.formTemplateData.opticalInterventionCap:undefined);
        const maternity_intervention_cap = (this.state.contractData != null?this.state.contractData.maternityInterventionCap:undefined);
        const coverage_extension = (this.state.formTemplateData != null?this.state.formTemplateData.coverageExtension:undefined);
        const initialContractData =(this.state.pageData != null?this.state.pageData:null);
        return (

            <>
                <fieldset>
                    <legend>Contrat</legend>
                    <div className="col-12">
                        <FieldLabel field="inputHidden" name="insuranceId" id="insuranceId" label="" value={this.state.insuranceId} errormsg=""  ref_required/>
                        <FieldLabel field="input" name="name" id="name" label="Nom" value={initialContractData != null && initialContractData.name!=undefined?initialContractData.name:""} errormsg="Ce champ est obligatoire"  ref_required/>
                        <FieldLabel field="input" name="pseudo" id="pseudo" label="Pseudo" errormsg=""  value={initialContractData != null && initialContractData.pseudo!=undefined?initialContractData.pseudo:""}  />
                        <FieldLabel field="input" name="description" id="description" label="Description" errormsg="" value={initialContractData != null && initialContractData.pseudo!=undefined?initialContractData.pseudo:""}  />
                        <FieldLabel field="input" name="reimbursementRate" id="reimbursementRate" label="Taux de remboursement" errormsg=""  width="10%" value={initialContractData != null && initialContractData.reimbursementRate!=undefined?initialContractData.reimbursementRate:""} />
                        <FieldLabel field="select" label="Réseaux de soins" name="careNetworkId" id="careNetworkId" errormsg="" options={this.objectToOptions(this.state.careNetworkData)} />
                        <FieldLabel field="select" label="MAIA" name="pharmacyNetworkId" id="pharmacyNetworkId" errormsg="" options={this.objectToOptions(this.state.pharmacyNetworkData)} />
                        <FieldLabel field="select" label="Réassurreur" name="reInsuranceId" id="reInsuranceId" errormsg="" options={null} />

                    </div>
                </fieldset>

                <fieldset>
                    <legend>Plafond</legend>
                    <div className="col-12">
                        <FieldLabel field="input" name="yearGlobalCap" id="yearGlobalCap" label="Plafond Annuel" ref_required width="20%" value={initialContractData != null && initialContractData.yearGlobalRate!=undefined?initialContractData.yearGlobalRate:""} />
                        <FieldLabel field="input" name="yearFamilyCap" id="yearFamilyCap" label="Plafond Annuel famille"  width="20%" value={initialContractData != null && initialContractData.yearFamilyCap!=undefined?initialContractData.yearFamilyCap:""} />
                        <FieldLabel field="input" name="childLimitAge" id="childLimitAge" label="Frais séjour mère accompagnat enfant" width="10%" value={initialContractData != null && initialContractData.childLimitAge!=undefined?initialContractData.childLimitAge:""}  />
                    </div>
                </fieldset>


                <fieldset>
                    <legend>Plafond intervention</legend>
                    <div className="col-12">
                        {global_intervention_cap != undefined &&
                        <ToggleBar content="general" id="general" toggleData={global_intervention_cap}  />
                        }
                        {hospitalization_intervention_cap != undefined &&
                        <ToggleBar content="hospitalisation" id="hospitalisation"
                                   toggleData={hospitalization_intervention_cap}/>
                        }
                        {dental_intervention_cap != undefined &&
                        <ToggleBar content="dentaire" id="dentaire" toggleData={dental_intervention_cap} />
                        }
                        {optical_intervention_cap != undefined &&
                        <ToggleBar content="optique" id="optique" toggleData={optical_intervention_cap} />
                        }
                        {maternity_intervention_cap != undefined &&
                        <ToggleBar content="maternite" id="maternite" toggleData={maternity_intervention_cap} />
                        }
                        {coverage_extension != undefined &&
                        <ToggleBar content="extension_couverture" id="extension_couverture" toggleData={coverage_extension} />
                        }
                    </div>
                </fieldset>
            </>
        );
    }
}





