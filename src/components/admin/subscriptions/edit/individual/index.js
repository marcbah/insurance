import React,{Component} from 'react';
import {AdminAPI} from "../../../../../api";
import $ from 'jquery';
import {FieldLabel} from '../../../fields/field-label';
import {Beneficiary} from "./beneficiary";
import {Link} from "react-router-dom";
import ImgProfile from 'Assets/img/user_profile_icon.png';
import PageController from "../../../page-controller";
import 'Assets/css/admin.css';
export default class EditSubscriptionIndividual extends PageController{
    constructor(props) {
        super(props);
        this.state.beneficiaries_count = 0;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*
      TEMPORARY METHOD
    * THIS WILL SOON BE REMOVED
    * THE CURRENT DATE IS TO BE HANDLED ON THE SERVER SIDE
    *   */
    currentDate = () => {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }


    handleSubmit = (event) => {
       event.preventDefault();
        AdminAPI.post(`/subscribe`, this.getFormData())
            .then(res => {
                console.log(res.data);
                this.setPageDataId(res.data.id);
                this.setState({statusNotification:1, statusMessage:'Souscription éffectuée avec succès'})
            }, error => {
                this.setState({
                    loading: false,
                    error: "An error occurred",
                    statusNotification:2, statusMessage:'Une erreure est survenue'
                });
                console.log(error.message);
            });
           $("html, body").animate({ scrollTop: 0 }, "slow");
    }

    getDirectFormData = () => {
        return $('#editSubscriptionForm').serializeArray().reduce(function(obj, item) {

            if(item.name.match(/\[(.*)\]$/) == null)
               obj[item.name] = item.value;
               return obj;

        }, {});
    }

    getObjectFormData = (ObjectName) => {
      return  $(`:input[name^=${ObjectName}]`).get().reduce(function(acc, ele) {
          try{
              let key = ele.name.match(/\[(.*)\]$/)[1];
               acc[key] = ele.value;
               return acc;
          }catch(TypeError){
              console.log(TypeError);
              return;
          }
      }, {});
    }

    getFormData = () => {
        let formData = this.getDirectFormData();
        formData["insured"] = this.getObjectFormData("insured");
        formData["insuranceInsuredIdentificationDocuments"] = this.getObjectFormData("insuranceInsuredIdentificationDocuments");
        console.log(formData);
        return formData;
    }


    render(){
        const two_options = ["Oui", "Non"];
        const contracts = ["Contract 1", "Contract 2", "Contract 3"];
        const commerciaux = ["Commercial1", "Commericial2", "Commercial3"];
        const documents = ["Photo client","CNI","CNPS","Extrait de naissance","Questionnaire médical"];
        let beneficiaries_components = [];
        if(this.state.beneficiaries_count >= 1) {
            for (let i = 1; i <= this.state.beneficiaries_count; i++) {
                beneficiaries_components.push(<Beneficiary id={i}/>);
            }
        }
        return (
            <div style={{backgroundColor:'lightgray'}}>
                <div className="container" style={{backgroundColor:'lightgray', marginLeft:'15%', marginRight:'0%', padding:'1%', width:'85%',height:'100%'}}>
                    <div className="row-flex">
                    <h2>Nouvelle souscription: <span>Particulier</span>
                    </h2>{this.statusMessageContainer()}
                    </div>
                    <form method="POST"  onSubmit={this.handleSubmit} id={"editSubscriptionForm"}>
                    <fieldset>
                        <legend>Information du client</legend>
                        <div className="row col-12">
                            <div className="col-sm-6">
                                <FieldLabel field="input" name="insured[last_name]" id="insured[last_name]" label="Nom" errormsg="Ce champ est obligatoire" ref_required/>
                                <FieldLabel field="input" name="insured[first_name]" id="insured[first_name]" label="Prénom" errormsg="Ce champ est obligatoire"  />
                                <FieldLabel field="input" name="insured[dob]" id="insured[dob]" label="Date de naissance" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="insured[mobile_2]" id="insured[mobile_2]" label="Numero de téléphone" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="insured[email]" id="insured[email]" label="Email" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="insured[city]" id="insured[city]" label="Ville de résidence" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="insured[country]" id="insured[country]" label="Pays de résidence" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="insured[place_of_birth]" id="insured[place_of_birth]" label="Ville de naissance" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="insured[country_of_birth]" id="insured[country_of_birth]" label="Pays de naissance" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="nationality" id="nationality" label="Nationalité" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="cni_number" id="cni_number" label="Numero CNI" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="cmu_number" id="numero_cmu" label="Numero CMU" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="cnps_number" id="numero_cnps" label="Numero CNPS" errormsg="Ce champ est obligatoire" />
                            </div>
                            <div className="col-sm-6">
                                <label>Document(s):</label>
                                <div style={{border:'3px solid #1d1d1d'}}>
                                    <center><img src={ImgProfile} style={{height:'200px', marginTop:'-5%'}} /></center>
                                    <div className="form-group"><label style={{margin:'8px'}}><i className="fa fa-close" style={{color:'red'}}></i> Photo client</label>
                                    <div className="form-group"><label style={{margin:'8px'}}><i className="fa fa-close" style={{color:'red'}}></i> CNI</label></div>
                                    <div className="form-group"><label style={{margin:'8px'}}><i className="fa fa-close" style={{color:'red'}}></i> CNPS</label></div>
                                    <div className="form-group"><label style={{margin:'8px'}}><i className="fa fa-close" style={{color:'red'}}></i> Extrait de naissance</label></div>
                                    <div className="form-group"><label style={{margin:'8px'}}><i className="fa fa-close" style={{color:'red'}}></i> Questionnaire médical</label></div>
                                    <div style={{borderStyle:'dashed',backgroundColor:'HoneyDew', padding:'20px', margin:'20px', borderRadius:'11px'}}>
                                        <FieldLabel field="select" name="documents" id="documents" label="Document:" options={documents} errormsg="" />
                                        <div className="form-group row-flex">
                                            <FieldLabel field="file" name="insuranceInsuredIdentificationDocuments[]" id="insuranceInsuredIdentificationDocuments" label="insuranceInsuredIdentificationDocuments" />
                                            <div><button type="button" className="mt-5" style={{marginTop:'5%', marginLeft:'70%'}}>Charger</button></div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Contrat client</legend>
                        <div className="row col-12">
                            <div className="col-sm-6">
                                <FieldLabel field="select" name="contractId" id="contractId" label="Contrat" errormsg="Ce champ est obligatoire" options={contracts} ref_required/>
                                <FieldLabel field="select" name="commercialId" id="commercialId" label="Commercial" errormsg="Ce champ est obligatoire" options={commerciaux} />
                                <FieldLabel field="inputHidden" name="dateCreation" id="dateCreation"  value={this.currentDate()} label="Date de debut" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="dateDebut" id="dateDebut" label="Date de debut" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="dateFin" id="dateFin" label="Date de fin" errormsg="Ce champ est obligatoire" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Tarif</legend>
                        <div className="row col-12">
                            <div className="col-sm-6">
                                <FieldLabel field="input" name="bonus" id="bonus" label="Prime par personne Fcfa" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="over_bonus" id="over_bonus" label="Surprime %" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="additional_child_bonus" id="additional_child_bonus" label="Prime supplémentaire/enfant" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="discount" id="discount" label="Réduction %" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="annual_net_bonus" id="annual_net_bonus" label="Prime net annuelle Fcfa " errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="taxes" id="taxes" label="Taxes" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="accessories" id="accessories" label="Accessoires" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="bonus_incl_tax" id="bonus_incl_tax" label="Prime TTC" errormsg="Ce champ est obligatoire" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Alerte</legend>
                        <div className="row col-12">
                            <div className="col-sm-6">
                                <FieldLabel field="input" name="spending_per_person" id="spending_per_person" label="Dépense par personne" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="input" name="spending_per_family" id="spending_per_family" label="Dépense par famille" errormsg="Ce champ est obligatoire" />
                                <FieldLabel field="select" name="repeated_similar_intervention" id="repeated_similar_intervention" label="Répetition intervention similaire" options={two_options} errormsg="Ce champ est obligatoire" />
                            </div>
                        </div>
                    </fieldset>
                    <div className="col-12">
                        <div id="beneficiaries_block">
                            {beneficiaries_components}
                        </div>
                        <div className="form-group">
                            <div className="row-flex">
                                <Link onClick={() => {++this.state.beneficiaries_count; window.scrollTo(0,document.body.scrollHeight);}}>
                                    <h3>
                                        <i className="fa fa-plus-circle" style={{color:'#3b5998'}}></i> Ajouter un bénéficiare
                                    </h3>
                                </Link>
                                {beneficiaries_components.length > 0 &&
                                <Link onClick={() => {--this.state.beneficiaries_count}} style={{marginLeft:'25%', color:'red'}}>
                                    <h3>
                                        <i className="fa fa-times-circle" ></i> Retirer
                                    </h3>
                                </Link>
                                }
                            </div>
                        </div>

                    </div>
                    <div className="col-6 row-flex ml-5" style={{marginLeft:'20%'}}>
                        <button type="button" className="btn btn-warning"
                                style={{width: '300px', fontWeight: 'bold', backgroundColor:'red', color:'black'}}>
                            <i className="fa fa-times"></i> Annuler
                        </button>
                        <button type="submit" className="btn btn-warning"
                                style={{width: '300px', fontWeight: 'bold', backgroundColor:'yellow', color:'black'}}>
                            <i className="fa fa-save"></i> Enregistrer
                        </button>
                        <button type="button" className="btn btn-info"
                                style={{width: '300px', fontWeight: 'bold', backgroundColor:'aqua', color:'black'}}>
                            <i className="fa fa-print"></i> Enregistrer et imprimer
                        </button>
                        <button type="button" className="btn btn-warning"
                                style={{width: '300px', fontWeight: 'bold', backgroundColor:'green', color:'black'}}>
                            <i className="fa fa-flag-checkered"></i> Conclure
                        </button>

                    </div>
                    </form>
                    </div></div>);
    }
}