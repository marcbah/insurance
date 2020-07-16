import React from "react";
import 'Assets/css/admin.css';
import PageController from "../../../page-controller";
import {AdminAPI} from '../../../../../api';
import FolderIcon from "Assets/img/draft_folder.png";

export default class DraftList extends PageController{

    componentDidMount() {
        this.contractsDrafts();
    }

    /* Ici on load tous les contracts qui ont le status DRAFT  */
    contractsDrafts = () => {
        AdminAPI.get('contracts?status=DRAFT')
            .then(res =>{
                this.setState({loading: false, contract_data: res.data, error: ''});
            }, error => {
                console.log(error.message);
            });
    }

    moveToContract = (id) => {
        this.setContractId(id);
        this.switchPage(4);
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


    /*  La suite, nous allons afficher chaque draft sous forme de dossier
    et ensuite accéder à chacun en passant l'id du contrat en props.  */
    render() {
        const data_drafts =  this.objectToOptions(this.state.contract_data);
        return (<>
            {data_drafts.map((val, i) => <div style={{maxWidth:'152px',cursor:'pointer'}} onclick={() => this.moveToContract(i)}><img src={FolderIcon} style={{width:'150px'}}/><label style={{marginLeft:'10px'}}>{val}</label></div>)}
        </>)
    }
}

