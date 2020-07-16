import React, {Component} from "react";
import 'Assets/css/admin.css';
import ParticulierImg from "Assets/img/family.png";
import BuildingImg from "Assets/img/building.png"
export default class SubscriptionDashboard extends Component {
    render(){
        return (<>
            <div className="row col-10">
                <h2 style={{marginLeft:'15%', fontWeight:'500'}}>Souscriptions</h2>
                <div className="row col-10 ml-5" style={{marginLeft:'15%'}} >
                    <div className="col-sm-5" style={{border:"1px solid lightgray", boxShadow:"0 2px 3px #1d1d1d", backgroundColor:"white", margin:'1%',  cursor:'pointer', width:'43%', height:'400px'}}  onClick={() => {document.location ="/admin/subscriptions/edit/individual"}}>
                        <center>
                            <img src={ParticulierImg} style={{height:"250px", marginTop:'12px'}} />

                            <label style={{width:'100%', fontWeight:'bold', fontSize:'17px', backgroundColor:'black', color:'white', marginTop:'19px', padding:'7px',}}>Particuler</label>
                        </center>
                    </div>
                    <div className="col-sm-5" style={{border:"1px solid lightgray", boxShadow:"0 2px 3px #1d1d1d", backgroundColor:"white", margin:'1%',  cursor:'pointer', width:'43%', height:'400px'}}  >
                        <center>
                            <img src={BuildingImg} style={{height:"250px", marginTop:'12px'}} />
                            <label style={{width:'100%', fontWeight:'bold', fontSize:'17px', backgroundColor:'black', color:'white', marginTop:'19px', padding:'7px'}}>Entreprise</label>
                        </center>
                    </div>
                </div>

            </div>
        </>);
    }
}






