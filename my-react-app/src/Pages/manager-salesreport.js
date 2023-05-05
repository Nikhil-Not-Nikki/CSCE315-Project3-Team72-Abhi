import React, {useContext, useState} from 'react';
import './manager-salesreport.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from "../App";

function ManagerSalesReport() {
    const serverEndpoint = "http://localhost:3001";
    const { isColorblind, setColorblind } = useContext(UserContext);
    const [salesList, setSalesList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    function generateSalesReport() {
        let start_str = document.getElementById(`#start-date-input`).value;
        let end_str = document.getElementById(`#end-date-input`).value;

        if (start_str && end_str) {
            axios.get(serverEndpoint + '/sales-report', {
                params: {
                    start_date: start_str,
                    end_date: end_str
                }
            })
                .then(function (resp) {
                    setSalesList(resp.data.list);
                    setTotalPrice(Number(resp.data.list.reduce((sum, sale) => sum + sale.total_price, 0).toFixed(2)));
                })
                .catch(function (resp) {
                    console.log("Error generating Sales Report")
                })
        }
    }

    return (
        <div class="wrapper">
            <div class={`content ${isColorblind ? "colorblind" : ""}`}>
                <div class="content-container">
                    <div class="info-half">
                        <div className="total-label"><span className="bold">Total:</span> ${totalPrice}
                        </div>
                        <div className="total-label"><span className="bold">Number of Sales:</span> {salesList.length}
                        </div>
                        <input id="#start-date-input" type="text" Placeholder="Start Date (YYYY-MM-DD)"/>
                        <input id="#end-date-input" type="text" Placeholder="Start Date (YYYY-MM-DD)"/>
                        <button type="button" class="btn btn-secondary btn-lg generate-report-button"
                                onClick={generateSalesReport}>
                            Generate Report
                        </button>
                    </div>
                    <div class="report-area">
                        <div className="row report-list-scrollspy-container">
                            <h1 className="report-label">Sales Report</h1>
                            <div className="col-8">
                                <div data-bs-spy="scroll" data-bs-smooth-scroll="true"
                                     className="report-list-scrollspy" tabIndex="0">
                                    {
                                        salesList.map(sale =>
                                            <div className="report-item">
                                                <h4 id={sale.id}>{sale.transaction_id}</h4>
                                                <div className="report-item-description">
                                                    <p className="report-item-id">
                                                        <span className="bold">Id:</span> {sale.transaction_id}
                                                        <br/>
                                                        <span className="bold">Date:</span> {sale.date}
                                                        <br/>
                                                        <span className="bold">Sold By:</span> {sale.employee}
                                                        <br/>
                                                        <span className="bold">Items Sold:</span> {sale.items_sold}
                                                        <br/>
                                                        <span className="bold">Total Price:</span> {sale.total_price}
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

export default ManagerSalesReport;