import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  .hero-section {
    position: relative;
    width: 100%;
    .hero-image {
      position: relative;
      background: url("/assets/images/img/home_bg.png");
      height: 320px;
      margin-bottom: 90px;
      margin-top: 60px;
      border-radius: 10px;
      img.cover {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
      .hero-avatar {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -80px;
        border-radius: 50%;
        border: 2px solid #d66b29 !important;
        width: 155px;
        height: 155px;
        overflow: hidden;
        // background: ${props => props.theme.colors.primary};
        img.avatar {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .socials-box {
    position: absolute;
    top: -50px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    ${mediaQuery.md`
          position: relative;
          top:0;
          right: 0;
          justify-content: center;
          padding: 20px 0px;
      `}
    ul {
      display: flex;
      gap: 15px;
      align-items: center;
      li {
        a {
          display: block;
          svg {
            width: 20px;
            height: 20px;
            vertical-align: middle;
            color: ${props => props.theme.colors.gray};
          }
        }
        &:hover {
          svg {
            color: ${props => props.theme.colors.primary};
          }
        }
      }
    }
  }
  .account-information {
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    padding-bottom: 2rem;
    .title {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      grid-gap: 5px;
      h1 {
        color: #fff;
        text-align: center;
        font-size: 1.5625rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem; /* 96% */
        margin: 0;
      }
    }
    .details {
      padding: 20px 0;
      ul {
        display: flex;
        justify-content: center;
        grid-gap: 10px;
        li {
          position: relative;
          padding: 0 10px;
          font-size: 1rem;
          margin: 0;
          .ant-typography {
            margin: 0;
          }
          &:after {
            content: "";
            position: absolute;
            height: 10px;
            width: 1px;
            border-right: 1px solid ${props => props.theme.colors.borderColor};
            top: 50%;
            transform: translateY(-50%);
            left: 0;
          }
          &:first-child {
            &:after {
              display: none;
            }
          }
          &.wallet-address {
            color: white;
          }
          &.joined-time {
            color: ${props => props.theme.colors.gray};
          }
        }
      }
    }
    .account-description {
      text-align: center;

      .ant-typography {
        color: ${props => props.theme.colors.gray};
        font-size: 0.9rem;
      }
    }
  }
`;
export default Style;
