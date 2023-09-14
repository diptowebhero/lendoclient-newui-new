import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  // display: flex;
  // justify-content: space-between;
  // padding-bottom: 30px;
  .titles {
    font-family: "Fira Sans", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #ffffff;
    margin-bottom: 6px;
    // letter-spacing: -1px;
    letter-spacing: 0.15px;
    .text_orange {
      color: #e46400 !important;
    }
  }
  .title_2 {
    font-family: "Fira Sans", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.15px;
    color: #ffffff;
    // margin-bottom:6px;
  }
  .form-text {
    font-family: "Fira Sans", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #acacac;
  }
  .viewallbtn {
    background: #e46400;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
    max-width: 150px;
    width: 100%;
    height: 40px;
    display: flex;
    border: none;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
  }

  // ${mediaQuery.sm`
  //         flex-direction: column;
  //     `}
  // h2 {
  //   text-transform: capitalize;
  // }
`;

export default Style;
