import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
.copytight-links {
  ul {
    display: flex;
    grid-gap: 10px;
    justify-content: flex-end;
    ${mediaQuery.md`
      justify-content: center;
   `}
    li {
      h3{
        color: #fff;
      }
      .icon-title {
          display: block;
          padding: 5px;
          width: 30px;
          height: 30px;
          background: ${props => props.theme.colors.secondaryPrimary};
          border-radius: 8px;
          position: relative;
          transition: all 300ms ease;
          svg {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          &:hover {
            transform: translate3d(0px, -2px, 0px);
          }
      }
    }
  }
}
.footer-hr{
  opacity:0.5;
}
.home-footer-section {
  .bottom-line{
    z-index:99;
    position: relative;
    font-size: medium;
    .copyright-text{
      color:white;
    }
    .copytight-links {
      ul {
        display: flex;
        grid-gap: 10px;
        justify-content: flex-end;
        ${mediaQuery.md`
          justify-content: center;
       `}
        li {
          a {
            color: #fff;
            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
    }
  }

  .footer {
    background:#1A1C1E;
    z-index:99;
    .logos {
      background:#404242;
      ul {
        padding: 10px 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        grid-column-gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
        li {
          transition: all 0.15s ease;
          margin: 10px 0;
          opacity: 0.7;
          svg {
            width: 300px;
            height: 80px;
            fill: rgba(251, 253, 255, 1);
            .trust-wallet,
            .YCombinatorLogo--square,
            .TrustWalletLogo--frame {
              fill: none;
              stroke: rgba(251, 253, 255, 0.75);
            }
            .YCombinatorLogo--letters {
              fill: inherit;
            }
          }
          &:hover {
            opacity: 1;
          }
        }
      }
    }
    /*.email-send-btn{
      background: #E46400;
      color: white;
      margin-top:-1%;
      margin-left:-13%;
    }*/
    .footer-wrapper {
      background:#1A1C1E;
      padding: 40px 0 20px 0;
      .top {
        color: #fff;
        .title {
          color: #fff;
          font-size: 1.2rem;
          font-weight: bold;
        }
        .desc {
          max-width: 480px;
        }
        .newsletter {
          ${mediaQuery.lg`
            margin-bottom: 30px
         `}
          .input-section {
            flex: 1 1 20px;
          }
          .button-section {
            flex: 0 0 auto;
          }
          .ant-form-item-explain-error,
          .ant-form-item-explain {
            display: none !important;
          }
          .ant-form-inline .ant-form-item-with-help {
            margin-bottom: 0 !important;
          }
          .ant-input {
            border: 0.5px solid #ACACAC;
            background: none;
          }
          .ant-input::placeholder {
            color: #999;
          }
          /* .ant-input-lg {
            padding: 11.5px 11px;
          } */

          /*.ant-form-item,
          .ant-input-lg {
            ${mediaQuery.lt`
               width: 100%;
           `}
          }*/
          .ant-btn {
            ${mediaQuery.lt`
                margin-top: 10px;
           `}
          }
        }
        .social {
          ul {
            display: flex;
            grid-gap: 10px;
            margin-top: 30px;
            li {
              a {
                display: block;
                padding: 5px;
                width: 40px;
                height: 40px;
                background: ${props => props.theme.colors.secondaryPrimary};
                border-radius: 8px;
                position: relative;
                transition: all 300ms ease;
                svg {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                }
                &:hover {
                  transform: translate3d(0px, -2px, 0px);
                }
              }
            }
          }
        }
      }
      .bottom {
        color: #94989C;
        padding-top: 20px;
        .company-description {
          img {
            margin-bottom: 10px;
            max-width: 200px;
            height: auto;
          }
        }
        .footer-menu {
          ${mediaQuery.lg`
          margin-bottom: 20px
        `}
          h6 {
            color: #fff;
            font-size: 0.9rem;
            font-weight: bold;
          }
          ul {
            margin-top: 10px;
            li {
              a {
                color: #94989C;
                font-weight: 400;
                display: block;
                padding-bottom: 7px;
                text-transform: capitalize;
                &:hover {
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
      .copyright {
        border-top: 1px solid #bb9f57;
        margin-top: 20px;
        padding-top: 20px;
        color: #fff;
        font-size:larger ;
        ${mediaQuery.md`
              text-align: center;
      `}
        
      }
    }
  }
}
`;

export default Style;
