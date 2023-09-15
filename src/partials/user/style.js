import styled from "styled-components";

export const Style = styled.div`
  .ant-select-arrow {
    color: white !important;
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
