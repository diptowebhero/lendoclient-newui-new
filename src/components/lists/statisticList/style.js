import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  ul {
    display: flex;
    padding: 20px 0;
    grid-gap: 35px;
    ${mediaQuery.lg`
        justify-content: center;
      `}
    li {
      .value {
        font-size: 2.2rem;
        margin-bottom: 5px;
        text-align: center;
      }
      .title {
        font-size: 0.9rem;
        color: #767676;
        text-transform: capitalize;
      }
    }
  }
`;

export default Style;
