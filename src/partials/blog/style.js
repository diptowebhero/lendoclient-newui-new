import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  .single-page {
    .breadcrumb {
      ol {
        list-style: none;
        display: flex;
        grid-gap: 0px;
        padding: 0;
        margin: 0;
        li {
          position: relative;
          &:after {
            content: "/";
            padding: 0 10px;
            color: #cccccc;
          }
          &:last-child {
            &:after {
              display: none;
            }
          }
        }
      }
    }
    .main-single-post {
      .hero-image {
        position: relative;
        height: 385px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: ${props =>
            props.theme.borderRadius.defaultBorderRadius};
        }
      }
      .information {
        display: flex;
        grid-gap: 30px;
        padding: 20px 0 30px 0;
        color: #aaaaaa;
        font-size: 1rem;
        div {
          position: relative;
          &:after {
            content: "";
            border: 1px solid #d8d8d8;
            height: 8px;
            width: 1px;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(-50%, -50%);
            margin: 0 -15px;
          }
          &:first-child {
            &:after {
              display: none;
            }
          }
          &.category {
            a {
              text-transform: capitalize;
            }
          }
        }
      }
      .content {
        .title {
          font-size: 2.5rem;
          font-weight: 500;
          line-height: 1.2;
        }
        p {
          color: #838383;
          font-size: 1.1rem;
          line-height: 2;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      }
    }
  }
`;

export default Style;
