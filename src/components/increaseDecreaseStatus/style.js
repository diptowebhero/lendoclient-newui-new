import styled from "styled-components";

export const Style = styled.div`
  span {
    font-weight: 500;
    &.increase {
      color: ${props => props.theme.colors.green};
    }
    &.decrease {
      color: ${props => props.theme.colors.red};
    }
  }
`;

export default Style;
