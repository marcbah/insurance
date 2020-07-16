/*
Page Rapport
*/
import React, {Component} from 'react';
import {SpendingCanvasJSMultiAreaChart, SpendingCanvasJSPieChart} from "srt-reporting-kit";
import {reportingServiceUrl, storageServiceUrl} from "../../config"
import {getMonthlySpending, getSpendingPieCharts} from "./data";
import {BrowserRouter as Router} from "react-router-dom";

export default class Reports extends Component {
    render() {
        return (
            <div className="container-fluid main-content">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="widget-container marc">
                            <div className="row">
                                <div className="col-lg-12">
                                    {getSpendingPieCharts().map((item, key) => {
                                        const {title, data} = item;
                                        return (
                                            <SpendingCanvasJSPieChart
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
                                    {getMonthlySpending().map((item, key) => {
                                        const {title, data, documentURI} = item;
                                        return (
                                            <SpendingCanvasJSMultiAreaChart
                                                key={key}
                                                serviceUrl={reportingServiceUrl}
                                                storageServiceUrl={storageServiceUrl}
                                                title={title}
                                                data={data}
                                                documentURI={documentURI}
                                            />
                                        )
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
