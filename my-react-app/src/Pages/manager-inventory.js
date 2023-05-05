import React, {useContext} from 'react';
import './manager-inventory.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import { UserContext } from "../App"

const serverEndpoint = "http://localhost:3001";

let inventory_table = [];
let cur_size = -1;
let queries = ["name", "quantity", "cost", "min", "max"];

function ManagerInventory() {
    const { isColorblind, setColorblind } = useContext(UserContext);
    function submitChanges() {
        let id_str = document.getElementById("#id-input").value;

        if (id_str) {
            queries.forEach(input => {
                let new_val = document.getElementById(`#${input}-input`).value;
                if (new_val) {
                    let sql_query = `UPDATE newinventory
                                     SET ${input}=`;
                    let new_val_str = '';
                    if (input === 'name') {
                        new_val_str = `'${new_val}'`;
                    } else {
                        new_val_str = `${new_val}`;
                    }
                    sql_query += new_val_str + ` WHERE id=${id_str}`;

                    axios.get(serverEndpoint + '/query', {
                        params: {
                            cmd: sql_query
                        }
                    })
                        .then(function (resp) {
                            console.log("Successfully changed this shit");
                            window.location.reload();
                        })
                        .catch(function (error) {
                            console.log("Error submitting changes to newinventory");
                        });
                }
            });
        } else {
            let new_id = cur_size + 1;
            let new_id_str = new_id.toString();
            let name_str = document.getElementById("#name-input").value;
            let quantity_str = document.getElementById("#quantity-input").value;
            let cost_str = document.getElementById("#cost-input").value;
            let min_str = document.getElementById("#min-input").value;
            let max_str = document.getElementById("#max-input").value;

            if (name_str && quantity_str && cost_str && min_str && max_str) {
                let sql_cmd = `INSERT INTO newinventory (id, name, quantity, cost, min_amount, max_amount)
                               VALUES (${new_id_str}, '${name_str}', ${quantity_str}, ${cost_str}, ${min_str},
                                       ${max_str})`;
                axios.get(serverEndpoint + '/query', {
                    params: {
                        cmd: sql_cmd
                    }
                })
                    .then(function (resp) {
                        window.location.reload();
                    })
                    .catch(function (error) {
                        console.log("Error submitting changes to newinventory");
                    });
            } else {
                console.log("incorrect format");
            }
        }
    }

    function deleteItem() {
        let id_str = document.getElementById("#id-input").value;
        if (id_str) {
            let sql_cmd = `DELETE
                           FROM newinventory
                           WHERE id = ${id_str}`;
            axios.get(serverEndpoint + '/query', {
                params: {
                    cmd: sql_cmd
                }
            })
                .then(function (resp) {
                    console.log(parseInt(id_str), cur_size);
                    reorderItems(parseInt(id_str))
                        .then(function (resp) {
                            window.location.reload();
                        })
                })
                .catch(function (resp) {
                    console.log("Error deleting inventory item");
                })
        }
    }

    async function reorderItems(deleted_id) {
        for (let i = deleted_id + 1; i <= cur_size; ++i) {
            console.log(`setting id = ${i} to id = ${i - 1}`);
            let sql_cmd = `UPDATE newinventory
                           SET id=${String(i - 1)}
                           WHERE id = ${String(i)}`;

            await axios.get(serverEndpoint + '/query', {
                params: {
                    cmd: sql_cmd
                }
            })
                .catch(function (error) {
                    console.log("Error reordering items after deleting");
                })
        }
    }

    function loadTable() {
        axios.get(serverEndpoint + '/query', {
            params: {
                cmd: "SELECT * FROM newinventory"
            }
        })
            .then(function (resp) {
                inventory_table = resp.data.result;
                cur_size = inventory_table.length;

                inventory_table.sort((a, b) => a.id - b.id);
            })
            .catch(function (error) {
                console.log("Error fetching inventory items");
            });
    }

    loadTable();

    return (
        <div class="wrapper">
            <div class={`content ${isColorblind ? "colorblind" : ""}`}>
                <div class="input-wrapper">
                    <div class="container">
                        <div class="input-form">
                            <h2 class="input-form-label">Manage, edit or delete Inventory Items</h2>
                            <div class="inputs">
                                <input id="#id-input" type="text" Placeholder="id, leave blank if adding"/>
                                <input id="#name-input" type="text" Placeholder="name"/>
                                <input id="#quantity-input" type="text" Placeholder="quantity"/>
                                <input id="#cost-input" type="text" Placeholder="cost"/>
                                <input id="#min-input" type="text" Placeholder="minimum amount"/>
                                <input id="#max-input" type="text" Placeholder="maximum amount"/>
                            </div>
                            <div class="button-container">
                                <button type="button" onClick={submitChanges}
                                        className="btn btn-secondary submit-changes">Submit
                                </button>
                                <button type="button" onClick={deleteItem}
                                        className="btn btn-danger delete-button">Delete
                                </button>

                            </div>
                        </div>

                        <div className="row inventory-list-scrollspy-container">
                            <h1 className="inventory-list-label">Inventory List</h1>
                            <div className="col-4">
                                <div id="inventory-list" className="list-group">
                                    {
                                        inventory_table.map(inventory_item =>
                                            <a className="list-group-item list-group-item-action"
                                               href={`#${inventory_item.id}`}>{inventory_item.id}. {inventory_item.name}</a>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-8">
                                <div data-bs-spy="scroll" data-bs-target="#inventory-list" data-bs-smooth-scroll="true"
                                     className="inventory-list-scrollspy" tabIndex="0">
                                    {
                                        inventory_table.map(inventory_item =>
                                            <div className="inventory-item">
                                                <h4 id={inventory_item.id}>{inventory_item.name}</h4>
                                                <div className="inventory-item-description">
                                                    <p className="inventory-item-id">
                                                        <span className="bold">Id:</span> {inventory_item.id}
                                                        <br/>
                                                        <span className="bold">Price:</span> {inventory_item.cost}
                                                        <br/>
                                                        <span
                                                            className="bold">Quantity:</span> {inventory_item.quantity}
                                                        <br/>
                                                        <span
                                                            className="bold">Min Amount:</span> {inventory_item.min_amount}
                                                        <br/>
                                                        <span
                                                            className="bold">Max Amount:</span> {inventory_item.max_amount}
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

export default ManagerInventory;