import React from "react";

export const FieldLabel = (props) => {

    const fieldwidth=(props.width!=undefined?props.width:"50%");

    if(props.field == "input"){
        if(props.ref_required != undefined)
            return (<div className="form-group row-flex"><label className="control-label" style={{width:'14%'}}>{props.label}</label> &nbsp; <input type="text" className="form-control"  name={props.name} id={props.id} ref={props.register} style={{width:fieldwidth, border:'1px solid black'}} />
            </div>);
        else
            return (<div className="form-group row-flex"><label className="control-label" style={{width:'14%'}}>{props.label}</label> &nbsp; <input type="text" className="form-control"  name={props.name} id={props.id} ref={props.register} style={{width:fieldwidth, border:'1px solid black'}} />
            </div>);
    }else if(props.field == "inputHidden"){
        return (<input type="hidden" name={props.name} id={props.id} value={props.value} />);

    }else if(props.field == "select"){
        if(props.dangerouslySetInnerHTML != undefined)
            return (<div className="form-group row-flex"> <label style={{width:'14%'}}>{props.label}</label> &nbsp;
                <select className="form-control" name={props.name} id={props.id}  dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}   ref={props.register} style={{width:fieldwidth, border:'1px solid black'}}>
                </select></div>);
        else if(props.options != undefined){
            return (<div className="form-group row-flex"> <label className="control-label" style={{width:'14%'}}>{props.label}</label> &nbsp; <select className="form-control"  name={props.name} id={props.id}  ref={props.register} style={{width:fieldwidth, border:'1px solid black'}}><option value="0">Choisir dans la liste...</option>
                {props.options.map((val,i) => <option value={i}>{val}</option>)}
            </select></div>);
        }else if(props.options == undefined){
            return (<div className="form-group row-flex"> <label className="control-label" style={{width:'14%'}}>{props.label}</label> &nbsp; <select className="form-control"  name={props.name} id={props.id}  ref={props.register} style={{width:fieldwidth, border:'1px solid black'}}><option value="0">Choisir dans la liste...</option>

            </select></div>);
        }
    }
    else if(props.field == "radio"){
        return (
            <div className="form-group row-flex">
                <label className="control-label" style={{width:'18%'}}>{props.label}</label>
                {
                    props.options.map((val, i) => <>
                        {(val == props.selected) &&
                        <input type="radio" name={props.name} id={props.name} value={i} checked />
                        }
                        {!(val == props.selected) &&
                        <input type="radio" name={props.name} id={props.name} value={i} />
                        }
                        <label for={val}>{val}</label>&nbsp;&nbsp;&nbsp;</> )
                }
            </div>);

    }else if(props.field == "checkbox"){
        return (
            <div className="form-group row-flex">
                <label className="control-label" style={{width:'18%'}}>{props.label}</label>

                {
                    props.options.map((val, i) => <>
                        {(val == props.selected) &&
                      <input type="checkbox" name={props.name} id={props.name} value={i} checked />
                        }
                        {!(val == props.selected) &&
                         <input type="checkbox" name={props.name} id={props.name} value={i} />
                        }
                        <label for={val} className="mt-5" style={{marginTop:'8px'}}>{val}</label>
                        &nbsp;&nbsp;&nbsp;</>
                    )
                }

            </div>
        );

    }else if(props.field == "file"){
        return (<div className="form-group">
                <input type="file" name={props.name} className="custom-file-input"/>
           </div>
        );
    }
}

