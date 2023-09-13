import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  .about-us-icon {
    .about-us-icon-inner {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
    h4 {
      font-size: 1.7rem;
      color: ${props => props.theme.colors.darkGray};
    }
    .icon-name {
      font-size: 1.2rem;
    }
  }
  .about-us-video {
    background: ${props => props.theme.colors.secondaryBackground};
    position: relative;
    z-index: 1000;
  }
  .about-us-story-wrapper-img {
    position: relative;
    .main-img {
      max-width: 100%;
    }

    .abs-pos {
      position: absolute;
    }
    .elipse-attached-img {
      bottom: -35px;
      left: 15px;
      z-index: -99;
      height: auto;
    }
    .path-attached-img {
      top: 100px;
      left: -30px;
    }
    .poligon-attached-img {
      bottom: -24px;
      left: 150px;
    }
  }
  .elipse-shape {
    .shape {
      position: absolute;
      left: -23%;
      top: -26%;
      z-index: -1000;
      opacity: 0.3;
    }
  }
  .about-us-position {
    background: ${props => props.theme.colors.secondaryBackground};

    p {
      font-size: 1.25rem;
    }
  }
  .about-us-industry {
    .wrapper-industry-img {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      justify-content: center;
      align-items: center;
      justify-items: center;
    }
  }
  .wrapper-member-about {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-content: center;
    align-items: center;
    justify-items: center;
    h4 {
      font-size: 1.12rem;
    }
    .member-background-img {
      top: 18%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export default Style;
