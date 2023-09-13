import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`

  background: url(assets/images/img/home_bg.png);  
  background-position: top;
  background-size: cover;
  background-size: contain;
  background-repeat: no-repeat;
  background-position-y: top;

  .title-section{
    color: white;
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    p{
     font-weight: 400;
     font-size: 14px;
     margin-top: 12px;
     line-height: 24px;
     color: #ACACAC;
    }
  }
  .sorting {
    border-top: 1px solid white;
    border-bottom: 1px solid white;
  }
  table {
    background-color: transparent !important;
    .rank-item {
      color: white;
      font-weight: 500;
      .rank {
        min-width: 20px;
        display: inline-block;
      }
    }
  }
  .bytime{
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 10px;
    border: 1px solid #E46400;
    .sorttime {
      width: 65px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      color: #ACACAC;
    }
    .sorttime:first-child {
      border-radius: 7px 0px 0px 7px;
    }
    .sorttime {
      cursor: pointer;
    }
    .sorttime.active {
      background-color: #E46400;
    }
    .sorttime:last-child {
      border-radius: 0 7px 7px 0px;
    }
  }
  .ant-pagination-item-link{
    background: #E46400;
    color: white;
  }
  .ant-select-selector{
    // background-color: #1A1C1E;
    
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector  {
    position: relative;
    background-color:#1A1C1E;
    border: none;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .ant-select-item {
    // background-color:#1A1C1E;
    border: 1px solid #E46400;

  }
  .rc-virtual-list-holder{
    // background-color:#1A1C1E;
    border: 1px solid #E46400;

  } 

  .ant-select-arrow{
    color: aliceblue;
    font-size: 15px;
    font-weight: 700;
  }

  .sortdropdowns ,.dropdown {
    background: none;
    border: 1px solid #E46400;
    border-radius: 180px;
    font-size: 14px;
    color: white;
    height: 47px;
    element.style {
      position: absolute;
      inset: 0px auto auto 0px;
      margin: 0px;
      transform: translate3d(0px, 35px, 0px);
    }
    ul.dropdown-menu.show {
      background: #2A2C2D;
    }
  }
  .sortdropdowns a.dropdown-item {
    font-weight: 700;
    font-size: 14px;
    color: white;
  }
  

  .ant-table{
    background: transparent;
    .ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody > tr > td.ant-table-cell-row-hover{
      background-color: transparent !important;
    }
  }
  .ant-select-dropdown{
    background-color: #2A2C2D !important;
  }
  .ant-select-item{
    color: white !important;
  }
  .ant-select-item-option-active:not(.ant-select-item-option-disabled){
    background: #2A2C2D;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: transparent;
    border-radius: 50px;
    color: white;
  }
  .main-sidebar-section {
    display:block;
    ${mediaQuery.lg`
      display:none;
   `}
  }
`;

export default Style;
