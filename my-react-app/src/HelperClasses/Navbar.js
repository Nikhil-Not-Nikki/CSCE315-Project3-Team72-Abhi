/*import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/burger" activeStyle>
            Burger Menu
          </NavLink>
          <NavLink to="/sandwich" activeStyle>
            Sandwich Menu
          </NavLink>
          <NavLink to="/basket" activeStyle>
            Basket Menu
          </NavLink>
          <NavLink to="/sweets" activeStyle>
            Shakes N Sweets Menu
          </NavLink>
          <NavLink to="/extras" activeStyle>
            Extras Menu
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
*/


import React, { useState } from 'react'
import DropDown from './DropDown'
import Button from './Button'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from "./revslogo.png";


function Navbar() {

    const [click, setClick] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const changeClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const onMouseEnter = () => {
        setDropdown(true)
    }

    const onMouseLeave = () => {
        setDropdown(false)
    }

    return (
        <>
            <section>
                <nav className="navbar">

                    <Link to='/' className='logo'><i className='fas fa-home' />
                      <img scr={logo}></img>
                    </Link>

                    <div className="menu-icon" onClick={changeClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} ></i>
                    </div>

                    <ul className={click ? 'nav-side-menu start' : 'nav-side-menu'}>

                        <li className='nav-items'>
                            <Link to="/" className='nav-links' onClick={closeMobileMenu}> Home </Link>
                        </li>

                        <li className='nav-items'>
                            <Link to="/about" className='nav-links' onClick={closeMobileMenu}> About </Link>
                        </li>

                        <li className='nav-items' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
                            <Link className='nav-links' onClick={closeMobileMenu}> Servers <i className='fas fa-caret-down' />
                                {dropdown && <DropDown />}
                            </Link>
                        </li>

                        <li className='nav-items'>
                            <Link to="/contact" className='nav-links' onClick={closeMobileMenu}> Contact </Link>
                        </li>
                    </ul>

                    <Button />

                </nav>
            </section>
        </>
    )
}

export default Navbar;