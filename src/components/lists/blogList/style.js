import styled from "styled-components";

export const Style = styled.div`
  .blog-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: ${props => props.theme.gaps.defaultGap};

    .blog-post-card {
      display: block;
      transition: all 300ms ease;
      background: #fff;

      box-shadow: ${props => props.theme.shadows.cardShadows};
      border-radius: 15px;
      .top {
        img {
          width: 100%;
          height: 215px;
          object-fit: cover;
          border-radius: 15px 15px 0 0;
        }
      }
      .bottom {
        min-height: 240px;
        .content {
          padding: 20px;
          .title {
            font-size: 1.3rem;
            font-weight: 500;
            line-height: 1.3;
            min-height: 50px;
          }
          p {
            color: ${props => props.theme.colors.gray};
          }
          p.description {
            font-size: 0.9rem;
          }
          p.time {
            opacity: 0.6;
            font-size: 0.8rem;
          }
        }
      }
      &:hover {
        box-shadow: ${props => props.theme.shadows.secondaryCardShadows};
      }
    }
  }
`;

export default Style;
