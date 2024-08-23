import { NavLink as RRDNavLink } from "react-router-dom";
import { styled } from "styled-components";

const NavLink = styled(RRDNavLink)`
  width: 120px;
  display: inline-block;
  color: white;
  text-align: center;
  padding: 16px 20px;
  text-decoration: none;

  &:hover {
    background-color: #ddd;
    color: black;
  }

  &.active {
    background-color: #666;
    color: white;
  }

  @media (max-width: 768px) {
    width: 100px;
    padding: 12px 16px;
  }

  @media (max-width: 400px) {
    padding: 8px 12px;
  }
`;

export default NavLink;
