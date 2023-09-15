import styled from "styled-components";

export const Style = styled.div`
  .sliderCard {
    width: 100%;
  }
  .nft-list {
    .bidderimgs img {
      width: 30px;
      border-radius: 50%;
      border: 2px solid #acacac;
    }
    .bidderimgs img:nth-child(2),
    .bidderimgs img:nth-child(3) {
      margin-left: -15px;
    }

    display: grid;
    grid-template-columns: ${props =>
      props.size === "small"
        ? "repeat(auto-fill, minmax(200px, 1fr))"
        : props.size === "medium"
        ? "repeat(auto-fill, minmax(226px, 1fr))"
        : props.size === "large"
        ? "repeat(auto-fill, minmax(320px, 1fr))"
        : ""};
    grid-gap: ${props => props.theme.gaps.defaultGap};
    .nft-card {
      display: block;
      background: #fff;
      overflow: hidden;
      box-shadow: ${props =>
        props.size === "large" ? props.theme.shadows.cardShadows : "none"};
      border: ${props =>
        props.size === "large"
          ? "none"
          : `1px solid ${props.theme.colors.borderColor}`};
      border-radius: 15px;

      .top {
        position: relative;
        overflow: hidden;
        /* height: ${props =>
          props.size === "small"
            ? "250px"
            : props.size === "medium"
            ? "300px"
            : props.size === "large"
            ? "400px"
            : ""}; */
        .hover-box {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 99;

          .padding-box {
            padding: 20px;
            .collection-title {
              display: flex;
              grid-gap: ${props => (props.size === "large" ? "10px" : "5px")};
              font-weight: 500;
              justify-content: center;
              align-content: center;
              align-items: center;
              font-size: ${props =>
                props.size === "large" ? "1rem" : "0.8rem"};
              color: #fff;
              position: absolute;
              top: 20px;
              img {
                border-radius: 50%;
                max-width: 32px;
                height: auto;
              }
            }
            .owner {
              position: absolute;
              bottom: 20px;
              color: #fff;
              a {
                color: #fff;
              }
              .avatar {
                color: #fff;
                width: ${props =>
                  props.size === "large" ? "35px" : "26px !important"};
                height: ${props =>
                  props.size === "large" ? "35px" : "26px !important"};
                .paper {
                  width: ${props =>
                    props.size === "large" ? "35px" : "26px !important"};
                  height: ${props =>
                    props.size === "large" ? "35px" : "26px !important"};
                  svg {
                    width: ${props =>
                      props.size === "large" ? "35px" : "26px !important"};
                    height: ${props =>
                      props.size === "large" ? "35px" : "26px !important"};
                  }
                }

                img {
                  width: ${props =>
                    props.size === "large" ? "35px" : "26px !important"};
                  height: ${props =>
                    props.size === "large" ? "35px" : "26px !important"};
                }
              }
            }
          }
        }
        img {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1) !important;
        }
      }
      .bottom {
        border: none;
      }
      .content {
        padding: ${props => (props.size === "large" ? "20px" : "15px")};
        min-height: 118px;
        .item-title {
          margin-bottom: 20px;
          font-size: ${props =>
            props.size === "large" ? "1.1rem" : "0.9375rem"};
          font-weight: 500;
          color: white;
        }

        .information {
          .title {
            color: ${props => props.theme.colors.gray};
            font-weight: 100;
            font-size: ${props =>
              props.size === "large" ? "0.9rem" : "0.8rem"};
          }
          .value {
            color: #000;
            font-weight: 100;
            display: flex;
            text-transform: uppercase;
            font-size: ${props =>
              props.size === "large" ? "0.9rem" : "0.8rem"};
            color: ${props => props.theme.colors.gray};
            &.timer {
              text-transform: lowercase;
            }
          }
          .circle {
            margin-left: -6px;
            margin-right: 4px;
            display: inline-block;
            @keyframes highlight-o {
              0% {
                transform: translate(-50%, -50%) scale(0.8);
              }

              20% {
                transform: translate(-50%, -50%) scale(1);
              }

              40% {
                transform: translate(-50%, -50%) scale(1);
              }

              100% {
                transform: translate(-50%, -50%) scale(0.8);
              }
            }
            @keyframes hightlight-t {
              0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.1);
              }

              50% {
                opacity: 0.6;
              }

              100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1);
              }
            }
            .blink {
              display: inline-block;
              position: relative;
              width: 22px;
              height: 22px;
              vertical-align: middle;
              .inside {
                display: inline-block;
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 9999px;
                background-color: ${props => props.theme.colors.gray};
                top: 50%;
                left: 50%;
                opacity: 0;
                animation: 1.6s ease-out 0s infinite normal none running
                  hightlight-t;
              }
              .outside {
                display: inline-block;
                position: absolute;
                width: 8.8px;
                height: 8.8px;
                background-color: ${props => props.theme.colors.gray};
                border-radius: 9999px;
                top: 50%;
                left: 50%;
                animation: 1.6s linear 0s infinite alternate none running
                  highlight-o;
              }
            }
          }
        }
      }
      &:hover {
        .top {
          .hover-box {
            opacity: 1;
          }
          img {
            transform: scale(1.05);
          }
        }
      }
    }
  }
`;

export default Style;
