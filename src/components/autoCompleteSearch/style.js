import styled from "styled-components";

export const Style = styled.div`
  .search {
    width:341px;
    height:41px;
    input,
    .ant-select {
      width: 100%;

      .ant-input-affix-wrapper {
        border-radius: ${props => props.theme.borderRadius.defaultBorderRadius};
      }
      .ant-input-affix-wrapper,
      input {
        // background: ${props =>
          props.isHome ? props.theme.colors.secondaryBackground : "#fff"};
        // color: ${props => props.theme.colors.gray};
        background: #1A1C1E;
        color: #888888;
        border - radius: 10px;
        border: none;
        font-size:12px;
        font-weight: 400;
        
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
