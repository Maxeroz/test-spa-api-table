// GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root{

    --color-primary-100: #DCE4FF;
    --color-primary-500: #546FFF;

    --color-secondary-100: #DFE1F3;
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

  /* Дефолтные стили для body */
  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    background-color: #f0f2f5; 
    color: #333; 
  }

  /* Дефолтные стили для заголовков */
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: 600;
  }

  /* Дефолтные стили для ссылок */
  a {
    color: #007bff; /* Синий цвет ссылок */
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Дефолтные стили для кнопок */
  button {
    font-family: inherit;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;
  }

  button:hover {
    background-color: #0056b3;
  }

  /* Дефолтные стили для контейнеров */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
`;

export default GlobalStyles;
