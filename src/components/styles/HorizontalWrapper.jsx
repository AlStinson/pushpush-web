import styled from 'styled-components';

const HorizontalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 7.5px;
  }

  
  @media (max-width: 480px) {
    padding: 5px;
  }
`;

export default HorizontalWrapper;