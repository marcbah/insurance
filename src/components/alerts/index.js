/*
Page Alerts
*/
import React, {Component} from 'react';
import {InterventionsCanvasJSMultiAreaChart, PrescriptionsDetailsTable} from "srt-reporting-kit";
import {reportingServiceUrl} from "../../config"
import {getInterventions, getInterventionsList, getPrescriptionsList} from "./data";
import InterventionsDetailsTable from "srt-reporting-kit/lib/components/alert/InterventionsDetailsTable";

export default class Alerts extends Component {
    render() {
        return (
            <div className="container-fluid main-content">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="widget-container marc">
                            <div className="row">
                                <div className="col-lg-12">
                                    {getInterventions().map((item, key) => {
                                        const {title, data} = item;
                                        return (
                                            <InterventionsCanvasJSMultiAreaChart
                                                key={key}
                                                title={title}
                                                serviceUrl={reportingServiceUrl}
                                                data={data}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    {getInterventionsList().map((item, key) => {
                                        const {title, data} = item;
                                        return (
                                            <InterventionsDetailsTable
                                                key={key}
                                                title={title}
                                                serviceUrl={reportingServiceUrl}
                                                data={data}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    {getPrescriptionsList().map((item, key) => {
                                        const {title, data} = item;
                                        return (
                                            <PrescriptionsDetailsTable
                                                key={key}
                                                title={title}
                                                serviceUrl={reportingServiceUrl}
                                                data={data}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
