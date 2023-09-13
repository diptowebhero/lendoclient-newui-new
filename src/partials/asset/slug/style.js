import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  .nft-detail-hr{
    opacity:0.5;
    color:#ACACAC;
  }
  .lazy-load-image-loaded{
    img{
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
  .about-collection{
     color:#ACACAC;
     padding: 4%;
  }
  .make-offer-btn{
    width: 100%;
    justify-content: center;
    text-align: center;
  }
  .asset-file {
    width: 100%;
    height: auto;
    // border: 1px solid #c1c1c1;
    // background: #fff;
    border-radius: 10px
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px
    }
  }
  .line {
    border-bottom: 1px solid #e6e6e6;
  }
  .item-description {
    background-color: #1A1C1E;
    padding: 25px 20px;
    h5 {
      color: white;
      font-weight: 700;
      font-size: 1.25rem;
    }
    p {
      color: #ACACAC;
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
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      grid-gap: 10px;
      li {
        background: #D66B29;
        border: 1px solid ${props => props.theme.colors.primary};
        border-radius: ${props => props.theme.borderRadius.defaultBorderRadius};
        padding: 10px;
        span {
          display: block;
          &.property-title {
            // color: ${props => props.theme.colors.primary};
            color: white;
            font-weight: 100;
            font-size: 0.8rem;
          }
          &.property-value {
            font-weight: 700;
            color: white;
          }
          &.property-desc {
            font-size: 0.7rem;
            color:black;
            background: white;
            border-radius:10px;

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
      color:#ACACAC;
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
    .title {
      font-size: 1rem;
      margin-top: 10px;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px
    }
  }
  .item-title {
    .title {
      margin-top: -7px;
      font-weight: 700;
      font-size: 35px;
      line-height: 42px;
      color: #FFFFFF;
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
        font-size: 1rem;
        color: ${props => props.theme.colors.gray};
        font-weight: 100;
        display: flex;
        align-items: center;
        gap: 5px;
        /* text-transform: capitalize; */
        &.favorite-box {
          cursor: pointer;
          .anticon {
          font-size: 1.3rem;
          &.favorited {
            svg {
                fill: red;
            }
          }
        }
        }
       
        .
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
            background: rgba(0,0, 0, 0.4);
            color: #fff;
            padding: 5px 10px;
            border-radius: 10px;
          }
          .network-value {
            font-size: 2rem;
            color: #FFFFFF;
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
    right: 0;
  }
  .ant-collapse-header-text {
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: capitalize;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 50px 0;
  }
  
  .ant-collapse-item{
    background:#1A1C1E;
    borderRadius:10px;
    margin-bottom:2%;
    .ant-collapse-header{
      color:white ;
      padding: 0 1px 0 10px

    }
  }
  

`;

export default Style;
