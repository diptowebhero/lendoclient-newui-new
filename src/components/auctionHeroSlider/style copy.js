import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .swiper {
    width: 374px;
    height: auto;
    ${mediaQuery.lt`
          width: 100%;
      `}
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-weight: bold;
    color: #fff;
  }
  .auction-slider-card {
    position: relative;
    display: block;
    background: #fff;
    overflow: hidden;
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 10px 0px;
    transition: box-shadow 0.3s ease-in 0s;

    .top {
      img {
        width: 374px;
        height: 374px;
        object-fit: cover;
      }
    }
    .bottom {
      .content {
        padding: 20px 0 20px 20px;
        .title {
          font-weight: 500;
          font-size: 1.1rem;
          margin-bottom: 0;
          margin-top: 15px;
          color: #000;
        }
        .price {
          font-size: 1.5rem;
        }
      }
      .auction-type {
        position: absolute;
        right: 0;
        bottom: 25px;
        background: #000;
        color: #fff;
        padding: 15px 40px;
        border-radius: 100px 0px 0px 100px;
        p {
          margin: 0;
          text-transform: capitalize;
        }
      }
    }
    &:hover {
      box-shadow: rgb(4 17 29 / 25%) 0px 0px 50px 0px;
    }
  }
`;

export default Style;


