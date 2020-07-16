import React,{Component} from 'react';
import { AgGridReact } from 'ag-grid-react';
import EditSubscription from "../edit-subscription";
import DetailsSubscription from "../subscription-details";
import './subscriptions.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default class Subscriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentswitch:'table',
            columnDefs: [
                {
                    headerName:'Numéro contrat',
                    field: 'numero_contrat',
                    minWidth: 100,
                    checkboxSelection: function(params) {
                        return params.columnApi.getRowGroupColumns().length === 0;
                    },
                    headerCheckboxSelection: function(params) {
                        return params.columnApi.getRowGroupColumns().length === 0;
                    },
                },
                ,
                {
                    headerName: "Date d'écheance",
                    field: "date_echeance",
                    filter:"agDateColumnFilter",
                    filterParams:{

                        comparator: function (filterLocalDateAtMidnight, cellValue) {
                            var dateAsString = cellValue;
                            if (dateAsString == null) return 0;

                            // dd/mm/yyyy
                            var dateParts = dateAsString.split("/");
                            var day = Number(dateParts[2]);
                            var month = Number(dateParts[1]) - 1;
                            var year = Number(dateParts[0]);
                            var cellDate = new Date(day, month, year);

                            if (cellDate < filterLocalDateAtMidnight) {
                                return -1;
                            } else if (cellDate > filterLocalDateAtMidnight) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    },
                    maxwidth: 150
                },
                {
                    headerName: "Raison sociale",
                    field: "raison_sociale",
                    filter:"agTextColumnFilter",
                    width: 320
                },
                {
                    headerName: "Numéro de contrat",
                    field: "numero_contrat",
                    filter:"agTextColumnFilter",
                    width: 320
                },
                {
                    headerName: "Collège",
                    field: "college",
                    filter:"agTextColumnFilter",
                    width: 150
                },
                {
                    headerName: "Nom",
                    field: "nom",
                    filter:"agTextColumnFilter",
                    width: 200
                },
                {
                    headerName: "Prénoms",
                    field: "prenoms",
                    filter:"agTextColumnFilter",
                    width: 250
                },
                {
                    headerName: "Type",
                    field: "types",
                    filter:"agTextColumnFilter",
                    width: 200
                },
                {
                    headerName: "Composition",
                    field: "composition",
                    filter:"agTextColumnFilter",
                    width: 250
                },
            ],
            autoGroupColumnDef: {
                headerName: 'Group',
                minWidth: 170,
                field: 'numero_contrat',
                valueGetter: function(params) {
                    if (params.node.group) {
                        return params.node.key;
                    } else {
                        return params.data[params.colDef.field];
                    }
                },
                headerCheckboxSelection: true,
                cellRenderer: 'agGroupCellRenderer',
                cellRendererParams: { checkbox: true },
            },
            defaultColDef: {
                editable: false,
                enableRowGroup: false,
                enablePivot: false,
                enableValue: true,
                sortable: true,
                resizable: true,
                filter: true,
                flex: 1,
                minWidth: 100,
            },
            rowSelection: 'multiple',
            rowGroupPanelShow: 'always',
            pivotPanelShow: 'always',
            rowData: [],
        };
    }
    componentDidMount() {
        this.loadTableData();
    }



    loadTableData = () => {
        const t_data = [
            {

                "date_echeance": "31/12/2020",
                "numero_contrat": "222",
                "raison_sociale": "Aeria",
                "college": "college 1",
                "nom": "",
                "prenoms": "",
                "types": "Entreprise",
                "composition": ""
            },
            {
                "date_echeance": "31/12/2020",
                "numero_contrat": "3333",
                "raison_sociale": "PARTICULIER",
                "college": "",
                "nom": "Koffi",
                "prenoms": "Guillaume",
                "types": "Particulier",
                "composition": "famille"
            },
            {
                "date_echeance": "31/12/2020",
                "numero_contrat": "3333",
                "raison_sociale": "PARTICULIER",
                "college": "",
                "nom": "Koffi",
                "prenoms": "Eddy",
                "types": "Particulier",
                "composition": "famille"
            },
            {
                "date_echeance": "31/12/2020",
                "numero_contrat": "4444",
                "raison_sociale": "PARTICULIER",
                "college": "",
                "nom": "CIEL",
                "prenoms": "Roger",
                "types": "Particulier",
                "composition": "solo"
            },
            {
                "date_echeance": "31/12/2020",
                "numero_contrat": "222",
                "raison_sociale": "Aeria",
                "college": "college 1",
                "nom": "",
                "prenoms": "",
                "types": "Particulier",
                "composition": ""
            },
            {
                "date_echeance": "31/12/2020",
                "numero_contrat": "3333",
                "raison_sociale": "PARTICULIER",
                "college": "",
                "nom": "Koffi",
                "prenoms": "Guillaume",
                "types": "Particulier",
                "composition": "famille"
            },
            {
                "date_echeance": "31/12/2020",
                "numero_contrat": "222",
                "raison_sociale": "Aeria",
                "college": "college 1",
                "nom": "",
                "prenoms": "",
                "types": "Entreprise",
                "composition": ""
            },
            {
                "date_echeance": "31/12/2020",
                "numero_contrat": "3333",
                "raison_sociale": "PARTICULIER",
                "college": "",
                "nom": "Koffi",
                "prenoms": "Guillaume",
                "types": "Particulier",
                "composition": "famille"
            },
            {
                "date_echeance": "31/12/2020",
                "numero_contrat": "3333",
                "raison_sociale": "PARTICULIER",
                "college": "",
                "nom": "Koffi",
                "prenoms": "Eddy",
                "types": "Particulier",
                "composition": "famille"
            },
            {
                "date_echeance": "31/12/2020",
                "numero_contrat": "4444",
                "raison_sociale": "PARTICULIER",
                "college": "",
                "nom": "CIEL",
                "prenoms": "Roger",
                "types": "Particulier",
                "composition": "solo"
            },
            {
                "date_echeance": "31/12/2020",
                "numero_contrat": "222",
                "raison_sociale": "Aeria",
                "college": "college 1",
                "nom": "",
                "prenoms": "",
                "types": "Particulier",
                "composition": ""
            },
            {
                "date_echeance": "31/12/2020",
                "numero_contrat": "3333",
                "raison_sociale": "PARTICULIER",
                "college": "",
                "nom": "Koffi",
                "prenoms": "Guillaume",
                "types": "Particulier",
                "composition": "famille"
            }
        ];
        return t_data;
    }



    loadContractInfo = (id) => {
        return {
            "info_generale" : {
                "date_debut": "02/04/2018",
                "date_fin": "31/12/2020",
                "numero_contrat": "222",
                "raison_sociale": "Aeria",
                "college": "college 1",
                "nom": "",
                "prenoms": "",
                "types": "Entreprise",
                "composition": "famille",
                "adresse_geographique":"Abidjan, Plateau, Cote d'Ivoire",
                "boite":"BPV 252",
                "telephone":"+22520222315",
                "email":"info@conseil-cafecacao.ci",
                "rccm":"CI-ABJ-23555431",
                "ncc": "194567T",
                "cnps":"NT-193194567",

            },
            "entreprise": {
                "effectif_salaries":"250",
                "effectif_total":"250",
                "effectif_famille":"150",
                "effectif_solo":"100",
                "effectif_supplementaire":"0",
            },
            "tarif": {
                "prime_personne":"250000",
                "surprime":"120000",
                "prime_supplementaire":"45000",
                "reduction":"20000",
                "prime_nette_annuelle":"110000",
                "taxes":"14500",
                "accessoires":"0",
            }

        };

    }




    displayForm = (prp) => {
        return (
            <div className="col-sm-10 widget-container p-10" >
                <h1><a href="#" className="arrowStyle" onClick={() => {this.switchContentState("table")}} ><b><i className="fa fa-arrow-left"></i></b></a>
                    &nbsp;&nbsp;&nbsp;
                    Souscription entreprise
                </h1>
                <EditSubscription f_data={prp} />
            </div>
        );
    }
    displayDetails = (prp) => {
        return (
            <div className="col-sm-10 widget-container p-10" >
                <h1><a href="#" className="arrowStyle" onClick={() => {this.switchContentState("table")}} ><b><i className="fa fa-arrow-left"></i></b></a>
                    &nbsp;&nbsp;&nbsp;
                    Souscription entreprise
                </h1>
                <DetailsSubscription f_data={prp} />
                <div className="row col-12">
                    <div className="form-group ">
                        <button className="btn btn-success btn-lg m-10" style={{width:'100%'}}  onClick={() => {this.switchContentState("formedit")}}><i className="fa fa-refresh"></i> Renouveller</button>
                    </div>
                </div>
            </div>
        );
    }
    switchContentState = (content_type) => {
        this.setState({contentswitch:content_type});
        console.log(this.state);
    }

    deleteContract = (id) => {
        /*

        CODE RESERVED FOR AXIOS DELETE TO WEBSERVICE

         */
    }

    displayTable = () => {
        let t_data = this.loadTableData();

        return (
            <div className="col-sm-10 widget-container p-10" >
                <h2>Souscriptions</h2>
                <form onSubmit={this.formSubmit}>
                    <div className="table-responsive">
                        <div className="ag-theme-alpine" style={{width:'100%', height:'600px'}}>
                            <AgGridReact
                                rowData={t_data}
                                columnDefs={this.state.columnDefs}
                                autoGroupColumnDef={this.state.autoGroupColumnDef}
                                defaultColDef={this.state.defaultColDef}
                                suppressRowClickSelection={true}
                                groupSelectsChildren={true}
                                debug={true}
                                rowSelection={this.state.rowSelection}
                                rowGroupPanelShow={this.state.rowGroupPanelShow}
                                pivotPanelShow={this.state.pivotPanelShow}
                                enableRangeSelection={true}
                                pagination={true}
                                onGridReady={this.onGridReady}>
                            </AgGridReact>
                        </div>

                        <div className="rowFlex col-12">
                            <button className="btn btn-primary col-3 btnStyle"  type="button" onClick={() => {this.switchContentState("display")}}><i className="fa fa-eye"></i> Afficher</button>
                            <button className="btn btn-success col-3 btnStyle"  type="button" onClick={() => {this.switchContentState("form")}}><i className="fa fa-plus"></i> Ajouter</button>
                            <button className="btn btn-warning col-3 btnStyle"  type="button" onClick={() => {this.switchContentState("formedit")}}><i className="fa fa-edit"></i> Editer</button>
                            <button className="btn btn-danger col-3 btnStyle"  type="button" onClick={() => this.deleteContract}><i className="fa fa-trash-o"></i> Résilier</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }



    render () {
        if(this.state.contentswitch == "table")
            return this.displayTable();
        else if(this.state.contentswitch == "form")
            return this.displayForm(null);
        else if(this.state.contentswitch == "formedit") {
            return this.displayForm(this.loadContractInfo(
                //  document.getElementById("checkbox1").value
                "id1"
            ))
        }
        else if(this.state.contentswitch == "display") {
            return this.displayDetails(this.loadContractInfo(
                //  document.getElementById("checkbox1").value
                "id1"
            ))
        }
        return;
    }


}

