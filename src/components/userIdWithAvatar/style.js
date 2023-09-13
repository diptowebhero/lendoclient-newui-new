import styled from "styled-components";

export const Style = styled.div`
  a {
    color: ${props => props.theme.colors.avatarText};
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
    img {
      width: 35px;
      height: 35px;
      object-fit: cover;
      border-radius: 50%;
    }
    .avatar {
      height: 35px;
      width: 35px;
    }
    &:hover {
      color: #000;
    }
  }
`;

export default Style;
