import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`
.profile-setting{
  .inline-upload-space {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    .image-label {
      font-weight: 500;
      font-size: 1rem;
      text-transform: capitalize;
      text-align: center;
      display: block;
      display: flex;
      gap: 5px;
      align-items: center;
      margin-top: 10px;
    }
  }
  .ant-input-affix-wrapper, 
  .ant-input-affix-wrapper-lg
  .ant-input, .ant-input-lg {
    background-color: #1A1C1E !important;
    border: none;
    color: #bfbfbf;
  }
  .ant-input-group-addon {
    color: white;
    background: #d66b29;
    border: 1px solid #d66b29;
  }
  .ant-input-prefix{
    background: #d66b29;
    border-radius: 4px;
    color:white ;
    padding: 4px;
  }
  .profile-setup{
    background: #1A1C1E;
    padding: 10px;
    p {
      font-family: 'Fira Sans', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 0.15px;
      color: #FFFFFF;
    }
  }
  hr{
    opacity:0.25;
  }
}
`;

export default Style;
