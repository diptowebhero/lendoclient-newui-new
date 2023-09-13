import styled from "styled-components";

export const Style = styled.div`
  h3 {
    font-size: 2rem;
  }
  p {
    margin-bottom: 3rem;
    color: ${props => props.theme.colors.gray};
  }
  .ant-col {
    position: relative;
    .triangle-video-shape {
      position: absolute;
      position: absolute;
      right: -36px;
      bottom: 80px;
      z-index: 999;
    }
    .circle-dotted-video-shape {
      position: absolute;
      position: absolute;
      right: -60px;
      bottom: -30px;
    }
    .circle-video-shape {
      position: absolute;
      position: absolute;
      top: -5px;
      left: -15px;
    }
    .line-video-shape {
      position: absolute;
      left: -30px;
      bottom: 15px;
      z-index: 999;
    }
  }
  .videobox {
    text-align: center;
    iframe {
      position: relative;
      border-radius: 22px;
      overflow: hidden;
      transform: translateZ(0);
      box-shadow: ${props => props.theme.shadows.cardShadows};
      aspect-ratio: 16 / 9;
      width: 100%;
    }
  }
`;

export default Style;
