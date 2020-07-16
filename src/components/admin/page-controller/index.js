import React, {Component} from "react";

export default class PageController extends Component {
    pageDataId = 0;
    pageData = {};
    constructor(props){
        super(props);
        this.state = {insuranceId:1, pgNo:1, dataId:this.pageDataId, pageData:this.pageData, statusNotification:0, statusMessage:''};
    }
    switchPage = (pgno) => {
        pgno = (pgno <1?1:pgno);
        pgno = (pgno > 4?4:pgno);
        this.setState({pgNo:pgno});
    }

    setPageDataId = (dId) => {
        this.setState({dataId:dId});
    }

    setPageData = (pData) => {
        this.setState({pageData:pData});
    }


    statusMessageContainer = () => {
        if(this.state.statusNotification == 1)
            return (  <label style={{border:'3px solid green', backgroundColor:'cyan', color:'green', padding:'12px', margin:'12px', width:'60%', borderRadius:'9px', textAlign:'center'}}><i className="fa fa-check"></i> {this.state.statusMessage}</label>);
        else if(this.state.statusNotification == 2)
            return (  <label style={{border:'3px solid red', backgroundColor:'pink', color:'red', padding:'12px', margin:'12px', width:'60%', borderRadius:'9px', textAlign:'center'}}><i className="fa fa-times"></i> {this.state.statusMessage}</label>);
        else if(this.state.statusNotification == 0)
            return (<></>);
        else
            return (<></>);
    }
}

