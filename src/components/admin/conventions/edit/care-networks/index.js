import React, {Component} from "react";
import {AgGridReact} from "ag-grid-react";
import {AdminAPI} from '../../../../../api';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {FieldLabel} from "../../../fields/field-label";
import {FieldLabelGroup} from "../../../fields/field-label-group";
export default class CareNetworkEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            hospitals_data: [],
            laboratories_data: [],
            pharmacies_data: [],
            selected_providers: [],
            error: '',
            gridOptions: {
                columnDefs: [
                    {headerName: "Nom", field: "name"},
                    {headerName: "Type", field: "type"},
                    {headerName: "Matricule", field: "registration_number"},
                    {headerName: "Pays", field: "country"}, /* , cellRenderer: 'insuredPictureRenderer' */
                    {headerName: "Ville", field: "city"}, /* , cellRenderer: 'insuredQrCodeRenderer' */
                    {headerName: "Quartier", field: "address"},
                    {headerName: "", field:"id", cellRenderer: function(params) {
                            var input = document.createElement('input');
                            input.type="checkbox";
                            input.addEventListener('click', function (event) {
                                /*

                                  ICI JE VAIS APPELER LA METHOD SELECTED DATA ET AJOUTER DANS L'AUTRE LISTE
                                  QUAND LE BOUTTON AJOUTER SERA CLIQUE

                                 */
                            });
                            return input;
                        } }
                ],
                defaultColDef: {
                    editable: false,
                    sortable: true,
                    resizable: true,
                    filter: true,
                    flex: 1,
                    minWidth: 100,
                    rowSelection: "multiple"
                },
                /*frameworkComponents: {
                    insuredPictureRenderer: InsuredPictureRenderer,
                    insuredQrCodeRenderer: InsuredQrCodeRenderer,
                },*/
                rowHeight: 50,
            },
        };
    }

    componentDidMount() {
        this.loadData("hospitals");
        this.loadData("laboratories");
        this.loadData("pharmacies");
        this.setState({loading:false, selected_providers:this.selectedProviders});
    }

    feedGlobalData(currentObj, ctype){
        let global_data = [];
        currentObj.map(function(val, i){
            val.type = ctype;
            global_data.push(val);
        });
        return global_data;
    }

    loadData = (ctype) => {
        AdminAPI.get(ctype)
            .then(res => {
                switch(ctype){
                    case 'hospitals':
                        this.setState({loading: false, hospitals_data: res.data, error: ''});
                        this.setState({loading: false, hospitals_data:this.feedGlobalData(this.state.hospitals_data, "Hopital"), error: ''});
                        break;
                    case 'laboratories':
                        this.setState({loading: false, laboratories_data: res.data, error: ''});
                        this.setState({loading: false, laboratories_data:this.feedGlobalData(this.state.laboratories_data, "Laboratoires"), error: ''});
                        break;
                    case 'pharmacies':
                        this.setState({loading: false, pharmacies_data: res.data, error: ''});
                        this.setState({loading: false, pharmacies_data:this.feedGlobalData(this.state.pharmacies_data, "Pharmacies"), error: ''});
                        break;
                    default:
                        this.setState({loading: false, error: 'No data'});
                }

            }, error => {
                this.setState({
                    loading: false,
                    error: "An error occurred"
                });
                console.log(error.message);
            });
    };
    /*

    Ces données seront implementées à la sélection de la ligne

     */
    selectedProviders = [
        {
            "country": "Côte d'Ivoire",
            "city": "Abidjan",
            "address": "Rue de la république Plateau",
            "contact": "string",
            "email": "string",
            "id": 1,
            "name": "Laboratoire HMA",
            "phone": "string",
            "registration_number": "L045JKLWX",
            "type":"Laboratories"
        },
        {
            "country": "Côte d'Ivoire",
            "city": "Abidjan",
            "address": "Cocody",
            "contact": "string",
            "email": "string",
            "id": 1,
            "name": "Quartier France",
            "phone": "string",
            "post_box": "string",
            "registered_address": "string",
            "trade_name": "string",
            "registration_number": "H036945PY21",
            "type":"hospitals"
        }
    ];

    nom_matricule_ville = [
        {type:"label", name:"", value:"Nom", id:""},
        {type:"input", name:"name", value:"", id:"name", width:'350px', style:{border:'1px solid #1d1d1d', width:'350px', height:'35px', borderRadius:'8px', marginRight:'12px', marginLeft:'20px'}},
        {type:"label", name:"", value:"Matricule", id:""},
        {type:"input", name:"registration_number", value:"", id:"registration_number", style:{border:'1px solid #1d1d1d', width:'350px', height:'35px', borderRadius:'8px', marginRight:'12px', marginLeft:'20px'}},
        {type:"label", name:"", value:"Ville", id:""},
        {type:"input", name:"city", value:"", id:"city",style:{border:'1px solid #1d1d1d', width:'350px', height:'35px', borderRadius:'8px', marginRight:'12px', marginLeft:'20px'}},

    ];
    type_pays_quartier = [
        {type:"label", name:"", value:"Type", id:""},
        {type:"input", name:"type", value:"", id:"name", style:{border:'1px solid #1d1d1d', width:'350px', height:'35px', borderRadius:'8px', marginRight:'12px', marginLeft:'20px'}},
        {type:"label", name:"country", value:"Pays", id:""},
        {type:"input", name:"country", value:"", id:"country", style:{border:'1px solid #1d1d1d', width:'350px', height:'35px', borderRadius:'8px', marginRight:'12px', marginLeft:'20px'}},
        {type:"label", name:"", value:"Quartier", id:""},
        {type:"input", name:"town", value:"", id:"town", width:'350px', style:{border:'1px solid #1d1d1d', width:'350px', height:'35px', borderRadius:'8px', marginRight:'12px', marginLeft:'20px'}},
        {type:"button", name:"search", value:"Rechercher", id:"search", className:"btn btn-success", style:{backgroundColor:'green'}}


    ];

    buttons = [
        {type:"button", btnType:"button", className:"btn btn-info", style:{backgroundColor:"aqua", color:"black", float:'left'}, value:"Retour"},
        {type:"button", btnType:"button", className:"btn btn-warning", style:{backgroundColor:"yellow", color:"black", float:'left', marginRight:'25%'}, value:"Version PDF"},
        {type:"button", btnType:"button", className:"btn btn-danger", style:{backgroundColor:"red", color:"black", float:'right'}, value:"Annuler"},
        {type:"button", btnType:"button", className:"btn btn-warning", style:{backgroundColor:"yellow", color:"black", float:'right'}, value:"Enregistrer"},
        {type:"button", btnType:"submit", className:"btn btn-success", style:{backgroundColor:"green", color:"black", float:'right'},  value:"Créer"}
    ];

    render() {
        let globalData = [];
        this.state.laboratories_data.map(function (val, i) {
            globalData.push(val);
        });
        this.state.pharmacies_data.map(function (val, i) {
            globalData.push(val);
        });
        this.state.hospitals_data.map(function(val, i){
            globalData.push(val);
        });

        return (
            <>
                <div className="row m-10" style={{marginLeft:'15%'}}>
                    <h2 style={{marginLeft:'0%', fontWeight:'500'}}>Nouveau réseau de soin</h2>
                    <fieldset>
                        <legend>Information sur le réseau de soin</legend>
                        <div className="col-12">
                            <FieldLabel field="input" name="nom" id="nom" label="Nom" errormsg="Ce champ est obligatoire" ref_required/>
                            <FieldLabel field="input" name="description" id="description" label="Description" errormsg=""/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Liste des prestataires du réseaux de soins</legend>
                        <div className="col-12">
                            <form method="post">
                                <label>Recherche:</label>
                                <FieldLabelGroup fields={this.nom_matricule_ville} label="" width="400px"  />
                                <FieldLabelGroup fields={this.type_pays_quartier} label="" width="400px"  />
                            </form>
                            <div className="ag-theme-alpine"
                                 style={{height: '400px', width: '100%', marginLeft: '0%', marginTop: '0%'}}>
                                <AgGridReact
                                    gridOptions={this.state.gridOptions}
                                    rowData={globalData}
                                >
                                </AgGridReact>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success" style={{backgroundColor:'green', float:'right'}}>Ajouter</button>
                                <br></br>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Prestataires sélectionnés</legend>
                        <div className="col-12">
                            <div className="ag-theme-alpine"
                                 style={{height: '350px', width: '100%', marginLeft: '0%', marginTop: '0%'}}>
                                <AgGridReact
                                    gridOptions={this.state.gridOptions}
                                    rowData={this.state.selected_providers}
                                >
                                </AgGridReact>
                            </div>

                        </div>

                    </fieldset>
                    <fieldset>

                    </fieldset>
                    <div className="form-group">
                        <FieldLabelGroup fields={this.buttons} label="" width="100%"  />
                    </div>
                </div>

            </>
        )
    }
}



