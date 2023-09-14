import styled from "styled-components";

export const Style = styled.div`
  .image {
    position: relative;
    .avatar {
      width: ${props => (props.avatarSize === "medium" ? "50px" : "26px")};
      height: ${props => (props.avatarSize === "medium" ? "50px" : "26px")};
      object-fit: cover;
      border-radius: 50%;
    }
    .verified-status {
      position: absolute;
      left: ${props => (props.avatarSize === "medium" ? "25px" : "15px")};
      bottom: ${props => (props.avatarSize === "medium" ? "-5px" : "-1px")};
      img {
        width: ${props => (props.avatarSize === "medium" ? "auto" : "15px")};
        height: auto;
      }
    }
  }
`;

export default Style;
