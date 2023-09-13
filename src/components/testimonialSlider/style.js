import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .swiper-slide {
    transition: all 300ms ease;
    background: #fff;
    padding-left: 1em;
  }
  .swiper-wrapper {
    // padding: 10px;
  }
  .swiper-slide-active,
  .swiper-slide-prev,
  .swiper-slide-next,
  .swiper-slide-next + .swiper-slide {
    opacity: 1;
  }
  .headerWithPaginate {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ${mediaQuery.sm`
      flex-direction: column;
      margin: 20px 0;
      `}
    ${mediaQuery.md`
      justify-content: center;
      `}
    .first {
      h2 {
        line-height: inherit;
        display: inline-block;
      }
    }
    .second {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1em;
      .next-prev {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
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
          ${mediaQuery.md`
          display: none;
            `}
          &:hover {
            border: 1px solid ${props => props.theme.colors.primary};
          }
        }
        .next {
        }
        .prev {
        }
      }
    }
    .swiper-pagination {
      position: relative;
      width: 100%;
      padding-top: 1.1rem;
      ${mediaQuery.md`
      padding-top:0;
      `}
    }
  }
`;

export default Style;
