import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
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