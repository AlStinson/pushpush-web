import styled from 'styled-components';

const Header = styled.header`
  background-color: #007bff;
  padding: 20px;
  text-align: center;
  color: white;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export default Header;