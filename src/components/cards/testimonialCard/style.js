import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  .ant-typography {
    margin-bottom: 0;
    color: ${props => props.theme.colors.paragraph};
    padding-top: 0.1em;
  }
  .collection-card {
    .member-info {
      ${mediaQuery.lg`
      padding:0;
    `}
      .background-img-member {
        width: 70px;
        height: auto;
        top: 20px;
      }
      .img-member {
        width: 70px;
        height: auto;
      }
    }
    .title {
      margin-bottom: 0;
      font-size: 1.1rem;
      font-weight: 900;
    }
    background: #fff;
    .collection-card-wrapper {
      ${mediaQuery.md`
        text-align:center;
      `}
      border: 2px solid #e6e6e6;
      border-radius: 15px;
      overflow: hidden;
      transition: all 300ms ease;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      padding: 35px 35px;
    }
    .texts-wrapper {
      ${mediaQuery.lg`
        padding-top:15px;
      `}
    }
    .row {
      display: flex;
      align-items: center;
      ${mediaQuery.md`
        flex-direction:column;
        justify-content:center;
        `}
    }
  }
  p {
    color: ${props => props.theme.colors.gray};
  }
`;

export default Style;








