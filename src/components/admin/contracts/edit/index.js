import React, {Component} from "react";
import 'Assets/css/admin.css';
import Tresholds  from './tresholds';
import Taxes from './taxes';
import DraftList from "./draft-list";
import PageController from "../../page-controller";
import TemplateVierge from "Assets/img/templatevierge.png";
import TemplateSRT from "Assets/img/templatesrt.png";
import {AdminAPI} from "../../../../api";
import * as yup from 'yup';
import ToggleDisplay from 'react-toggle-display';
class Page extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let tresholdShowProp = (this.props.pgNo != 2?0:1);
        let taxesShowProp = (this.props.pgNo != 3?0:1);
        let draftShowProp = (this.props.pgNo != 4?0:1);
        return (<>
            <ToggleDisplay show={tresholdShowProp}>
                <Tresholds id="page2" contractId={this.props.contractId}/>
            </ToggleDisplay>
            <ToggleDisplay show={taxesShowProp}>
                <Taxes id="page3" contractId={this.props.contractId} />
            </ToggleDisplay>
            <ToggleDisplay show={draftShowProp}>
                <DraftList id="page4" contractId={this.props.contractId}  />
            </ToggleDisplay>
        </>);

    }

}




export default class EditionContract extends PageController {

    editionData = {};
    tresholdData = {};
    taxesData = {};
    validationSchema = yup.object().shape({
        name: yup.string()
            .required()
    });

    getCurrentPageFormData = () => {
        return $('#editContractForm').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
    }

    saveContractValidate = (element, action='DRAFT') => {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        setTimeout(() => this.setState({statusNotification:0, statusMessage:''}),4500);
        let valueTocheck = $("input#name").val();
        this.validationSchema.isValid({name:valueTocheck}).then(function(valid) {
            if (valid) {
                element.saveContract(action);
            }else{
                element.setState({statusNotification:2, statusMessage:'Le nom est obligatoire'})
            }
        });
    }

    saveContract = (action='DRAFT') => {
        if(this.state.pgNo == 2)
            this.tresholdData = this.getCurrentPageFormData();
        else if(this.state.pgNo == 3)
            this.taxesData = this.getCurrentPageFormData();
        let tab=[];
        for(let [key, value] of Object.entries(this.tresholdData)){
            tab[key] = value;
        }
        for(let [key, value] of Object.entries(this.taxesData)){
            tab[key] = value;
        }
        Object.assign(this.editionData, tab);
        this.setPageData(this.editionData);

        if(this.state.dataId > 0) {
            this.editionData.id = this.state.dataId;
            if(action == 'ACTIVATE'){
                /*
                    ICI Il y'aura une method dans l'admin-service
                    enregistrée sous le endpoint /contracts/{id}/activation
                    Cette method mettra à jour le status du contrats en ACTIF et pourra également gérer les actions
                    relatifs tels que envois des mails de notifications...

                 */
                AdminAPI.post(`contracts/${this.editionData.id}/activation`)
                    .then(res => () => {
                        console.log(res.data);
                        this.setState({statusNotification:1, statusMessage:'Contrat enregistré avec succès'})
                    }, error => {
                        this.setState({
                            loading: false,
                            error: "An error occurred",
                            statusNotification:2, statusMessage:'Une erreure est survenue'
                        });
                        console.log(error.message);
                    });
            }else{
                AdminAPI.put('contracts/'+this.editionData.id, this.editionData)
                    .then(res => {
                        console.log(res.data);
                        this.setState({statusNotification:1, statusMessage:'Contrat enregistré avec succès'})
                    }, error => {
                        this.setState({
                            loading: false,
                            error: "An error occurred",
                            statusNotification:2, statusMessage:'Une erreure est survenue'
                        });
                        console.log(error.message);
                    });
            }


        }else{
            console.log(this.editionData);
            AdminAPI.post('contracts', this.editionData)
                .then(res => {
                    console.log(res.data);
                    this.setPageDataId(res.data.id);
                    this.setState({statusNotification:1, statusMessage:'Contrat enregistré avec succès'})
                }, error => {
                    this.setState({
                        loading: false,
                        error: "An error occurred",
                        statusNotification:2, statusMessage:'Une erreure est survenue'
                    });
                    console.log(error.message);
                });
        }
        return this.state.pageData;
    }

    finalizeContract = () => {
        this.saveContractValidate(this,'ACTIVATE');
        setTimeout(() => document.location='/admin/contracts',1000);
    }



