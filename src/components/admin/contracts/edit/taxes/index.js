import React, {Component} from "react";
import { FieldLabel } from "../../../fields/field-label";
import {FieldLabelGroup} from "../../../fields/field-label-group";
import PageController from "../../../page-controller";
export default class Taxes extends PageController {

    constructor(props){
        super(props);
        this.state = {NoTarifs:1}
    }


    appendTarif = () => {
        this.setState({NoTarifs:++this.state.NoTarifs});
    }
    removeTarif = () => {
        this.setState({NoTarifs:--this.state.NoTarifs});
    }
    tarifList = () => {
        let i=1;
        let items = [];
        for(i=1; i<this.state.NoTarifs; i++){
            items.push (<FieldLabelGroup fields={this.tarif_solo} label="Tarif solo" width="200px"  /> );
        }
        return items;
    }

    automatic_response = [
        {id:1, name:"Oui"},
        {id:2, name:"Non"}
    ];

    objectToOptions = (obj) => {
        let tab = [];
        if(obj != undefined){
            obj.forEach(function(item){
                tab[item.id] = item.name;
            });
        }
        return tab;
    }

    heure_debut = [{type:"input", name:"heureDebut", value:"", id:"heureDebut", width:"150px"},
        {type:"label", name:"", value:"heure(s)", id:""},
        {type:"input", name:"minDebut", value:"", id:"minDebut", width:"150px"},
        {type:"label", name:"", value:"min(s)", id:""}
    ];

    heure_fin = [{type:"input", name:"heureFin", value:"", id:"heureFin", width:"150px"},
        {type:"label", name:"", value:"heure(s)", id:""},
        {type:"input", name:"minFin", value:"", id:"minFin", width:"150px"},
        {type:"label", name:"", value:"min(s)", id:""}
    ];

    tarif_solo = [
        {type:"label", name:"", value:"Age", id:""},
        {type:"input", name:"ageDebut", value:"", id:"ageDebut", width:"100px"},
        {type:"input", name:"ageFin", value:"", id:"ageFin", width:"100px"},
        {type:"label", name:"", value:"ans", id:"age_debut", width:"100px"},
        {type:"input", name:"tarifSolo", value:"", id:"tarifSolo", width:"200px"},
        {type:"label", name:"", value:"F cfa", id:"tarif_cost", width:"200px"},
        {type:"button", btnType:"button", name:"remover", btnAction:"default", value:<i className='fa fa-times'></i>, action:function(params){
                params.btnAction = "remover";
            }, style:{width:'60px'}, className:'btn btn-default'}
    ]

    render() {
        return (<>
            <fieldset>
                <legend>Effectif</legend>
                <div className="col-12">
                    <FieldLabel field="input" name="totalFamily" id="totalFamily" label="Effectif famille" errormsg="" width="200px"/>
                    <FieldLabel field="input" name="childAgeLimit" id="childAgeLimit" label="Limite d'âge enfant" errormsg="" width="200px" />
                    <FieldLabel field="input" name="ageLimit" id="ageLimit" label="Limite d'âge" errormsg="" width="200px" />
                </div>
            </fieldset>
            <fieldset>
                <legend>Effectif préalable</legend>
                <div className="col-12">
                    <FieldLabel field="radio" name="automaticResponse" id="automaticResponse" label="Réponse automatique" errormsg="" width="200px" options={this.objectToOptions(this.automatic_response)} selected="Oui"/>
                    <FieldLabel field="input" name="waitingResponse" id="waitingResponse" label="Temps de réponse" errormsg="" width="200px"/>
                    <FieldLabel field="radio" name="absenceAutomaticResponse" id="absenceAutomaticResponse" label="Réponse automatique absence" width="200px" errormsg="" options={this.objectToOptions(this.automatic_response)} selected="Non"  />
                    <FieldLabel field="input" name="absenceWaitingResponse" id="absenceWaitingResponse" label="Temps de réponse absence" width="200px" errormsg=""/>
                    <FieldLabelGroup fields={this.heure_debut} label="Heure début" width="200px"  />
                    <FieldLabelGroup fields={this.heure_fin} label="Heure fin" width="200px" />
                </div>
            </fieldset>
            <fieldset>
                <legend>Tarifs</legend>
                <div className="col-12">
                    {this.tarifList()}
                    <button className="btn btn-facebook" type="button" onClick={() => {this.appendTarif()}}><i className="fa fa-plus"></i></button>&nbsp;<label>Ajouter une nouvelle classe d'âge</label>
                </div>
            </fieldset>
            <fieldset>
                <legend>Tarif famille</legend>
                <div className="col-12">
                    <FieldLabel field="radio" label="Tout unique famille" name="uniqueFamily" options={this.objectToOptions(this.automatic_response)}  width="10%" selected="Non" />
                    <FieldLabel field="input" label="Montant tarif unique famile" name="uniqueFamilyCost"  width="20%"  />
                    <FieldLabel field="input" label="Réduction famille sur tout le groupe (%)" name="deductionFamilyGroup" width="10%"  />
                    <FieldLabel field="radio" label="Tarif unique enfant supplémentaire" name="moreChild" options={this.objectToOptions(this.automatic_response)} width="10%" selected="Oui"  />
                    <FieldLabel field="input" label="Montant tarif unique enfant supplémentaire (F cfa)" name="moreChildCost"   width="20%"  />
                    <FieldLabel field="input" label="Réduction enfant supplémentaire (%)" name="moreChildCostDeduction"  width="10%"  />
                </div>
            </fieldset>

            <fieldset>
                <legend>Accessoires</legend>
                <div className="col-12">
                    <FieldLabel field="radio" label="Accéssoire par acte" name="actAccessories" options={this.objectToOptions(this.automatic_response)} width="10% "  selected="Non"  />
                    <FieldLabel field="input" label="Montant accéssoire par acte (F cfa)" name="actAccesoriesCost" width="20%"   />
                    <FieldLabel field="radio" label="Accéssoire par personne" name="personAccessories" options={this.objectToOptions(this.automatic_response)} width="10%"  selected="Oui"  />
                    <FieldLabel field="input" label="Montant accéssoire par personne (F cfa)" name="personAccessoriesCost" width="20%"  />
                </div>
            </fieldset>
            <fieldset>
                <legend>Taxes:</legend>
                <div className="col-12">
                    <FieldLabel field="input" label="Taux taxes (%)" name="taxeRate" width="10%" />
                </div>
            </fieldset>
            <fieldset>
                <legend>Réassurance:</legend>
                <div className="col-12">
                    <FieldLabel field="input" label="Taux réassurance (%)" name="reinsuranceRate" width="10%" />
                </div>
            </fieldset>
        </>);
    }
}
