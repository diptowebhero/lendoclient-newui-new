
import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
    
    .items {
        display:flex;
        li{
          color: #ACACAC;
          margin: 0px 16px 4% 22px;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          font-size:1rem;
          cursor: pointer;
        }
        .active{
          color: white;
        }
        &:active,
        &:hover {
          color: white;
        }
    }
`;
export default Style;


