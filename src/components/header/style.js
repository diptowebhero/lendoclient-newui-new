import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  background: ${props => props.theme.colors.secondaryBackground};
  position: fixed;
  z-index: 999;
  width: 100vw;
  padding: 15px 0;
  overflow: ${props => props.overflow};
  // margin-top:-5%;

  .circle-shape {
    position: absolute;
    width: 444px;
    height: 266px;
    background-image: url("/assets/images/circle-shape.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    top: -40px;
    z-index: 1;
    left: -10px;
    ${mediaQuery.lg`
      display: none;
      `}
  }

  .polygon-shape {
    position: absolute;
    z-index: 10;
    top: -270px;
    right: -385px;
    width: 857px;
    height: 882px;
  }
  .mobile-search {
    width: 100%;
    background: ${props => props.theme.colors.secondaryBackground};
    z-index: 2;
    height: 50px;
    display: none;
    .mobile-search-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      grid-gap: 10px;
      .close {
        position: relative;
        flex: 0 0 40px;
        font-size: 1.1rem;
        color: ${props => props.theme.colors.gray};
        cursor: pointer;
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &:hover {
          color: ${props => props.theme.colors.primary};
        }
      }
      .search {
        flex: 0 0 90%;
        .ant-input-affix-wrapper,
        input {
          background: #fff;
        }
      }
    }
  }
  .logo {
    img {
      width: 160px;
      height: auto;
      max-width: 100%;
    }
  }
  .ogo-bar-right-true {
    display: flex;
  }
  .arrow-bar-right-true {
    margin-right: 12%;
    background: #e46400;
    color: white;
    padding: 3%;
    border-radius: 7px;
    font-size: 20px;
    width: 17%;
    display: none;
    ${mediaQuery.lg`
      display: block;
    `}
  }
`;
export default Style;
