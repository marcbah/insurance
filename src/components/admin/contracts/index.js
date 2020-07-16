import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {AgGridReact} from "ag-grid-react";
import './contract.css'

export default class ContractsAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: true, data: [], error: ''};
    }

    componentDidMount() {
        this.loadContracts();
    }

    loadContracts = () => {
        const resData = [
            {"id":1, "name":"SRT Contrat", "pseudo":"Template", "creation_date":"24-08-2019", "care_networks": {"id":2, "name":"Prestige"}, "pharmacy_networks":{"id":1, "name":"Sylver"}, "status":"INACTIF"},
            {"id":2, "name":"Contrat basic", "pseudo":"Base", "creation_date":"02-10-2019", "care_networks": {"id":2, "name":"Prestige"}, "pharmacy_networks":{"id":2, "name":"Intermédiaire"}, "status":"ACTIF"},
            {"id":3, "name":"Contrat Int", "pseudo":"Base +", "creation_date":"09-05-2020", "care_networks": {"id":3, "name":"Intermédiaire"}, "pharmacy_networks":{"id":2, "name":"Prestige"}, "status":"INACTIF"},
            {"id":4, "name":"Contrat Prest", "pseudo":"Prestige", "creation_date":"14-06-2020", "care_networks": {"id":2, "name":"Prestige"}, "pharmacy_networks":{"id":3, "name":"Prestige"}, "status":"ACTIF"},
            {"id":5, "name":"Contrat Noel", "pseudo":"Promo", "creation_date":"20-09-2020", "care_networks": {"id":3, "name":"Intermédiaire"}, "pharmacy_networks":{"id":3, "name":"Basic +"}, "status":"DRAFT"}
        ];
        this.setState({loading: false, data: resData, error: ''});
    };

    dataHeader = [
        {headerName:"Id", field:"id",  resizable:true, width:"50"},
        {headerName:"Nom", field:"name",  resizable:true},
        {headerName:"Pseudo", field:"pseudo",  resizable:true},
        {headerName:"Date de création", field:"creation_date",  resizable:true},
        {headerName:"Réseau de soin", field:"care_networks.name" },
        {headerName:"MAIA", field:"pharmacy_networks.name"},
        {headerName:"Status", field:"status",  cellRenderer: function(params){
                var lbl = document.createElement("label");
                  switch(params.value){
                      case 'INACTIF':
                          lbl.style="color:red";
                          lbl.innerText="Inactif";
                          break;
                      case 'ACTIF':
                          lbl.style="color:green";
                          lbl.innerText="Actif";
                          break;
                      case 'DRAFT':
                          lbl.style="color:orange";
                          lbl.innerText="Brouillon";
                          break;
                      default:
                          lbl.style="color:red";
                          lbl.innerText="Inactif";
                  }
                      return lbl;
                    }},
        {headerName:"", field:"id", cellRenderer: function(params) {
                var btn = document.createElement('button');
                btn.type="button",
                    btn.className="btn btn-success",
                    btn.innerText="Afficher",
                    btn.style="background:green",
                    btn.addEventListener('click', function (event) {
                        /*   CECI EST L'ID avec lequel je vais faire un call axios {"/contracts/"+params.value} */
                        console.log(params.value);
                    });
                return btn;
            }, width:100, resizable:false, buttons:true}
    ];




        render() {
        const {loading, data, error} = this.state;

        return (
            <div className="col-10 widget-container"  >
                <div style={{marginLeft:'20%', marginTop:'7%'}}>
                    <h3>Liste des contrats</h3>
                    <Link className="btn btn-success m-b-20" to="/admin/contracts/edit" style={{backgroundColor:"green", color:"white"}}>
                        <span className="fa fa-plus"> Nouveau contract</span>
                    </Link>
                    {loading && <div>Loading ...</div>}
                    {!loading && error && <div className="m-10"><span className="text-danger">{error}</span></div>}
                    <div className="ag-theme-alpine contract">
                        <AgGridReact
                            columnDefs={this.dataHeader}
                            rowData={data}
                        >
                        </AgGridReact>
                </div>
                    </div>
                </div>
        );
    }
}

