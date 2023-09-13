import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .blog-list-sidebar {
    border: 1px solid #d1d1d1;
    border-radius: 15px;
    background: #fff;
    .blog-list-sidebar-wrapper {
      padding: 30px 20px 20px 20px;
      .section-title {
        font-weight: 400;
        padding-bottom: 0px;
      }
      .blog-list-sidebar-item {
        .item {
          display: flex;
          color: #000;
          grid-gap: 10px;
          padding-bottom: 10px;
          padding-top: 10px;
          border-bottom: 1px solid #eaeaea;
          align-items: center;

          .image {
            img {
              border-radius: 5px;
              transition: ${props => props.theme.transitions.defaultTransition};
              object-fit: cover;
            }
          }
          .title {
            font-weight: 500;
            line-height: 1.3;
            font-size: 0.8rem;
            transition: ${props => props.theme.transitions.defaultTransition};
          }
          &:hover {
            .title {
              color: ${props => props.theme.colors.primary};
            }
            .image {
              img {
                transform: scale(1.1);
              }
            }
          }
        }
        &:last-child {
          .item {
            border-bottom: none;
          }
        }
      }
    }
  }
`;

export default Style;
