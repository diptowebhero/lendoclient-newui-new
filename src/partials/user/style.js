import styled from "styled-components";

export const Style = styled.div`
  .ant-select-arrow {
    color: white !important;
  }
  .readMoreBtn {
    background: transparent;
    border: 0;
    border-bottom: 1px solid #e46400 !important;
    color: #e46400;
    text-align: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 171.429% */
    letter-spacing: 0.00938rem;
    cursor: pointer;
  }
  .profile-menu {
    ul {
      display: flex;
      gap: 10px;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        a {
          display: block;
          padding: 5px 20px;
          color: ${props => props.theme.colors.gray};
          border: 2px solid transparent;
          border-radius: 10px;
          text-transform: capitalize;
          &:hover,
          &.active {
            color: white;
            background: #2a2c2d;
            border-radius: 180px;
          }
        }
      }
    }
  }
  .search-input {
    background: #1a1c1e;
    border: none;
    .ant-input {
      background: #1a1c1e;
    }
  }

  .ant-checkbox-wrapper {
    color: white;
  }
`;

export default Style;
