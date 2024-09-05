import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&display=swap');

:root {
  .react-datepicker__input-container input {
  padding: 10px;
  font-size: 14px;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-primary-100);
  width: 100%;
}

.react-datepicker__header{
background-color: var(--color-secondary-100);
}

.react-datepicker__day--selected{
  background-color: var(--color-primary-600);
}

.react-datepicker__day--keyboard-selected {
  background-color: var(--color-primary-500);
}

  --color-primary-0: #FFFFFF;
  --color-primary-100: #DCE4FF;
  --color-primary-500: #546FFF;
  --color-primary-600: #3D53DB;

  --color-secondary-100: #DFE1F3;
  --color-secondary-200: #C2C6E8;
  --color-secondary-400: #54577A;
  --color-secondary-500: #141522;

  --color-error-500: #DB2719;
  --color-error-600: #B71112;


  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  --color-grey-0: #fff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
    font-size: 70%;
  }

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.6;
  background-color: #f0f2f5; 
  color: #333; 
}

ul{
  list-style:none
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
