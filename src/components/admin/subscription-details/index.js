import React, {Component} from 'react';
import default_logo from '../../../assets/img/ui-sam.jpg';
import './subscriptiondetails.css';
export default class DetailsSubscription extends Component {

    constructor(props) {
        super(props);
        document.getElementsByTagName("input").readOnly = true;
        document.getElementsByTagName("select").readOnly = true;
    }



    render(){
        return (
            <>
            <div className="row-flex">
            <div className="m-10 col-flex-1">
            <fieldset className="displaycustomstyle">
            <legend>Information générale</legend>
        <div className="form-group">
            <label>Client:</label>
        <select className="form-control ">
            <option>Entreprise</option>
            <option>Particulier</option>
            </select>
            </div>
            <div className="form-group">
            <label>Date début:</label>
        <input type="date" name="date_debut" className="dateField" value={this.props.f_data!=undefined?this.props.f_data.info_generale.date_debut:""} />
        &nbsp;&nbsp;&nbsp;
    <label>Date fin:</label>
        <input type="date" name="date_fin" className="dateField" value={this.props.f_data!=undefined?this.props.f_data.info_generale.date_fin:""} />
        </div>
        <div className="form-group">
            <label>Commercial</label>
            <input type="text" name="commercial" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.info_generale.numero_contrat:""} />
        </div>
        <div className="form-group">
            <label>Raison social</label>
        <input type="text" name="rais_social" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.info_generale.raison_sociale:""} />
        </div>
        <div className="form-group">
            <label>College</label>
            <input type="text"  name="college" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.info_generale.college:""} />
        </div>
        <div className="form-group">
            <label>Adresse géographique:</label>
        <input type="text"  name="adresse_geographique" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.info_generale.adresse_geographique:""} />
        </div>
        <div className="form-group">
            <label>Boite Postale:</label>
        <input type="text"  name="boite_postale" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.info_generale.boite:""} />
        </div>
        <div className="form-group">
            <label>Téléphone:</label>
        <input type="text"  name="telephone" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.info_generale.telephone:""} />
        </div>
        <div className="form-group">
            <label>Email DG / Gérant:</label>
        <input type="email"  name="email_dg_gerant" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.info_generale.email:""} />
        </div>
        <div className="form-group">
            <label>N° RCCM:</label>
        <input type="text"  name="rccm" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.info_generale.rccm:""} />
        </div>
        <div className="form-group">
            <label>N° NCC:</label>
        <input type="text"  name="ncc" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.info_generale.ncc:""} />
        </div>
        <div className="form-group">
            <label>N° CNPS:</label>
        <input type="text"  name="cnps" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.info_generale.cnps:""} />
        </div>
        </fieldset>
        </div>


        <div className="m-10 col-flex-1">
            <fieldset className="displaycustomstyle">
            <legend>Téléversements</legend>
            <div className="form-group">
            <label>Logo</label>
            <img src={default_logo} style={{height:'95px'}} name="logo"  />
            </div>
            <div className="form-group">
            <label>Régistre de commerce&nbsp;</label>
             <a href="#">fichier 1</a>
            </div>
            <div className="form-group">
            <label>Déclaration fiscale d'extension&nbsp;</label>
            <a href="#">fichier 2</a>
            </div>
            <div className="form-group">
            <label>Fiche d'immatriculation CNPS&nbsp;</label>
            <a href="#">fichier 3</a>
            </div>
            </fieldset>

            <fieldset className="customstyle">
            <legend>Tarifs</legend>
            <div className="form-group">
            <label>Prime par personne / famille</label>
        <input type="text" name="prime_person" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.tarif.prime_personne:""}  />
        </div>
        <div className="form-group">
            <label>Surprime</label>
            <input type="text" name="surprime" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.tarif.surprime:""} />
        </div>
        <div className="form-group">
            <label>Prime supplémentaire / enfants</label>
        <input type="text" name="primesupplementaire" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.tarif.prime_supplementaire:""}  />
        </div>
        <div className="form-group">
            <label>Reduction</label>
            <input type="text" name="reduction" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.tarif.reduction:""} />
        </div>
        <div className="form-group">
            <label>Prime nette annuelle</label>
        <input type="text" name="primenetteannuelle" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.tarif.prime_nette_annuelle:""}  />
        </div>
        <div className="form-group">
            <label>Taxes</label>
            <input type="text" name="taxes" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.tarif.taxes:""} />
        </div>
        <div className="form-group">
            <label>Accesoires</label>
            <input type="text" name="accesoires" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.tarif.accessoires:""} />
        </div>
        </fieldset>
        </div></div>
        <fieldset className="displaycustomstyle">
            <legend>Entreprise</legend>
            <div className="row-flex">
            <div className="m-10 col-flex-1">
            <div className="form-group">
            <label>Effectif salariés</label>
        <input type="text" name="effectifsalarie" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.entreprise.effectif_salaries:""} />
        </div>
        <div className="form-group">
            <label>Effectif total (epoux(se), enfants)</label>
        <input type="text" name="effectiftotal" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.entreprise.effectif_total:""} />
        </div>
        <div className="form-group">
            <label>Effectif famille</label>
        <input type="text" name="effectiffamille" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.entreprise.effectif_famille:""}/>
        </div>
        </div>
        <div className="m-10 col-flex-1">

            <div className="form-group">
            <label>Effectif solo</label>
        <input type="text" name="effectifsalarie" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.entreprise.effectif_solo:""}/>
        </div>
        <div className="form-group">
            <label>Effectif enfant supplémentaire</label>
        <input type="text" name="effectifenfantsup" className="form-control" value={this.props.f_data!=undefined?this.props.f_data.entreprise.effectif_supplementaire:""}/>
        </div>

        </div></div>
        </fieldset>
        </>

    );
    }



};