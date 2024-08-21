import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #007bff;
    --primary-hover: #0056b3;
    --background-color: #f0f2f5;
    --text-color: #333;
    --button-padding: 10px 20px;
    --button-margin: 10px 0;
    --border-radius: 5px;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.75em 0em;
  }
`;

export default GlobalStyles;
