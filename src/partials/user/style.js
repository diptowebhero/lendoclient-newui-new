import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
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
            background: #2A2C2D;
            border-radius: 180px;
          }
        }
      }
    }
  }
  .search-input{
      background: #1A1C1E;
      border: none;
      .ant-input{
      background: #1A1C1E;

      }
  }


    .ant-checkbox-wrapper{
      color:white;
    }

 
`;

export default Style;
