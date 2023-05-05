import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItems from './CustomerItems.js'
import './DropDown.css'

function CustomerDropDown() {

    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)

    return (
        MenuItems.map((item, index) => {
            return (
                <li key={index}>
                    <Link className='dropdown-item menu-items' to={item.path} onClick={() => setClick(false)}>
                        {item.title}
                    </Link>
                </li>
            )
        })
    )
}

export default CustomerDropDown;