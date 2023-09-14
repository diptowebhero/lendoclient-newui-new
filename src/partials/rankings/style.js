import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  background: url(assets/images/img/home_bg.png);
  background-position: top;
  background-size: cover;
  background-size: contain;
  background-repeat: no-repeat;
  background-position-y: top;

  .title-section {
    color: white;
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    margin-top: 50px;
    p {
      font-weight: 400;
      font-size: 14px;
      margin-top: 12px;
      line-height: 24px;
      color: #acacac;
      letter-spacing: 0.15px;
    }
  }
  .ant-select-selection-placeholder {
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
  }
  .ranking-flex-space {
    display: flex;
    justify-content: space-between;
  }
  .sorting {
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    height: 180px;
    display: flex;
    align-items: center;
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
  .bytime {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 10px;
    border: 1px solid #e46400;
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
      color: #acacac;
    }
    .sorttime:first-child {
      border-radius: 7px 0px 0px 7px;
    }
    .sorttime {
      cursor: pointer;
    }
    .sorttime.active {
      background-color: #e46400;
    }
    .sorttime:last-child {
      border-radius: 0 7px 7px 0px;
    }
  }

  .ant-form {
    margin-top: 29px;
  }

  .ant-pagination-item-link {
    background: #e46400;
    color: white;
  }
  .ant-select-selector {
    // background-color: #1A1C1E;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    position: relative;
    background-color: #1a1c1e;
    border: none;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .ant-select-item {
    // background-color:#1A1C1E;
    border: 1px solid #e46400;
  }
  .rc-virtual-list-holder {
    // background-color:#1A1C1E;
    border: 1px solid #e46400;
  }

  .ant-select-arrow {
    color: aliceblue;
    font-size: 15px;
    font-weight: 700;
  }

  .sortdropdowns,
  .dropdown {
    background: none;
    border: 1px solid #e46400;
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
      background: #2a2c2d;
    }
  }
  .sortdropdowns a.dropdown-item {
    font-weight: 700;
    font-size: 14px;
    color: white;
  }

  .dqGqwk .items {
    height: 32px;
  }

  .dqGqwk .items li {
    color: #acacac;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
  }

  .dqGqwk .items .active {
    color: #fff;
  }

  .ant-table {
    background: transparent;
    .ant-table-tbody > tr.ant-table-row:hover > td,
    .ant-table-tbody > tr > td.ant-table-cell-row-hover {
      background-color: transparent !important;
    }
  }
  .ant-select-dropdown {
    background-color: #2a2c2d !important;
  }
  .ant-select-item {
    color: white !important;
  }
  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background: #2a2c2d;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: transparent;
    border-radius: 50px;
    color: white;
  }
  @media (max-width: 768px) {
    .ranking-flex-space {
      flex-direction: column;
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
