import styled from "styled-components";

export const Style = styled.div`
  .collection-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 32px ${props => props.theme.gaps.defaultGap};
    .collection-item {
    }
  }
`;

export default Style;
