import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

import backgroundSrc from '../assets/img/main-bg.png';

const fontDefaults = `
    font-family: Roboto, sans-serif;
    font-size: 1.6rem;
`;

const GlobalStyle = createGlobalStyle`

  ${reset}

  :root {
    --toastify-color-progress-dark: #F6C944;
  }

  #tether-mask {
    mask-image: url(#maskMaskSource);
  }

  .tether-mask-type {
    mask-type: alpha;
  }

  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-font-variant-ligatures: none;
    font-size: 62.5%;
    font-smoothing: antialiased;
    font-variant-ligatures: none;
    text-rendering: optimizeLegibility;
    box-sizing: border-box;
    @media (max-width: 1024px) {
      font-size: 60%;
    }
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
    &:active {
      color: inherit;
    }
  }

  body, button, input {
    ${fontDefaults}
  }

  body {
    background-color: rgb(13,30,41);
    background-image: url(${backgroundSrc});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center top -150px;
    background-size: 100% auto;
    overflow-x: hidden;
    overflow-y: scroll;
    touch-action: pan-x pan-y;
  }

  button {
    background-color: transparent;
    border: 0;
    color: #000;
    cursor: pointer;
    padding: 0;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  .Toastify__toast-body {
    line-height: 2.2rem;
  }

`;

export default GlobalStyle;
