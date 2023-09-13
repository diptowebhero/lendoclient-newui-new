import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .collection-detail {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 40px;
    .stats {
      ul {
        display: flex;
        gap: 40px;
        li {
          span {
            display: block;
            text-align: left;
            &.value {
              font-weight: bold;
              color:white;
              font-size: 1rem;
              line-height: 1;
              min-height: 31px;
              display: flex;
              align-items: center;
              gap: 6px;
              justify-content: center;
              img {
                max-width: 24px;
                height: auto;
                vertical-align: middle;
              }
            }
            &.title {
              color: ${props => props.theme.colors.gray};
              font-size: 1rem;
            }
          }
        }
      }
    }
    .social {
      ul {
        display: flex;
        gap: 15px;
        align-items: center;
        li {
          a {
            display: inline-block;
            svg {
              width: 20px;
              height: 20px;
              vertical-align: middle;
              color: ${props => props.theme.colors.gray};
            }
          }
          &:hover {
            svg {
              color: ${props => props.theme.colors.primary};
            }
          }
        }
      }
    }

    .ant-btn-ghost {
      color: white;
      border-color: #d9d9d9;
      background: #E46400;
      border: 1px solid #E46400;
    }
    
  }
  .ant-input,
  .search-input {
    background: #1A1C1E;
    border: none;
  }
  .ant-btn.default {
    color: white;
    border-color: #D66B29; 
  }
`;

export default Style;
