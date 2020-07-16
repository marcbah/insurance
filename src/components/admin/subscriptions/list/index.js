import React, {Component} from 'react';
import {AgGridReact} from "ag-grid-react";
import {Link} from "react-router-dom";
import '../../../../assets/css/admin.css';
import {FieldLabelGroup} from '../../fields/field-label-group';
import '../subscriptions.css';
export default class SubscriptionsList extends Component{
    constructor(props) {
        super(props);
        this.state = {loading: true, data: [], error: ''};
    }

    searchFieldsIndividuals1 =  [
        {type:"label", name:"", value:"Numéro contrat"},
        {type:"input", name:"number", value:"", id:"number", style:{width:'10%', marginLeft:'4px', marginRight:'10px'}},
        {type:"label", name:"", value:"Nom"},
        {type:"input", name:"name", value:"", id:"name", style:{width:'10%', marginLeft:'4px', marginRight:'10px'}},
        {type:"label", name:"", value:"Contrat", id:""},
        {type:"input", name:"contrat", value:"", id:"contrat", style:{width:'10%', marginLeft:'4px', marginRight:'10px'}},
        {type:"label", name:"", value:"Composition", id:""},
        {type:"input", name:"composition", value:"", id:"composition",style:{width:'10%', marginLeft:'4px', marginRight:'10px'}}
    ];
    searchFieldsIndividuals2 = [
        {type:"label", name:"", value:"Date de création", id:""},
        {type:"input", name:"date_creation", value:"", id:"date_creation", style:{width:'10%', marginLeft:'4px', marginRight:'10px'}},
        {type:"label", name:"", value:"Prénom", id:""},
        {type:"input", name:"surname", value:"", id:"surname",  style:{width:'10%', marginLeft:'4px', marginRight:'10px'}},
        {type:"label", name:"", value:"Commercial"},
        {type:"input", name:"commercial", value:"", id:"commercial",  style:{width:'10%', marginLeft:'4px', marginRight:'10px'}},
        {type:"button", btnType:"button", name:"", value:"rechercher", className:"btn btn-primary fa fa-search", style:{backgroundColor:'green'} }
    ];
    searchFieldsCompanies1 =  [
        {type:"label", name:"", value:"Numéro contrat"},
        {type:"input", name:"number", value:"", id:"number",  style:{width:'10%', marginLeft:'4px', marginRight:'10px'}},
        {type:"label", name:"", value:"Nom"},
        {type:"input", name:"name", value:"", id:"name",  style:{width:'10%', marginLeft:'4px', marginRight:'10px'}},
        {type:"label", name:"", value:"Contrat", id:""},
        {type:"input", name:"contrat", value:"", id:"contrat",  style:{width:'10%', marginLeft:'4px', marginRight:'10px'}}

    ];
    searchFieldsCompanies2 = [
        {type:"label", name:"", value:"Date de création", id:""},
        {type:"input", name:"date_creation", value:"", id:"date_creation",  style:{width:'10%', marginLeft:'4px', marginRight:'10px'}},
        {type:"label", name:"", value:"Prénom", id:""},
        {type:"input", name:"surname", value:"", id:"surname",  style:{width:'10%', marginLeft:'4px', marginRight:'10px'}},
        {type:"label", name:"", value:"Commercial"},
        {type:"input", name:"commercial", value:"", id:"commercial",  style:{width:'10%', marginLeft:'4px', marginRight:'10px'}},
        {type:"button", btnType:"button", name:"", value:"rechercher", className:"btn btn-primary fa fa-search", style:{backgroundColor:'green'} }
    ];
    /*
    LES DONNEES SONT PROCUREES EN DUR ETANT DONNE QUE NOUS N'AVONS PAS ENCORE DEFINIT DE STRUCTURE
    DE DONNEES POUR LES SOUSCRIPTIONS
     */

    headSubscriptionsIndividuals = [
        {headerName:"No", field:"susbscription_number", width:50, resizable:true, },
        {headerName:"Nom", field:"name",  width:150,resizable:true},
        {headerName:"Prenoms", field:"surname", width:150,resizable:true},
        {headerName:"Date de création", field:"creation_date", width:120, resizable:true},
        {headerName:"Date d'échéance", field:"expiry_date", width:120, resizable:true},
        {headerName:"Contrat", field:"contrat", resizable:true},
        {headerName:"Commercial", field:"commercial",width:120, resizable:true},
        {headerName:"Composition", field:"composition",width:120, resizable:true},
        {headerName:"Statut", field:"status", width:120, resizable:true},
        {
            headerName:"", field:"id",  cellRenderer: function(params) {
                var btn = document.createElement('button');
                btn.type="button",
                    btn.className="btn btn-success",
                    btn.innerText="Afficher",
                    btn.style="background:green",
                    btn.addEventListener('click', function (event) {
                        /*

                          ICI JE VAIS APPELER LA METHOD SELECTED DATA ET AFFICHER LES DONNEES DE LA SOUSCRIPTION

                         */
                    });
                return btn;
            }, resizable:true, buttons:true
        }
    ];
    headSubscriptionsCompanies = [
        {headerName:"No", field:"susbscription_number", width:50, resizable:true},
        {headerName:"Nom", field:"name",  resizable:true},
        {headerName:"Date de création", field:"creation_date",  resizable:true},
        {headerName:"Date d'échéance", field:"expiry_date",  resizable:true},
        {headerName:"Contrat", field:"contrat",  resizable:true},
        {headerName:"Commercial", field:"commercial",  resizable:true},
        {headerName:"Statut", field:"status",  resizable:true},
        {headerName:"", field:"id",  cellRenderer: function(params) {
                var btn = document.createElement('button');
                btn.type="button",
                    btn.className="btn btn-success",
                    btn.innerText="Afficher",
                    btn.style="background:green",
                    btn.addEventListener('click', function (event) {
                        /*
                          ICI JE VAIS APPELER LA METHOD SELECTED DATA ET AFFICHER LES DONNEES DE LA SOUSCRIPTION
                         */
                    });
                return btn;
            },  resizable:true, buttons:true}
    ];

