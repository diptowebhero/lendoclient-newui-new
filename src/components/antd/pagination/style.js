import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .ant-pagination-total-text {
    ${mediaQuery.md`
          display: block;
      `}
  }
  .ant-pagination {
    li {
      margin-bottom: 8px;
    }
  }

  .ant-pagination-item-container{
    .ant-pagination-item-ellipsis{
      color:#888888;
    }
  }
  .ant-pagination-total-text{
    color:#888888;
  }
  .ant-pagination-item-link{
    background: #E46400;
    color:white;
    border:none;
  }
  .ant-pagination-item{
    background: #1A1C1E;
    border: none;
    a {
      color:white;
    }
  }
  .ant-pagination-item-active {
    font-weight: 500;
    background: #fff;
    border-color: #d66b29;
    a {
      color:black;
    }
  }
  .ant-pagination-item-active a {
    color:black;
  }
  
`;

export default Style;
