import React, {useContext} from 'react';
import './manager-menu.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from "../App";

const serverEndpoint = "http://localhost:3001";

let menu_table = [];
let cur_size = -1;
let queries = ["name", "price", "materials", "type"];
const table_name = "menu_table";

axios.get(serverEndpoint + '/query', {
    params: {
        cmd: "SELECT * FROM menu_table"
    }
})
    .then(function (resp) {
        menu_table = resp.data.result;
        cur_size = menu_table.length;
    })
    .catch(function (error) {
        console.log("Error fetching menu items");
    });

function ManagerMenu() {
    const { isColorblind, setColorblind } = useContext(UserContext);
    function submitChanges() {
        let id_str = document.getElementById("#id-input").value;

        if (id_str) {
            queries.forEach(input => {
                let new_val = document.getElementById(`#${input}-input`).value;
                if (new_val) {
                    let sql_query = `UPDATE ${table_name}
                                     SET ${input}=`;
                    let new_val_str = '';
                    if (input === 'name' || input === 'materials' || input === 'type') {
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
                            console.log(`Error submitting changes to ${menu_table}`);
                        });
                }
            });
        } else {
            let new_id = cur_size + 1;
            let new_id_str = new_id.toString();
            let name_str = document.getElementById("#name-input").value;
            let price_str = document.getElementById("#price-input").value;
            let materials_str = document.getElementById("#materials-input").value;
            let type_str = document.getElementById("#type-input").value;

            if (name_str && price_str && materials_str && type_str) {
                let sql_cmd = `INSERT INTO ${table_name} (id, name, cost, materials, type)
                               VALUES (${new_id_str}, '${name_str}', ${price_str}, '${materials_str}', '${type_str}')`;
                axios.get(serverEndpoint + '/query', {
                    params: {
                        cmd: sql_cmd
                    }
                })
                    .then(function (resp) {
                        window.location.reload();
                    })
                    .catch(function (error) {
                        console.log(`Error submitting changes to ${table_name}`);
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
                           FROM ${table_name}
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
            let sql_cmd = `UPDATE menu_table
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

    return (
        <div class="wrapper">
            <div class={`content ${isColorblind ? "colorblind" : ""}`}>
                <div class="container">
                    <div class="input-wrapper">
                        <div class="input-form">
                            <h2 class="input-form-label">Manage, edit or delete Menu Items</h2>
                            <div class="inputs">
                                <input id="#id-input" type="text" Placeholder="id, leave blank if adding"/>
                                <input id="#name-input" type="text" Placeholder="name"/>
                                <input id="#price-input" type="text" Placeholder="cost"/>
                                <input id="#materials-input" type="text" Placeholder="materials"/>
                                <input id="#type-input" type="text" Placeholder="type"/>
                            </div>
                            <div className="button-container">
                                <button type="button" onClick={submitChanges}
                                        className="btn btn-secondary submit-changes">Submit
                                </button>
                                <button type="button" onClick={deleteItem}
                                        className="btn btn-danger delete-button">Delete
                                </button>

                            </div>
                        </div>
                    </div>

                    <div class="row menu-list-scrollspy-container">
                        <h1 class="menu-list-label">Menu List</h1>
                        <div class="col-4">
                            <div id="menu-list" class="list-group">
                                {
                                    menu_table.map(menu_item =>
                                        <a class="list-group-item list-group-item-action"
                                           href={`#${menu_item.id}`}>{menu_item.id}. {menu_item.name}</a>
                                    )
                                }
                            </div>
                        </div>
                        <div class="col-8">
                            <div data-bs-spy="scroll" data-bs-target="#menu-list" data-bs-smooth-scroll="true"
                                 class="menu-list-scrollspy" tabIndex="0">
                                {
                                    menu_table.map(menu_item =>
                                        <div class="menu-item">
                                            <h4 id={menu_item.id}>{menu_item.name}</h4>
                                            <div class="menu-item-description">
                                                <p className="menu-item-id">
                                                    <span className="bold">Id:</span> {menu_item.id}
                                                    <br/>
                                                    <span className="bold">Price:</span> {menu_item.cost}
                                                    <br/>
                                                    <span className="bold">Materials:</span> {menu_item.materials}
                                                    <br/>
                                                    <span className="bold">Type:</span> {menu_item.type}
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

export default ManagerMenu;