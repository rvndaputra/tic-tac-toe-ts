import { css } from "@emotion/css";

export const boardStyle = css`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  max-width: fit-content;
`;

export const playerStyle = css`
  display: flex;
  gap: 5px;
  margin: 5px;
`;
