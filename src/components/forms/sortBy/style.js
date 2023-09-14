
import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
    
    .ant-select-selector{
        background-color: #1A1C1E;
        

    }
    .ant-select:not(.ant-select-customize-input) .ant-select-selector  {
        position: relative;
        background-color:#1A1C1E;
        border: none;
        border-radius: 10px;
        padding-left:37px;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .ant-select-item {
        background-color:#1A1C1E;
    }
    .place-hol{
        // padding-left:25px;
    }
    .rc-virtual-list-holder{
        background-color:#1A1C1E;
    }
`;
export default Style;


