import React, {useContext, useState} from 'react';
import './manager-restockreport.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from "../App";

function ManagerRestockReport() {
    const serverEndpoint = "http://localhost:3001";
    const { isColorblind, setColorblind } = useContext(UserContext);
    const [restockList, setRestockList] = useState([]);

    function generateRestockReport() {
        axios.get(serverEndpoint + '/restock-report')
            .then(function (resp) {
                setRestockList(resp.data.list);
            })
            .catch(function (resp) {
                console.log("Issue generating the Restock Report");
            })
    }

    return (
        <div class="wrapper">
            <div class={`content ${isColorblind ? "colorblind" : ""}`}>
                <div class="content-container">
                    <div class="info-half">
                        <button type="button" class="btn btn-secondary btn-lg generate-report-button"
                                onClick={generateRestockReport}>
                            Generate Report
                        </button>
                    </div>
                    <div class="report-area">
                        <div className="row report-list-scrollspy-container">
                            <h1 className="report-label">Restock Report</h1>
                            <div className="col-8">
                                <div data-bs-spy="scroll" data-bs-smooth-scroll="true"
                                     className="report-list-scrollspy" tabIndex="0">
                                    {
                                        restockList.map(restockItem =>
                                            <div className="report-item">
                                                <h4 id={restockItem.id}>{restockItem.name}</h4>
                                                <div className="report-item-description">
                                                    <p className="report-item-id">
                                                        <span className="bold">Id:</span> {restockItem.id}
                                                        <br/>
                                                        <span
                                                            className="bold">Minimum Amount:</span> {restockItem.min_amount}
                                                        <br/>
                                                        <span
                                                            className="bold">Current Amount:</span> {restockItem.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="foot">
                <Link to="/">
                    <button type="button" class="btn btn-info home-button">Return Home</button>
                </Link>
                <Link to="/manager">
                    <button type="button" class="btn btn-info manager-home-button">Return to Manager Home</button>
                </Link>
            </footer>
        </div>
    )
}

export default ManagerRestockReport;