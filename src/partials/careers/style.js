import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
  .title-page {
    font-size: 3.8rem;
    ${mediaQuery.lg`
    font-size: 4rem;
    `}
    ${mediaQuery.lt`
    font-size: 3rem;
    `}
    ${mediaQuery.xs`
    font-size: 2.5rem;
    `}
  }
  .careers-desc {
    .button-wrapper {
      ${mediaQuery.lg`
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom:20px;
        `}
    }
  }
  .careers-country-content {
    .container-content {
      max-width: 850px;
      margin: 0 auto;
    }
  }
  .careers-desc-wrapper-img {
    .careers-desc-img {
      ${mediaQuery.xl`
      display:block;
      width:100%;
      `}
      ${mediaQuery.lg`
      display:block;
      width:70%;
      `}
      ${mediaQuery.md`
      display:block;
      width:100%;
      `}
    }
  }
  .careers-location-wrapper-img {
    .img-view {
      ${mediaQuery.lg`
        display:block;
        width:100%;
        hight:auto;
        `}
    }
  }
  .collection-card {
    .collection-card-wrapper {
      .row {
        gap: 1em;
        ${mediaQuery.lg`
        flex-direction:column;
        `}
        ${mediaQuery.md`
        gap:0;
        `}
      }
    }
  }

  .careers-values {
    background: ${props => props.theme.colors.secondaryBackground};

    .wrapper-values {
      .content-values {
        max-width: 200px;
        margin: 0 auto;
        min-height: 70px;
      }
    }
  }
  .careers-position {
    .flex-acenter-jcenter {
      flex-direction: column;
    }
  }
  .careers-position {
    background: ${props => props.theme.colors.mainBackground};
    .flex-acenter-jcenter {
      flex-direction: column;
    }
    .title-section-page {
      font-size: 2.81rem;
      ${mediaQuery.lg`
    font-size: 2.6rem;
    `}
      ${mediaQuery.lt`
    font-size: 2.2rem;
    `}
    ${mediaQuery.xs`
    font-size: 2rem;
    `}
    }
    p {
      font-size: 1.25rem;
    }
  }
`;

export default Style;
