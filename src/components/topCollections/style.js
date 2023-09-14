import styled from "styled-components";

export const Style = styled.div`
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
  .top-collection-box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-column-gap: 16px;
    grid-row-gap: 19px;
    .collection-item {
      color: #acacac;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 15px 10px;
      transition: all 0.2s ease 0s;
      grid-gap: 10px;
      .information {
        display: flex;
        justify-content: space-between;
        flex: 100%;
        align-items: center;
        .first {
          flex-grow: 2;
          color: white;
          h3.title {
            font-weight: 500;
          }
          .upper {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1px;
          }
          .lower {
            display: flex;
            color: #acacac;
            font-size: 10px;
            align-items: center;
            justify-content: space-between;
            line-height: 12px;
            font-weight: 400;
          }
        }
        .second {
        }
      }
      &:hover {
        border-bottom: 1px solid transparent;
        box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
        background-color: #2a2c2d;
        border-radius: 10px;

        .image {
          img {
            /* animation: shake 0.3s; */
          }
        }
      }
      &:nth-child(10),
      &:nth-child(11),
      &:nth-child(12) {
        border-bottom: none;
      }
    }
  }
`;

export default Style;
