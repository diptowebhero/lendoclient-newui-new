import styled from "styled-components";

export const Style = styled.div`
  .nft-profile-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: ${props => props.theme.gaps.defaultGap};

    .nft-card {
      display: block;
      background: #fff;
      border: 1px solid ${props => props.theme.colors.borderColor};
      border-radius: 10px;
      overflow: hidden;
      .top {
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          object-fit: cover;
          transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1) !important;
          aspect-ratio: 1/1;
        }
      }
      .bottom {
        .content {
          padding: 20px;
          .title h3 {
            color: ${props => props.theme.colors.gray};
            font-weight: 400;
            font-size: 0.9rem;
          }
          .collection-title {
            .title-with-verify {
              grid-gap: 2px;
              span {
                font-weight: 500;
                font-size: 0.8rem;
              }
              img {
                max-width: 15px;
              }
            }
          }
        }
      }
      &:hover {
        .top {
          img {
            transform: scale(1.05);
          }
        }
      }
    }
  }
`;

export default Style;
