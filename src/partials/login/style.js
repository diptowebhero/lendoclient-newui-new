import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  .login-page {
    max-width: 600px;
    margin: 0 auto;
    p {
      color: ${props => props.theme.colors.gray};
    }
    ul {
      li {
        padding: 0 10px;
        border-radius: 7px;
        min-height: 42px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        transition: all 300ms ease;
        border: 1px solid rgba(0, 0, 0, 0.2);
        width: 100%;
        pointer-events: all;
        color: #000;
        cursor: pointer;
      }
    }
  }
`;

export default Style;
