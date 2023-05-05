import React from 'react';
import './manager.css';
import {Link} from 'react-router-dom';

function Manager() {
    var serverEndpoint = "http://localhost:3001/user";

    return (
        <div class="wrapper">
            <div class="content">
                <h1 class="welcome-message">Welcome back, manager</h1>
                <div class="button-container">
                    <Link to="/manager/inventory">
                        <button type="button" class="btn btn-primary btn-lg">Inventory</button>
                    </Link>
                    <Link to="/manager/menuitems">
                        <button type="button" class="btn btn-primary btn-lg">Menu Items</button>
                    </Link>
                    <Link to="/manager/xzreport">
                        <button type="button" className="btn btn-primary btn-lg">XZ Report</button>
                    </Link>
                    <Link to="/manager/restockreport">
                        <button type="button" className="btn btn-primary btn-lg">Restock Report</button>
                    </Link>
                    <Link to="/manager/salesreport">
                        <button type="button" className="btn btn-primary btn-lg">Sales Report</button>
                    </Link>
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

export default Manager;