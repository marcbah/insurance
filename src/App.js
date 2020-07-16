/*
Page App route of Saint Raphael
*/
import React from 'react';
import Header from './components/Header/Header';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Reports from "./components/reports";
import Alerts from "./components/alerts";

import './lib/applicationJs'
import './lib/applicationCss'
import Admin from "./components/admin";


function App() {
    return (
        <section id="container" style={{backgroundColor:'lightgray', marginTop:'2%', height:'1500px'}}>
            <Router>
                <Header />

                <Switch>
                    <Route path="/admin" component={Admin} />
                    <Route path="/reports" component={Reports} />
                    <Route path="/alerts" component={Alerts} />
                </Switch>
            </Router>
        </section>
    );
}

export default App;
