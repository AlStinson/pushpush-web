import styled from 'styled-components';

const Header = styled.h1`
  background-color: var(--primary-color);
  padding: 20px;
  text-align: center;
  color: white;
  font-size: 2rem;
  border-bottom: 4px solid var(--primary-hover);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export default Header;