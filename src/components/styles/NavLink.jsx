import { NavLink as RRDNavLink } from "react-router-dom";
import { styled } from "styled-components";

const NavLink = styled(RRDNavLink)`
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;

  &:hover {
    background-color: #ddd;
    color: black;
  }

  &.active {
    background-color: #666;
    color: white
  }

  @media (max-width: 768px) {
    padding: 11px 15px;
  }
  
  @media (max-width: 400px) {
    float: none;
    width: calc(100% - 20px);
    padding: 7px 10px;
  }
`

export default NavLink;