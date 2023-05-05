import React, {useContext, useState} from 'react';
import './manager-xzreport.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from "../App";


function ManagerXZReport() {
    var serverEndpoint = "http://localhost:3001";
    const { isColorblind, setColorblind } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    function generateXZReport() {
        let date = new Date();
        let date_str = date.toISOString().substring(0, date.toISOString().search('T'));

        axios.get(serverEndpoint + '/xz-report', {
            params: {
                date_str: date_str
            }
        })
            .then(function (resp) {
                setTransactions(resp.data.list);
                setTotalPrice(Number(resp.data.list.reduce((sum, transaction) => sum + transaction.total_price, 0).toFixed(2)));
            })
            .catch(function (resp) {
                console.log("Issue generating the XZ Report");
            })
    }

    return (
        <div class="wrapper">
            <div class={`content ${isColorblind ? "colorblind" : ""}`}>
                <div class="content-container">
                    <div class="info-half">
                        <div className="total-label"><span className="bold">Transaction Total:</span> ${totalPrice}
                        </div>
                        <button type="button" class="btn btn-secondary btn-lg generate-report-button"
                                onClick={generateXZReport}>
                            Generate Report
                        </button>
                    </div>
                    <div class="report-area">
                        <div className="row menu-list-scrollspy-container">
                            <h1 className="report-label">XZ Report</h1>
                            <div className="col-8">
                                <div data-bs-spy="scroll" data-bs-smooth-scroll="true"
                                     className="transaction-list-scrollspy" tabIndex="0">
                                    {
                                        transactions.map(transaction =>
                                            <div className="report-item">
                                                <h4 id={transaction.id}>{transaction.transaction_number}</h4>
                                                <div className="menu-item-description">
                                                    <p className="menu-item-id">
                                                        <span className="bold">Id:</span> {transaction.id}
                                                        <br/>
                                                        <span
                                                            className="bold">Items Sold:</span> {transaction.items_sold}
                                                        <br/>
                                                        <span className="bold">Employee:</span> {transaction.employee}
                                                        <br/>
                                                        <span
                                                            className="bold">Total Price:</span> {transaction.total_price}
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

export default ManagerXZReport;