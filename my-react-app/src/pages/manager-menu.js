import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import './manager-inventory.css';
import { Link } from 'react-router-dom';

function ManagerInventory() {
    var serverEndpoint = "http://localhost:3001/user";

    return (
        <div class="wrapper">
            <div class="content">
                <div class="input-wrapper">
                    <div class="input-form">
                        <h2 class="input-form-label">Manage, edit or delete Menu Items</h2>
                        <div class="inputs">
                            <input type="text" Placeholder="id, leave blank if adding" />
                            <input type="text" Placeholder="name" />
                            <input type="text" Placeholder="cost" />
                            <input type="text" Placeholder="materials" />
                            <input type="text" Placeholder="type" />
                        </div>
                    </div>
                    <div class="inventory-list">
                        <h2 class="inventory-list-label">Menu List</h2>
                        
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

export default ManagerInventory;