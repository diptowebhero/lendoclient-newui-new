import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .search {
    input,
    .ant-select {
      width: 100%;

      .ant-input-affix-wrapper {
        border-radius: ${props => props.theme.borderRadius.defaultBorderRadius};
      }
      .ant-input-affix-wrapper,
      input {
        // background: ${props =>props.isHome ? props.theme.colors.secondaryBackground : "#fff"};
        // color: ${props => props.theme.colors.gray};
        background: #1A1C1E;
        color: #888888;
        border - radius: 12px;
        border: none;
      }
      .ant-input::placeholder {
        color: #999;
      }
    }
  }
  .render-item {
    display: none;
  }
`;

export default Style;
