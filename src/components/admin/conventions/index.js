import React from "react";
import 'Assets/css/admin.css';
import Medicin from "Assets/img/medicine-icon.png";
import Pharmacy from "Assets/img/pharmacy.png"
import PageController from "../page-controller";
export default class ConventionDashboard extends PageController {
    render(){
        return (<>
            <div className="row col-10">
                <h2 style={{marginLeft:'15%', fontWeight:'500'}}>Conventions</h2>
                <div className="row col-10 ml-5" style={{marginLeft:'15%'}} >
                    <div className="col-sm-5" style={{border:"1px solid lightgray", boxShadow:"0 2px 3px #1d1d1d", backgroundColor:"white", margin:'1%',  cursor:'pointer', width:'43%', height:'400px'}}  onClick={() => {document.location ="/admin/conventions/care-networks-list"}}>
                        <center>
                            <img src={Medicin} style={{height:"250px", marginTop:'12px'}} />

                            <label style={{width:'100%', fontWeight:'bold', fontSize:'17px', backgroundColor:'black', color:'white', marginTop:'19px', padding:'7px',}}>Réseau de soins</label>
                        </center>
                    </div>
                    <div className="col-sm-5" style={{border:"1px solid lightgray", boxShadow:"0 2px 3px #1d1d1d", backgroundColor:"white", margin:'1%',  cursor:'pointer', width:'43%', height:'400px'}}  >
                        <center>
                            <img src={Pharmacy} style={{height:"250px", marginTop:'12px'}} />
                            <label style={{width:'100%', fontWeight:'bold', fontSize:'17px', backgroundColor:'black', color:'white', marginTop:'19px', padding:'7px'}}>Maya</label>
                        </center>
                    </div>

                </div>

            </div>
        </>);
    }
}






