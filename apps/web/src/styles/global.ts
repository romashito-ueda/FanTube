import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Inter", "Segoe UI", sans-serif;
    background: #f7f7fb;
  }

  a {
    color: inherit;
  }
`;
