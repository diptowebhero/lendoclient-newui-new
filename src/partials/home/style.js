import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  position: relative;
  .main-banner-img {
    background: url(assets/images/img/home_bg.png);
    background-position: top;
    background-size: cover;
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: top;
  }
  .topcollection span {
    font-size: 25px;
    font-weight: 700;
    color: white;
  }

  .topcollection .dropdown span i {
    color: #e46400;
  }

  .topcollection .dropdown-toggle::after {
    display: none;
  }

  .topcollection .dropdown > a,
  .topcollection .dropdown > a:active {
    font-size: 25px;
    font-weight: 700;
    color: #e46400;
    border: none;
  }
  .custom-menu-item {
    font-weight: 700;
    font-size: 14px;
    color: white;
  }
  .custom-btn {
    border: none;
    margin-top: -3%;
    margin-left: -9%;
  }
  .custom-btn:hover {
    background-color: transparent;
    color: inherit;
  }
  .custom-btn-icon {
    color: #d66b29;
    font-size: 20px;
  }

  .allcollections {
    color: #acacac;
    cursor: pointer;
  }

  .allcollections i {
    font-size: 12px;
    color: #acacac;
  }

  .upper {
    font-size: 13px;
  }

  .lower {
    font-size: 11px;
  }

  .lable_no {
    font-size: 10px;
  }

  .nftimg {
    border-radius: 50%;
  }

  .nftimg img {
    border-radius: 50%;
    width: 39px;
    height: 39px;
    border: 2px solid #acacac;
  }

  .upper .percent {
    color: #56bb3e;
    font-weight: 700;
  }

  .nftname {
    font-weight: 700;
    font-size: 12px;
    line-height: 14.4px;
  }

  span.checkicon {
    font-size: 10px;
    color: #e46400;
  }

  .collectionlable.active {
    background: #2a2c2d;
    padding: 8px 0;
    border-radius: 10px;
  }
  .collectionlable {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    color: white;
  }

  .dash {
    color: #9e9e9e !important;
  }

  .red {
    color: #ff2323 !important;
  }

  .polygon-shape {
    position: absolute;
    z-index: 10;
    top: -270px;
    right: -385px;
    width: 857px;
    height: 882px;
  }
  .hero-section {
    padding-bottom: 100px;

    position: relative;
    .hero-section--shapes {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url("/assets/images/hero-shape.svg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: bottom;
      top: 0;
    }

    .hero-section--head {
      ${mediaQuery.lg`
        text-align: center;
      `}
      h1 {
        font-size: 4rem;
        white-space: pre-line;
        margin-bottom: 0;
        ${mediaQuery.lg`
         font-size: 3rem;
      `}
        ${mediaQuery.lt`
         font-size: 2.5rem;
      `}
              ${mediaQuery.xs`
         font-size: 2.2rem;
      `}
      b {
          color: ${props => props.theme.colors.primary};
        }
      }
      .slogan {
        color: ${props => props.theme.colors.gray};
        font-size: 1.5rem;
        margin-top: 10px;
      }
    }
    .hero-section--call-to-actions {
      margin-top: 3rem;
      ul {
        display: flex;
        grid-gap: 20px;
        ${mediaQuery.lg`
        justify-content: center;
      `}
      }
    }
    .hero-section--statistics {
      margin-top: 60px;
      ${mediaQuery.lg`
      margin: 0;
      `}
      ${mediaQuery.xl`
      margin-top: 30px;
    `}
    }
    .hero-section--slider {
      float: right;
      ${mediaQuery.lg`
      float: none;
      margin-top: 2rem;
      `}
    }
    .learn-more {
      display: block;
      ${mediaQuery.lg`
      text-align: center;
      `}

      a {
        font-size: 0.75rem;
      }
    }
  }
  .shape-section {
    position: relative;
    .shape {
      position: absolute;
      bottom: -30px;
      z-index: -28;
      left: -250px;
      opacity: 0.3;
    }
  }
  .video-section {
    position: relative;
    padding-bottom: 80px;
    padding-top: 200px;
    .shape {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url("/assets/images/video-background-shape.svg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top center, 50%, 50%;
      z-index: -1;
      left: 0;
      top: 0;
    }
  }

  .main-sidebar-section {
    display: block;
    ${mediaQuery.lg`
      display:none;
   `}
  }
`;

export default Style;