    render(){

        return (

            <div className="container" style={{backgroundColor:'lightgray', marginLeft:'15%', marginRight:'0%', padding:'1%', width:'85%',height:'100%'}}>
                <div className="row-flex">
                    <h1>Nouveau contrat <small>{this.state.pgNo}/3</small> </h1>
                    {this.statusMessageContainer()}
                </div>
                <form method="post" id="editContractForm" onSubmit={() => {return false;}}>
                    <div id="page_container" style={{margin:'0%', width:'100%'}}>
                        <Page pgNo={this.state.pgNo} contractId={this.state.dataId}  />
                    </div>
                    {this.state.pgNo == 1 &&
                    <div className="row col-12">
                        <div className="row-flex col-sm-12" >
                            <div className="col-sm-6" style={{border:"1px solid lightgray", boxShadow:"0 2px 3px #1d1d1d", backgroundColor:"white", margin:'10%',  cursor:'pointer'}}  onClick={() => {this.switchPage(4)}}>
                                <center>
                                    <img src={TemplateSRT} style={{height:"250px", marginTop:'12px'}} />
                                </center>
                                <label style={{width:'100%', fontWeight:'bold', fontSize:'17px', backgroundColor:'black', color:'white', marginTop:'19px', padding:'7px',}}>A partir du template SRT</label>

                            </div>
                            <div className="col-sm-6" style={{border:"1px solid lightgray", boxShadow:"0 2px 3px #1d1d1d", backgroundColor:"white", margin:'10%',  cursor:'pointer'}}  onClick={() => {this.switchPage(2)}}>
                                <center>
                                    <img src={TemplateVierge} style={{height:"250px", marginTop:'12px'}} />
                                    <label style={{width:'100%', fontWeight:'bold', fontSize:'17px', backgroundColor:'black', color:'white', marginTop:'19px', padding:'7px'}}>A partir d'un template vierge</label>
                                </center>
                            </div>
                        </div>

                    </div>
                    }

                    {(this.state.pgNo >= 1 && this.state.pgNo < 4) &&
                    <div className="row-flex col-12" style={{marginLeft: '15%', fontWeight: 'bold', float:'right', marginRight:'2%'}}>
                        {this.state.pgNo < 3 &&
                        <div className="col-3">
                            <button type="button" className="btn btn-danger" style={{fontWeight: 'bold', color:'white', backgroundColor:'red'}}
                                    onClick={() => {
                                        // eslint-disable-next-line no-restricted-globals
                                        if(confirm("Etes-vous sûr d'abandonner le formulaire ?"))
                                            document.location="/admin/contracts"
                                    }}
                            > Annuler
                            </button>
                        </div>
                        }
                        {(this.state.pgNo > 1) &&
                        <div className="col-6 row-flex">
                            {(this.state.pgNo == 3) &&
                            <button type="button" className="btn btn-info"
                                    style={{
                                        width: '300px',
                                        fontWeight: 'bold',
                                        backgroundColor: 'cyan',
                                        color: 'black',
                                        float:'left'
                                    }}
                                    onClick={() => {
                                        this.switchPage(--this.state.pgNo);
                                        $("html, body").animate({ scrollTop: 0 }, "slow");
                                    }}
                            >
                                <i className="fa fa-backward"></i> Précédent
                            </button>
                            }
                            <button type="button" className="btn btn-warning"
                                    style={{width: '300px', fontWeight: 'bold', backgroundColor:'yellow', color:'black'}}
                                    onClick={() => {
                                        this.saveContractValidate(this);
                                    }}
                            >
                                <i className="fa fa-save"></i> Enregistrer
                            </button>

                            {this.state.pgNo == 3 &&
                            <button type="button" className="btn btn-success"
                                    style={{width: '300px', fontWeight: 'bold', backgroundColor:'green', color:'white'}}
                                    onClick={() => {
                                        this.finalizeContract();
                                    }}
                            >
                                <i className="fa fa-check"></i> Finaliser le contrat
                            </button>
                            }
                        </div>
                        }
                        {(this.state.pgNo > 1 && this.state.pgNo < 3) &&
                        <div className="col-3">
                            <button type="button" className="btn btn-info" style={{fontWeight: 'bold', backgroundColor:'cyan', color:'black'}}
                                    onClick={() => {
                                        this.switchPage(++this.state.pgNo);
                                        $("html, body").animate({ scrollTop: 0 }, "slow");
                                    }}><i className="fa fa-forward"></i> Suivant
                            </button>
                        </div>
                        }

                    </div>
                    }

                </form>
            </div>
        );
    }
}


