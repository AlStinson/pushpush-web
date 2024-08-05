import { styled } from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 20px auto;

  @media (max-width: 768px) {
    width: 300px;
    margin: 15px auto;
  }

  
  @media (max-width: 480px) {
    width: 250px;
    margin: 10px auto;
    max-width: calc(100% - 40px);
  }
`;

export default Form