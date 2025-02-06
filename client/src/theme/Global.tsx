import { css, Global } from "@emotion/react";

import QuickSand from "../assets/fonts/Quicksand-Regular.ttf";

const globalStyles = (
  <Global
    styles={() => css`
      @font-face {
        font-family: "QuickSand";
        font-style: normal;
        font-weight: regular;
        src: url(${QuickSand}) format("truetype");
      }

      html,
      body {
        margin: 0;
        padding: 0;
        min-height: 100%;
        scroll-behavior: smooth;
        background: #fff;
        font-family: "Quicksand";
      }

      // html {
      //   padding-right: calc(8px - (100vw - 100%));
      // }
      body {
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        padding-top: 0px;
        margin: 0px;
      }
      * {
        box-sizing: border-box;
        &:before,
        &:after {
          box-sizing: border-box;
        }
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      ul,
      li,
      h6,
      p,
      img,
      figure {
        margin: 0px;
        padding: 0px;
      }
    `}
  />
);

export default globalStyles;
