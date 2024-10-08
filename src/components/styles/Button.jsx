import styled from "styled-components";

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: var(--button-padding);
  margin: var(--button-margin);
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: var(--primary-hover);
  }

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

export default Button;
