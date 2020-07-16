import {FieldLabel} from '../../../fields/field-label';
import React from "react";
import ImgProfile from "Assets/img/user_profile_icon.png";
export const Beneficiary = (props) => {
    const documents = ["Photo client","CNI","CNPS","Extrait de naissance","Questionnaire médical"];
    return (
        <>
            <fieldset>
                <legend>Bénéficiaire {props.id}</legend>
                <div className="row col-12">
                    <div className="col-sm-6">
                        <FieldLabel field="select" name="beneficiary_type" id="beneficiary_type"
                                    label="Type de bénéficiaire" errormsg="Ce champ est obligatoire" ref_required/>
                        <FieldLabel field="input" name="name" id="name" label="Nom" errormsg="Ce champ est obligatoire"
                                    ref_required/>
                        <FieldLabel field="input" name="surname" id="surname" label="Prénom"
                                    errormsg="Ce champ est obligatoire"/>
                        <FieldLabel field="input" name="birthdate" id="birthdate" label="Date de naissance"
                                    errormsg="Ce champ est obligatoire"/>
                        <FieldLabel field="input" name="tel_number" id="tel_number" label="Numero de téléphone"
                                    errormsg="Ce champ est obligatoire"/>
                        <FieldLabel field="input" name="email" id="email" label="Email"
                                    errormsg="Ce champ est obligatoire"/>
                        <FieldLabel field="input" name="city" id="city" label="Ville de résidence"
                                    errormsg="Ce champ est obligatoire"/>
                        <FieldLabel field="input" name="country" id="country" label="Pays de résidence"
                                    errormsg="Ce champ est obligatoire"/>
                        <FieldLabel field="input" name="birthcity" id="birthcity" label="Ville de naissance"
                                    errormsg="Ce champ est obligatoire"/>
                        <FieldLabel field="input" name="birthcountry" id="birthcountry" label="Pays de naissance"
                                    errormsg="Ce champ est obligatoire"/>
                        <FieldLabel field="input" name="nationality" id="nationality" label="Nationalité"
                                    errormsg="Ce champ est obligatoire"/>
                        <FieldLabel field="input" name="numero_cni" id="numero_cni" label="Numero CNI"
                                    errormsg="Ce champ est obligatoire"/>
                    </div>
                    <div className="col-sm-6">
                        <label>Document(s):</label>
                        <div style={{border: '3px solid #1d1d1d'}}>
                            <center><img src={ImgProfile} style={{height: '200px', marginTop: '-5%'}}/></center>
                            <div className="form-group"><label style={{margin: '8px'}}><i className="fa fa-close"
                                                                                          style={{color: 'red'}}></i> Photo
                                client</label></div>
                            <div className="form-group"><label style={{margin: '8px'}}><i className="fa fa-close"
                                                                                          style={{color: 'red'}}></i> CNI</label>
                            </div>
                            <div className="form-group"><label style={{margin: '8px'}}><i className="fa fa-close"
                                                                                          style={{color: 'red'}}></i> CNPS</label>
                            </div>
                            <div className="form-group"><label style={{margin: '8px'}}><i className="fa fa-close"
                                                                                          style={{color: 'red'}}></i> Extrait
                                de naissance</label></div>
                            <div className="form-group"><label style={{margin: '8px'}}><i className="fa fa-close"
                                                                                          style={{color: 'red'}}></i> Questionnaire
                                médical</label></div>
                            <div style={{
                                borderStyle: 'dashed',
                                backgroundColor: 'HoneyDew',
                                padding: '20px',
                                margin: '20px',
                                borderRadius: '11px'
                            }}>
                                <FieldLabel field="select" name="documents" id="documents" label="Document:"
                                            options={documents} errormsg=""/>
                                <div className="form-group row-flex">
                                    <div>
                                        <label>Rechercher:</label><input type="file"/>
                                    </div>
                                    <div>
                                        <button type="button" className="mt-5" style={{marginTop:'30%', marginLeft:'70%'}}>Charger</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </>
    );
};

