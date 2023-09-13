import { css } from "styled-components";

export const sizes = {
  xxl: 1280,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  lt: 480, // little
  xs: 400,
  xxs: 360,
};

const mediaQuery = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export default mediaQuery;


