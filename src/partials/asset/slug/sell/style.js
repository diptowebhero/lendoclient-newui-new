import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  .form {
    .list-type {
      .ant-radio-group {
        width: 100%;
        text-align: center;
        .ant-radio-button-wrapper {
          width: 50%;
          height: auto;
          padding: 30px 0;
          line-height: normal;
          background: #fafafa;
          svg {
            width: 24px;
            height: 24px;
          }
          .type-title {
            padding: 0;
            margin: 0;
          }
          &.ant-radio-button-wrapper-checked {
            background: #fcf0e8;
            * {
              color: #35383f;
            }
          }
        }
      }
    }
  }
  .summary {
    ul {
      display: flex;
      flex-direction: column;
      gap: 5px;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
      }
    }
    hr {
      border-color: #e6e6e6;
    }
  }
  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .label {
      font-size: 1.5rem;
      font-family: 500;
    }
    .value {
      font-weight: 500;
    }
  }

  .asset-item {
    border: 1px solid ${props => props.theme.colors.borderColor};
    background: #fff;
    .top {
      margin-bottom: 10px;
      img {
        max-width: 100%;
      }
    }
    .bottom {
      padding: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: space-between;
      align-items: center;

      .titles {
        display: flex;
        flex-direction: column;
        .collection-name {
          font-size: 0.8rem;
          color: ${props => props.theme.colors.gray};
          font-weight: 500;
        }
        .item-name {
          font-weight: 500;
          font-size: 1.2rem;
          margin: 0;
        }
      }
      .price {
        display: flex;
        flex-direction: column;
        justify-content: end;
        .label {
          font-size: 0.8rem;
          color: ${props => props.theme.colors.gray};
        }
        .value {
          font-weight: 500;
          font-size: 1.2rem;
        }
      }
    }
  }
`;

export default Style;
