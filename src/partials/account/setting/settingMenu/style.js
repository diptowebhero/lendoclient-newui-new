import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  padding-right: 30px;
  ${mediaQuery.md`
        min-height: auto;
      `}
  .title {
    font-size: 0.9rem;
    font-weight: normal;
    margin-bottom: 20px;
    text-transform: capitalize;
    margin-left: 20px;
    margin-bottom: 20px;
  }
  ul {
    display: flex;
    li {
      margin-right:3%;
      a {
        display: flex;
        padding: 10px 0;
        gap: 10px;
        align-items: center;
        margin-bottom: 10px;
        color: ${props => props.theme.colors.white};
        border-radius: ${props => props.theme.borderRadius.defaultBorderRadius};
        transition: ${props => props.theme.transitions.defaultTransition};
        font-weight: 500;
        font-size: 1rem;
        padding: 13px 53px;

        .anticon {
          margin-left: 10px;
        }
        span {
        }
        &.active,
        &:hover {
          background: #2A2C2D;
          border-radius: 180px;
          color: ${props => props.theme.colors.white};
        }
      }
    }
  }
`;

export default Style;
