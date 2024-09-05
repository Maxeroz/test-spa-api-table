import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&display=swap');

:root {
  --color-primary-0: #FFFFFF;
  --color-primary-100: #DCE4FF;
  --color-primary-500: #546FFF;
  --color-primary-600: #3D53DB;

  --color-secondary-100: #DFE1F3;
  --color-secondary-200: #C2C6E8;
  --color-secondary-400: #54577A;
  --color-secondary-500: #141522;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.6;
  background-color: #f0f2f5; 
  color: #333; 
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 1rem;
  font-weight: 600;
}

a {
  color: #007bff; 
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  font-family: inherit;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
`;

export default GlobalStyles;
