import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  .titles{
    font-size: 25px;
    font-weight: 700;
    color: white;
    .text_orange {
         color: #E46400 !important;
    }
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
  .custom-btn-span{
    font-size:25px;
    font-weight:700;
  }
  ${mediaQuery.sm`
          flex-direction: column;
      `}
  h2 {
    text-transform: capitalize;
  }
  
  .custom-menu-item{
    span{
      font-weight: 700;
      font-size: 14px;
      color: white;
    }
  }
`;

export default Style;
