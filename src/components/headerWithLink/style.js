import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  .titles {
    font-size: 25px;
    font-weight: 700;
    color: white;
    .text_orange {
      color: #e46400 !important;
    }
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
  .custom-btn-span {
    font-size: 25px;
    font-weight: 700;
  }
  ${mediaQuery.sm`
          flex-direction: column;
      `}
  h2 {
    text-transform: capitalize;
  }

  .custom-menu-item {
    span {
      font-weight: 700;
      font-size: 14px;
      color: white;
    }
  }
`;

export default Style;
