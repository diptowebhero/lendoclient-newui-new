import styled from "styled-components";

export const Style = styled.div`
  .nft-detail-hr {
    opacity: 0.5;
    color: #acacac;
  }
  .lazy-load-image-loaded {
    img {
      border-radius: 10px;
    }
  }
  .owner-actions {
    display: flex;
    justify-content: end;
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      li {
      }
    }
  }
  .about-collection {
    color: #acacac;
    padding: 4%;
  }
  .make-offer-btn {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
  .asset-file {
    width: 100%;
    height: auto;
    // border: 1px solid #c1c1c1;
    // background: #fff;
    border-radius: 10px img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .line {
    border-bottom: 1px solid #e6e6e6;
  }
  .item-description {
    background-color: #1a1c1e;
    padding: 25px 20px;
    h5 {
      color: white;
      font-weight: 700;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      column-gap: 11.96px;
      line-height: 0;
      margin-bottom: 20px;
    }
    p {
      color: #acacac;
      font-size: 14px;
    }
  }
  .section-title {
    font-size: 1.1rem;
    text-transform: capitalize;
    margin: 10px 0;
    font-weight: 500;
  }
  .paragraph {
    color: ${props => props.theme.colors.gray};
    font-size: 0.9rem;
  }
  .properties {
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
      min-height: 74px;
      padding: 0px 10px;
      grid-gap: 4px;

      li {
        background: #d66b29;
        border: 1px solid ${props => props.theme.colors.primary};
        border-radius: ${props => props.theme.borderRadius.defaultBorderRadius};
        padding: 10px;
        span {
          display: block;
          &.property-title {
            // color: ${props => props.theme.colors.primary};
            color: white;
            font-weight: 400;
            font-size: 0.625rem;
          }
          &.property-value {
            color: #fff;
            font-size: 1.25rem;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            margin: 6px 0px;
          }
          &.property-desc {
            font-size: 0.625rem;
            color: #e46400;
            background: white;
            border-radius: 10px;
            padding: 0px 2px;
          }
        }
      }
    }
  }
  .details {
    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
      color: #acacac;
      padding: 10px 20px;
      li {
        display: flex;
        margin-bottom: -10px;
        justify-content: space-between;
        flex-wrap: wrap;
        span {
          &.detail-title {
          }
          &.detail-value {
            font-weight: 500;
          }
        }
      }
    }
  }
  .collection-name {
    padding-top: 11px;
    .title {
      font-size: 1rem;
      margin-top: 10px;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
    }
  }
  .item-title {
    .title {
      margin-top: -7px;
      font-weight: 700;
      font-size: 35px;
      line-height: 42px;
      color: #ffffff;
      margin-bottom: 10px;
    }
  }
  .item-information {
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-top: 30px;
      li {
        font-size: 0.875rem;
        color: ${props => props.theme.colors.gray};
        font-weight: 100;
        display: flex;
        align-items: center;
        gap: 5px;
        /* text-transform: capitalize; */
        &.favorite-box {
          cursor: pointer;
          .anticon {
            font-size: 0.875rem;
            &.favorited {
              svg {
                fill: red;
              }
            }
          }
        }
      }
    }
  }
  .item-price-history {
    .chart-wrapper {
      height: 200px;
    }
  }
  .item-price {
    .time {
      display: flex;
      align-items: center;
      padding: 20px 0;
      gap: 10px;
      border-bottom: 1px solid #e6e6e6;
      span {
        font-size: 1.1rem;
        color: ${props => props.theme.colors.gray};
      }
    }
    .sale-box {
      .price {
        color: ${props => props.theme.colors.gray};
        padding: 10px 0;
        .description {
          margin: 0;
        }
        .amount {
          display: flex;
          gap: 10px;
          align-items: center;
          .quanity {
            background: rgba(0, 0, 0, 0.4);
            color: #fff;
            padding: 5px 10px;
            border-radius: 10px;
          }
          .network-value {
            font-size: 2rem;
            color: #ffffff;
            font-weight: 700;
          }
          .usd-value {
            font-size: 20px;
            line-height: 24px;
            font-weight: 700;
          }
          .info {
            font-size: 1.2rem;
            display: flex;
          }
        }
      }
      .actions {
        display: flex;
        gap: 10px;

        button {
          text-transform: capitalize;
          display: flex;
          align-items: center;
          gap: 5px;
          svg {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 12px 10px;
    border-radius: 0;
  }
  .ant-collapse-icon-position-end
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-arrow {
    right: 12px;
  }
  .ant-collapse-header-text {
    color: #fff;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 50px 0;
  }

  .ant-collapse-item {
    border-radius: 0.625rem !important;
    background: #1a1c1e;
    margin-bottom: 2%;
    padding: 24px;
    .ant-collapse-header {
      color: white;
      padding: 0 1px 0 10px;
    }
  }
`;

export default Style;
