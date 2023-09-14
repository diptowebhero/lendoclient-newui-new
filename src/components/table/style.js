import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  width: 100%;
  background: transparent !important;
  .ant-table {
    background: transparent !important;
  }
  .ant-table-thead,
  .ant-table-cell {
    background: transparent !important;
  }
  .kXcXzM span {
    color: white;
  }
  .ant-table-thead > tr > th {
    color: #acacac;
    background-color: transparent;
    text-transform: capitalize;
    font-weight: 400;
    font-size: 0.9rem;
    &:before {
      display: none;
    }
  }
  .ant-table-cell-row:hover {
    background-color: initial;
    color: initial;
  }

  .ant-table-thead {
    background-color: #1a1c1e;
    color: white;
  }
  .ant-table-tbody > tr > td {
    background-color: #1a1c1e;
    color: white;
    font-weight: 400;
    font-size: 0.875rem;
  }
  .ant-table-expanded-row {
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      ${mediaQuery.md`
         flex-direction: column;
         justify-content: start;
         grid-gap: 10px
      `}
      li {
        .title {
          text-transform: capitalize;
        }
        .value {
          font-weight: 400;
        }
      }
    }
  }
  .expand-only-in-mobile {
    .ant-table-row-expand-icon-cell,
    .ant-table-row-expand-icon-cell,
    colgroup {
      display: none;
      ${mediaQuery.lg`
         display: table-cell;
      `}
    }
  }

  /**** Table pagination ****/
  .ant-pagination-item-container {
    .ant-pagination-item-ellipsis {
      color: #888888;
    }
  }
  .ant-pagination-total-text {
    color: #888888;
  }
  .ant-pagination-item-link {
    background: #e46400;
    color: white;
    border: none;
  }
  .ant-pagination-item {
    background: #1a1c1e;
    border: none;
    a {
      color: white;
    }
  }
  .ant-pagination-item-active {
    font-weight: 500;
    background: #fff;
    border-color: #d66b29;
    a {
      color: black;
    }
  }
  .ant-pagination-item-active a {
    color: black;
  }
`;

export default Style;
