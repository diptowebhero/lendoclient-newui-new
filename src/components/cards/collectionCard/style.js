import styled from "styled-components";

export const Style = styled.div`
  .collection-card {
    background: #fff;
    cursor: pointer;
    .collection-card-wrapper {
      box-shadow: 0px 3px 6px #00000043;
      overflow: hidden;
      transition: all 300ms ease;
      border-radius: 15px;
      .top {
        position: relative;
        .cover {
          width: 100%;
          object-fit: cover;
          transition: transform 500ms ease-in-out;
        }
        .avatar {
          position: absolute;
          left: 50%;
          bottom: -20px;
          transform: translateX(-50%);
          img {
            border-radius: 50%;
            // width: 45px;
            // height: 45px;
            object-fit: cover;
            background:#2A2C2D;
            margin-top: 32px;
          }
        }
      }
      .bottom {
        text-align: center;
        padding: 73px 18px 20px 18px;
        min-height: 210px;
        .by {
          color: ${props => props.theme.colors.gray};
        }
        .desc {
          color: ${props => props.theme.colors.gray};
          overflow: hidden;
          font-size: 11px;
        }
      }
    }
    &:hover {
      .collection-card-wrapper {
        /* box-shadow: 0px 3px 6px #00000043; */
        transform: translate3d(0px, -2px, 0px);
      }
    }
  }
  .title{
    color:white;
    font-weight: 500;
    font-size:20px;
  }
`;

export default Style;
