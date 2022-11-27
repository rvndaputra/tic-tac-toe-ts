import { css } from "@emotion/css";

export const playerCss = css`
  width: 100%;
  padding: 8px;
  background: lightgrey;
  border-radius: 8px;
  text-align: center;

  &.blue {
    border: 1px solid blue;
    background: lightblue;
  }

  &.yellow {
    border: 1px solid green;
    background: lightgreen;
  }
`;
