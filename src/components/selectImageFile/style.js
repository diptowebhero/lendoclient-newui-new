import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .ant-upload.ant-upload-select {
    display: block;
  }
  position: relative;
  .default-upload {
    ${mediaQuery.md`
        max-width: 100% !important;
      `}
    position: relative;
    background:#1A1C1E;
    margin: auto;
    cursor: pointer;
    padding: 0px;
    overflow: hidden;
    img {
      display: block;
      text-align: center; 
      vertical-align: middle;
      margin: 0 auto;
      object-fit: cover;
      padding: 0;
      margin-top: 7.4%;
    }
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &:after {
      position: absolute;
      inset: 4px;
      content: "";
      background: rgba(0, 0, 0, 0.6);
      display: none;
    }
    &:hover:after {
      display: block;
    }
  }
  .avatar-image {
    .default-upload,
    .preview-file {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      &:after {
        border-radius: 50%;
      }
    }
    .preview-file {
      img {
        border-radius: 50%;
      }
      .hover-box {
        border-radius: 50%;
        .close {
          color: #fff;
          position: absolute;
          left: 50%;
          right: auto;
          top: 10px;
          transform: translateX(-50%);
          cursor: pointer;
          font-size: 1rem;
        }
      }
    }
  }
  .logo-image {
    .default-upload,
    .preview-file {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      &:after {
        border-radius: 50%;
      }
    }
    .preview-file {
      img {
        border-radius: 50%;
      }
      .hover-box {
        border-radius: 50%;
        .close {
          color: #fff !important;
          position: absolute !important;
          left: 50% !important;
          right: auto !important;
          top: 10px !important;
          transform: translateX(-50%) !important;
          cursor: pointer;
          font-size: 1rem;
        }
      }
    }
  }
  .featured-image {
    .default-upload,
    .preview-file {
      width: 610px;
      height: 230px;
      border-radius: 10px;
      &:after {
        border-radius: 10px;
      }
    }
    .preview-file {
      img {
        border-radius: 10px;
      }
      .hover-box {
        border-radius: 10px;
      }
    }
  }
  .centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .default-upload img {
    max-width: 100%;
    max-height: 100%;
  }
  .banner-image {
    .default-upload,
    .preview-file {
      height: 160px;
      width: 182px;
      border-radius: 10px;
      &:after {
        border-radius: 10px;
      }
    }
    .preview-file {
      img {
        border-radius: 10px;
      }
      .hover-box {
        border-radius: 10px;
      }
    }
  }
  .cover-image {
    .default-upload,
    .preview-file {
      width: 100%;
      height: 250px;
      border-radius: 10px;
      &:after {
        border-radius: 10px;
      }
    }
    .preview-file {
      img {
        border-radius: 10px;
      }
      .hover-box {
        border-radius: 10px;
      }
    }
  }
  .preview-file {
    position: relative;
    overflow: hidden;
    ${mediaQuery.md`
        max-width: 100%;
      `}
    border: 1px dashed ${props => props.theme.colors.gray};
    .ant-spin-nested-loading,
    .ant-spin-container {
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &.image {
      .hover-box {
        position: absolute;
        inset: 4px;
        background: rgba(0, 0, 0, 0.6);
        display: none;
        .close {
          color: #fff;
          position: absolute;
          right: 10px;
          top: 10px;
          cursor: pointer;
          font-size: 1rem;
        }
      }
      &:hover {
        .hover-box {
          display: block;
        }
      }
    }
    &.video {
      .close {
        color: #fff;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        font-size: 1rem;
        background: rgb(0, 0, 0);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        .anticon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
`;

export default Style;
