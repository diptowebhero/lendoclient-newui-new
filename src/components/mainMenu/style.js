import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  ul {
    display: flex;
    grid-gap: 20px;
    align-items: center;
    li {
      a {
        padding: 0;
        line-height: 1;
        display: block;
        text-transform: capitalize;
        &:hover,
        &.active {
          color: ${props => props.theme.colors.primary};
        }
        &.user-avatar {
          img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
          }
          svg {
          }
        }
      }
      &.menu-item {
        ${mediaQuery.lg`
          display:none;
      `}
      }
      .rewards {
        background: linear-gradient(180deg, #FF9804 0%, #E46400 100%);
        border-radius: 90px;
        width: 128px;
        hieght: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        a {
          color:white;
        } 
      }

      .create {
        background: none;
        border: 1px solid #E46400;
        border-radius: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 128px;
        color:white;
        a {
          color:white;
        } 
      }
      .wallet {
        background: #1A1C1E;
        border-radius: 90px;
        width: 128px;
        display: flex;
        justify-content: center;
        align-items: center;
        color:white;
        a {
          color:white;
        } 
    }
      &.only-in-desktop {
        ${mediaQuery.md`
          display: none;
      `}
      }
      &.mobile-menu {
        display: none;
        ${mediaQuery.lg`
          display: block;
      `}
        .anticon {
          font-size: 20px;
          vertical-align: middle;
        }
      }
    }
  }
  

  .ant-dropdown-menu-item {
    color:white;
  }

  
`;
export default Style;
