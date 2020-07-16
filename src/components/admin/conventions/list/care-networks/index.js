import React, {Component} from "react";
import {AdminAPI} from "../../../../../api";
import {AgGridReact} from "ag-grid-react";
import {FieldLabelGroup} from "../../../fields/field-label-group";

export default class CareNetworks extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: true, carenetwork_data: [], contract_data:[], error: ''};

    }
    componentDidMount() {
        this.careNetworkData();
        console.log(this.state.carenetwork_data);
    }

    careNetworkData = () => {
        AdminAPI.get('care_networks')
            .then(res => {
                this.setState({loading: false, carenetwork_data: res.data, error: ''});
            }, error => {
                this.setState({
                    loading: false,
                    carenetwork_data: null,
                    error: "An error occurred"
                });
                console.log(error.message);
            });
    }
    buttonRenderer = () => {
        return (<><button className="btn btn-success"><i className="fa fa-eye"></i> Afficher</button> </>)
    }

    onBtnClick = (el) => {
        return null;
    }

    table_header = [
        {headerName:"Id", field:"id", width:70, resizable:true},
        {headerName:"Nom", field:"name", width:400, resizable:true},
        {headerName:"Effectif", field:"", width:200, resizable:true},
        {headerName:"Date de création", field:"date_creaton", width:250, resizable:true},
        {headerName:"Statut", field:"status", width:250, resizable:true},
        {headerName:"", cellRenderer:'buttonRenderer', cellRendererParams: {
                onClick: this.onBtnClick.bind(this),
                label: 'Afficher'
            }, width:150, resizable:true, buttons:true}
    ];

    fieldsSearchFields =  [
        {type:"label", name:"", value:"Nom"},
        {type:"input", name:"name", value:"", id:"name", width:"150px"},
        {type:"label", name:"", value:"Date de création", id:""},
        {type:"input", name:"date_creation", value:"", id:"date_creation", width:"150px"},
        {type:"label", name:"", value:"Statut", id:""},
        {type:"select", name:"status", value:"", options:["Inactif","Actif","En attente","Brouillon"]},
        {type:"button", btnType:"button", name:"", value:"rechercher", className:"btn btn-primary fa fa-search" }
    ];


    render(){
        return (<div className="row m-10" style={{marginLeft:'15%'}}>
            <h2 style={{marginLeft:'0%', fontWeight:'500'}}>Réseau de soin</h2>
            <div className="form-group-lg m-5">
                <button className="btn btn-success" style={{backgroundColor:'green', color:'white'}} onClick={()=>{document.location="/admin/conventions/care-networks-edit"}}>Créer un nouveau réseau de soin</button>
            </div>
            <div className="ag-theme-alpine" style={ {height:'200px', width: '65%', backgroundColor:'lightgray'} }>
                <AgGridReact
                    columnDefs={this.table_header}
                    rowData={this.state.carenetwork_data}>
                </AgGridReact>
            </div>
        </div>);
    }


}



