import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .category-slider {
    .desktop-version {
      display: block;
      width: 76%;
      ul {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        grid-gap: 10px;
        li {
          a {
            div {
              padding: 8px 16px;
            }
          }
        }
      }
    }

    a.category {
      div {
        transition: ${props => props.theme.transitions.defaultTransition};
        border-radius: ${props => props.theme.borderRadius.defaultBorderRadius};
        padding: 8px 25px;
        color: white;
        background: #1c1c1c;
        border-radius: 180px;
        text-transform: capitalize;
      }
      &:hover,
      &.active {
        div {
          color:white;
          background: #2A2C2D;
          border-radius: 180px;
          border-color: ${props => props.theme.colors.primary};
        }
      }
    }
  }
  .swiper-slide {
    display: flex;
    display: block;
    width: auto;
  }
`;

export default Style;
