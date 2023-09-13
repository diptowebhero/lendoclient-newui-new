import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .swiper-slide {
    transition: all 300ms ease;
    opacity: 0.5;
    background: #fff;
    ${mediaQuery.md`
          opacity: 1;
      `}
  }
  .swiper-wrapper {
    padding: 10px 0;
  }
  .swiper-slide-active,
  .swiper-slide-prev,
  .swiper-slide-next,
  .swiper-slide-next + .swiper-slide {
    opacity: 1;
  }
  .headerWithPaginate {
    display: flex;
    justify-content: space-between;
    ${mediaQuery.sm`
          flex-direction: column;
          margin: 20px 0;
      `}
    .first {
      h2 {
        line-height: inherit;
        display: inline-block;
      }
    }
    .second {
      display: flex;
      gap: 20px;
      align-content: center;
      align-items: center;
      ${mediaQuery.md`
            align-content: flex-start;
      `}
      .next-prev {
        display: flex;
        gap: 10px;
        order: 1;
        .next,
        .prev {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border: 1px solid ${props => props.theme.colors.gray};
          transition: all 300ms ease;
          border-radius: 50%;
          position: relative;
          .anticon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          &:hover {
            border: 1px solid ${props => props.theme.colors.primary};
          }
        }
      }
      .swiper-pagination {
        bottom: auto;
        left: auto;
        position: relative;
        width: auto;
      }
    }
  }
  .collection-search-item {
    padding: 15px;
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 15px;
    min-height: 240px;
    .item {
      display: flex;
      flex-direction: column;
      grid-gap: 25px;
      .information {
        display: flex;
        grid-gap: 20px;
        align-items: center;
        flex: 1 1 100%;
        .avatar {
        }
        .names {
          .title {
            margin: 0;
            font-size: 0.9rem;
            font-weight: bold;
          }
          .owner {
            margin: 0;
            span {
              color: #000;
            }
          }
        }
      }
      .statistics {
        ul {
          display: flex;
          justify-content: space-between;
          li {
            text-align: center;

            span {
              display: block;
              &.title {
                color: #b1b1b1;
                font-size: 1rem;
              }
              &.value {
                font-weight: bold;
                color: #000;
                font-size: 1rem;
              }
            }
          }
        }
      }
      .nfts {
        ul {
          display: flex;
          justify-content: space-between;
          justify-items: center;
          align-items: center;
          align-self: center;
          flex-wrap: wrap;
          gap: 10px;
          li {
            img {
              border-radius: 10px;
              width: 58px;
              height: 58px;
            }
          }
        }
      }
    }
  }
`;

export default Style;
