import React, {Component} from "react";
import $ from "jquery";
import 'Assets/css/admin.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import PageController from "../../../page-controller";
export default class ToggleBar extends PageController {
    constructor(props){
        super(props);
        this.state = {scrolled:false};
    }


    showToggleContent(id){
        this.setState({scrolled:!this.state.scrolled})
        if(this.state.scrolled == false)
            $("#"+id).slideDown(300);
        else
            $("#"+id).slideUp(500);
    }
    getToggleProps = () => {
        switch(this.props.content){
            case "general":
                return {title:"Générale", height:"400px", dataType:"global_intervention_cap"};
            case "hospitalisation":
                return {title:"Hospitalisation", height:"270px", dataType:"hospitalization_intervention_cap"};;
            case "dentaire":
                return {title:"Dentaire", height:"200px", dataType:"dental_intervention_cap"};
                break;
            case "optique":
                return {title:"Optique", height:"210px", dataType:"optical_intervention_cap"};
            case "maternite":
                return {title:"Maternité", height:"400px", dataType:"maternity_intervention_cap"};;
            case "extension_couverture":
                return {title:"Dentaire", height:"150px", dataType:"coverage_extension"};;
            default:
                return {title:"", height:"", dataType:"global_intervention_cap"};
        }
    }



    table_header = [
        {headerName:"", field:"title",  width:300, resizable:true},
        {headerName:"Nombre Acte par personne", field:"numberActPerson",  editable: false, width:200, resizable:true,  cellRenderer:function(params){
            /* This code fragment will be under refactoring */
            let inpt = document.createElement("input");
                inpt.name = params.colDef.field;
                inpt.placeholder = "  -";
                inpt.style = "border:1px solid lightgray;width:100%; text-align:center";
                return inpt;
            }},
        {headerName:"Taux de remboursement", field:"reimbursementRate", editable: false, width:200, resizable:false, cellRenderer: function(params){
                /* This code fragment will be under refactoring */
                let inpt = document.createElement("input");
                inpt.name = params.colDef.field;
                inpt.placeholder = "  -";
                inpt.style ="border:1px solid lightgray;width:100%; text-align:center";
                return inpt;
            }},
        {headerName:"Plafond acte (F cfa)", field:"actInterventionCap",  editable: false, width:200, resizable:false, cellRenderer: function(params){
                /* This code fragment will be under refactoring */
                let inpt = document.createElement("input");
                inpt.name = params.colDef.field;
                inpt.style ="border:1px solid lightgray;width:100%; text-align:center";
                inpt.placeholder = "  -";
                return inpt;
            }},
        {headerName:"Plafond Annuel", field:"yearInterventionCap",  editable: false, width:200, resizable:false, cellRenderer: function(params){
                /* This code fragment will be under refactoring */
                let inpt = document.createElement("input");
                inpt.name = params.colDef.field;
                inpt.placeholder = "  -";
                inpt.style ="border:1px solid lightgray;width:100%; text-align:center";
                return inpt;
            }},
        {headerName:"Délais de carence", field:"waitingPeriod",  editable: false, width:200, resizable:false, cellRenderer: function(params){
                /* This code fragment will be under refactoring */
                let inpt = document.createElement("input");
                inpt.name = params.colDef.field;
                inpt.placeholder = "  -";
                inpt.style ="border:1px solid lightgray;width:100%; text-align:center";
                return inpt;
            }},
        {headerName:"Accord préalable", field:"priorAgreement",  width:200, cellRenderer: function(params){
                /* This code fragment will be under refactoring */
                let cbox = document.createElement("input");
                cbox.type="checkbox";
                cbox.name=params.colDef.field;
                return cbox;
            }}
    ];

    render(){
        let content_box = this.props.content+"_box";
        return (
            <>
                <div className="form-group">
                    <div  className="row-flex togglebox" id={this.props.content}  onClick={() => {this.showToggleContent(this.props.content+"_box")}}>
                        <label style={{float:'left', color:'#1d1d1d !important'}}>{this.getToggleProps().title}</label>
                        <label style={{float:'right', color:'#1d1d1d'}}><i className="fa fa-arrow-bottom"></i></label>
                    </div>

                    <div id={content_box} className="togglebox_content" >
                        <div className="ag-theme-alpine" style={ {height: this.getToggleProps().height, width: '100%', backgroundColor:'lightgray'} }>
                            <AgGridReact
                                columnDefs={this.table_header}
                                rowData={this.props.toggleData}
                            >
                            </AgGridReact>
                        </div>
                    </div>
                </div>
            </>
        );   }
}



