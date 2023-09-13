import styled from "styled-components";

export const Style = styled.div`
  .title {
    text-transform: capitalize;
    font-size: 4rem;
    strong {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

export default Style;


