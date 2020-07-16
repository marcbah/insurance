/**
 * Dasboard Routes
 */
import React from 'react';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import InsuredsAdmin from "./insureds";
import InsuredDetailsAdmin from "./insured-details";
import ContractsAdmin from "./contracts";
import EditContractAdmin from "./contracts/edit";
import ContractDetailsAdmin from "./contract-details";
import EditSubscription from "./edit-subscription";
import ConventionDashboard from "./conventions";
import CareNetworks from "./conventions/list/care-networks";
import CareNetworkEdit from "./conventions/edit/care-networks";
import SubscriptionDashboard from "./subscriptions/edit";
import SubscriptionsList from "./subscriptions/list";
import EditSubscriptionIndividual from "./subscriptions/edit/individual";
import EditSubscriptionCompany from "./subscriptions/edit/company";

const Admin = ({match}) => {
    return (
        <div >

            <div className="col-sm-2 widget-container" >

            </div>
            <Switch>

                <Route path={`${match.url}/insureds/:id`} component={InsuredDetailsAdmin} />
                <Route path={`${match.url}/insureds`} component={InsuredsAdmin} />
                <Route path={`${match.url}/contracts/edit`} component={EditContractAdmin} />
                <Route path={`${match.url}/contracts`} component={ContractsAdmin} />
                <Route path={`${match.url}/contracts/:id`} component={ContractDetailsAdmin} />
                <Route path={`${match.url}/contracts/:id/edit`} component={EditContractAdmin} />
                <Route path={`${match.url}/editsubscription`} component={EditSubscription} />
                <Route path={`${match.url}/conventions/care-networks-edit`} component={CareNetworkEdit} />
                <Route path={`${match.url}/conventions/care-networks-list`} component={CareNetworks} />
                <Route path={`${match.url}/conventions/pharmacy-networks-list`} component={CareNetworks} />
                <Route path={`${match.url}/conventions/billing-list`} component={CareNetworks} />
                <Route path={`${match.url}/conventions`} component={ConventionDashboard} />
                <Route path={`${match.url}/subscriptions/edit/individual`} component={EditSubscriptionIndividual} />
                <Route path={`${match.url}/subscriptions/edit/company`} component={EditSubscriptionCompany} />
                <Route path={`${match.url}/subscriptions/edit`} component={SubscriptionDashboard} />
                <Route path={`${match.url}/subscriptions/list`} component={SubscriptionsList} />


            </Switch>
        </div>
    );
};

export default Admin;