    subscriptionsIndividuals = () => [
        {
            "susbscription_number" : "001",
            "creation_date": "24-09-2019",
            "expiry_date":"25-09-2020",
            "name": "Kouakou",
            "surname":"Pierre",
            "contract":"Basic",
            "commercial":"Courtier",
            "composition":"Famille",
            "status":"Active",
            "id":1
        },
        {
            "susbscription_number" : "002",
            "creation_date": "24-09-2019",
            "expiry_date":"25-09-2020",
            "name": "Coulibaly",
            "surname":"Axel",
            "contract":"Prestige",
            "commercial":"Courtier",
            "composition":"Famille",
            "status":"Proposition",
            "id":2
        },
        {
            "susbscription_number" : "0010",
            "creation_date": "24-09-2019",
            "expiry_date":"25-09-2020",
            "name": "Kone",
            "surname":"Marie",
            "contract":"Basic",
            "commercial":"Courtier",
            "composition":"Seul",
            "status":"Résilié",
            "id":3
        },
        {
            "susbscription_number" : "0010",
            "creation_date": "24-09-2019",
            "expiry_date":"25-09-2020",
            "name": "Age",
            "surname":"Jean-marc",
            "contract":"Int",
            "commercial":"Courtier",
            "composition":"Famille",
            "status":"Active",
            "id":4
        },
        {
            "susbscription_number" : "0010",
            "creation_date": "24-09-2019",
            "expiry_date":"25-09-2020",
            "name": "Ouattara",
            "surname":"Stephane",
            "contract":"Noel",
            "commercial":"Courtier",
            "composition":"Seul",
            "status":"Résilié",
            "id":5
        }
    ];
    subscriptionsCompanies= () => [
        {
            "susbscription_number" : "001",
            "creation_date": "24-09-2019",
            "expiry_date":"25-09-2020",
            "name": "Etipack",
            "contract":"Basic",
            "commercial":"Courtier",
            "status":"Active",
            "id":1
        },
        {
            "susbscription_number" : "002",
            "creation_date": "24-09-2019",
            "expiry_date":"25-09-2020",
            "name": "CIE",
            "contract":"Prestige",
            "commercial":"Courtier",
            "status":"Proposition",
            "id":2
        },
        {
            "susbscription_number" : "0010",
            "creation_date": "24-09-2019",
            "expiry_date":"25-09-2020",
            "name": "COPACI",
            "contract":"Basic",
            "commercial":"Courtier",
            "status":"Résilié",
            "id":3
        },
        {
            "susbscription_number" : "0010",
            "creation_date": "24-09-2019",
            "expiry_date":"25-09-2020",
            "name": "Meproire",
            "contract":"Int",
            "commercial":"Courtier",
            "status":"Active",
            "id":4
        },
        {
            "susbscription_number" : "0010",
            "creation_date": "24-09-2019",
            "expiry_date":"25-09-2020",
            "name": "Brassivoire",
            "contract":"Noel",
            "commercial":"Courtier",
            "status":"Résilié",
            "id":5
        }
    ];


    render() {
        //const {loading, data, error} = this.state;
        return (
            <div className="col-10 widget-container" >
                <div style={{ marginTop:'5%'}}>
                <h2 style={{display:'block'}}>Souscriptions</h2>
                <Link className="btn btn-success m-b-20" to="/admin/subscriptions/edit" style={{backgroundColor:'green', color:'#ffffff', marginLeft:'17%'}}>
                    <span className="fa fa-plus"> Nouvelle souscription</span>
                </Link>
                </div>
                <div style={{marginLeft:'15%'}}>


                    <fieldset>
                        <legend>Liste de souscriptions</legend>
                        <div className="col-12">
                            <label>Rechercher</label>
                            <FieldLabelGroup fields={this.searchFieldsIndividuals1} label="" />
                            <FieldLabelGroup fields={this.searchFieldsIndividuals2} label=""  />
                            <div className="ag-theme-alpine subscriptions" style={ {height:'350px', width: '100%', backgroundColor:'lightgray'} }>
                                <AgGridReact
                                    columnDefs={this.headSubscriptionsIndividuals}
                                    rowData={this.subscriptionsIndividuals()}>
                                </AgGridReact>
                            </div>
                        </div>
                    </fieldset>
                    <br></br>
                    <fieldset>
                        <legend>Liste de souscriptions entreprises</legend>
                        <div className="col-12">
                            <label>Rechercher</label>
                            <FieldLabelGroup fields={this.searchFieldsCompanies1} label="" />
                            <FieldLabelGroup fields={this.searchFieldsCompanies2} label="" />
                            <div className="ag-theme-alpine subscriptions" style={ {height:'350px', width: '100%', backgroundColor:'lightgray'} }>
                                <AgGridReact
                                    columnDefs={this.headSubscriptionsCompanies}
                                    rowData={this.subscriptionsCompanies()}>
                                </AgGridReact>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
}