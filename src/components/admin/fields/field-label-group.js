import React from "react";

const Fieldsingle = (props) => {
    const fieldwidth = (props.properties.width!=undefined?props.properties.width:"200px");
    switch(props.properties.type){
        case 'input':
            return <input name={props.properties.name}  id={props.properties.id} style={(props.properties.style==undefined?{width:fieldwidth, marginRight:'12px', marginLeft:'20px'}:props.properties.style)}  />
        case 'select':
            return (<select  name={props.properties.name}  id={props.properties.id} style={(props.properties.style==undefined?{width:fieldwidth, marginRight:'12px', marginLeft:'20px'}:props.properties.style)}>{props.properties.options.map((val,i) => <option value={i}>{val}</option>)}</select>)
        case 'label':
            return (<label>{props.properties.value}</label>)
        case 'button':
            return (<button className={props.properties.className} type={props.properties.btnType} style={(props.properties.style==undefined?{width:fieldwidth, marginRight:'12px', marginLeft:'20px'}:props.properties.style)} onClick={props.properties.action}>{props.properties.value}</button> )
        default:
            return (<input name={props.properties.name} value={props.properties.value} id={props.properties.id} style={(props.properties.style==undefined?{width:fieldwidth, marginRight:'12px', marginLeft:'20px'}:props.properties.style)}  />);
    }

}

export const FieldLabelGroup = (props) => {
    if(props.fields.btnAction != "remover")
        return <div className="form-group "><label style={{width:'10%'}}>{props.label}</label>  <div>{props.fields.map((val) => <Fieldsingle properties={val}   /> )}</div></div>
    else
        return <></>
}





