import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .error-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    .image {
      img {
        max-width: 500px;
        height: auto;
      }
    }
    .info {
      h4 {
        color: ${props => props.theme.colors.primary};
      }
      h1 {
        font-size: 5rem;
        margin: 0;
      }
      .short-description {
        display: inline-block;
        background: #000;
        border-radius: 10px;
        color: #fff;
        font-weight: 300;
        padding: 5px 20px;
        font-size: 1rem;
      }
      .long-description {
        color: ${props => props.theme.colors.gray};
      }
    }
  }
`;

export default Style;
