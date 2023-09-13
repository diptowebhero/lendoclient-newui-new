import styled from "styled-components";

export const Style = styled.div`
  .blog-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: ${props => props.theme.gaps.defaultGap};

    .blog-post-card {
      display: block;
      transition: all 300ms ease;
      .top {
        img {
          width: 100%;
          height: 215px;
          object-fit: cover;
          aspect-ratio: 1/1;
          border-radius: 15px;
          transition: ${props => props.theme.transitions.defaultTransition};
        }
      }
      .bottom {
        .content {
          padding: 15px;
          .title {
            font-size: 1.4rem;
            font-weight: 400;
            line-height: 1.3;
            min-height: 50px;
            margin: 0;
            transition: ${props => props.theme.transitions.defaultTransition};
          }
          p {
            color: ${props => props.theme.colors.gray};
          }
          p.description {
            min-height: 100px;
          }
          p.time {
            opacity: 0.6;
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
          }
        }
      }
      &:hover {
        .bottom {
          .content {
            .title {
              color: ${props => props.theme.colors.primary};
            }
          }
        }
        .top {
          img {
            transform: scale(1.01);
          }
        }
      }
    }
  }
`;

export default Style;
