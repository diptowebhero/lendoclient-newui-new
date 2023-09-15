import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .swiper-slide {
    transition: all 300ms ease;
    opacity: 0.5;
    // background: #fff;
    // width: 300px !important;
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
      font-size: 25px;
      font-weight: 700;
      color: white;
      .text_orange {
        color: #e46400 !important;
      }
      h2 {
        line-height: inherit;
        display: inline-block;
      }
    }

    .collection-full-slider {
      width: 95%;
    }
    // .swiper-slide.s_my_class.swiper-slide-active {
    //   width: 350px !important;
    // }
    .second {
      display: flex;
      gap: 10px;
      margin-right: 4%;
      .next,
      .prev {
        cursor: pointer;
        width: 35px;
        height: 35px;
        // border: 1px solid ${props => props.theme.colors.gray};
        transition: all 300ms ease;
        border-radius: 10px;
        background: #2a2c2d;
        color: white;
        // border-radius: 50%;
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
      .next {
      }
      .prev {
      }
    }
  }
`;

export default Style;
