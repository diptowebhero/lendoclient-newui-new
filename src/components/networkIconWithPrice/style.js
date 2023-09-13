import styled from "styled-components";

export const Style = styled.div`
  display: flex;
  img {
    width: 20px;
    height: auto;
    vertical-align: middle;
  }
  span {
    display: inline-block;
    margin-left: 5px;
    color: ${props =>
      props.secondaryDesign ? "#000" : props.theme.colors.gray};
  }
`;

export default Style;
