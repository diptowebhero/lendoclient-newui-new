import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`

.main-form-title{
    h1{
        color:white;
    }
}

.ant-input-affix-wrapper,
.ant-input-affix-wrapper-lg,
.ant-input, .ant-input-lg{
    background-color: #1A1C1E !important;
    border: none;
    color: #bfbfbf;
}
.mint-form-input-control {
    display: block;
    width: 100%;
    padding: 12px 14px;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.5;
    color: #ACACAC !important;
    background-color: #1A1C1E !important;
    background-clip: padding-box;
    border: 0;
    appearance: none;
    border-radius: 10px;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.ant-select-selector{
    display: block;
    width: 100%;
    padding: 12px 14px;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.5;
    color: #ACACAC !important;
    background-color: #1A1C1E !important;
    background-clip: padding-box;
    border: none;
    appearance: none;
    border-radius: 10px;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.ant-select-item-option-content{
    background-color: #1A1C1E !important;
    border: none;
}
.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    position: relative;
    background-color: #fff;
    border: none;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.my-5 {
    margin-top: 3rem!important;
    // margin-bottom: 3rem!important;
}
.custom-switch {
    // height: 3rem;
    // width: 6rem;
}
.ant-switch-handle {
    // width: 2.5rem; 
    // height: 2.5rem; 
    // position: absolute;
    // top: 0.3125rem;
    // left: 0.3125rem;
    // width: 1.875rem;
    // height: 1.875rem;
    // border-radius: 1.875rem;
    // background: #fff;
    // transition: left 0.25s;
}
  
.border-bottom{
    border-bottom:1px solid #2A2C2D;
}
`;

export default Style;
