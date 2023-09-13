import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  // display: flex;
  // justify-content: space-between;
  // padding-bottom: 30px;
  .titles{
    font-family: 'Fira Sans', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    margin-bottom:6px;
    // letter-spacing: -1px;
    letter-spacing: 0.15px;
    .text_orange {
         color: #E46400 !important;
    }
  }
  .title_2{
    font-family: 'Fira Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.15px;
    color: #FFFFFF;
    // margin-bottom:6px;
  }
  .form-text {
    font-family: 'Fira Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #ACACAC;
}
  .viewallbtn {
    background: #E46400;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    padding: 10px 40px;
    border: none;
    border-radius: 50px;
  }
  
  // ${mediaQuery.sm`
  //         flex-direction: column;
  //     `}
  // h2 {
  //   text-transform: capitalize;
  // }
`;

export default Style;
