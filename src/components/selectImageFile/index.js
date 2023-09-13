import { useTranslation } from "next-i18next";
import { Upload, Tooltip, Spin } from "antd";
import { CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import Style from "./style";
import UnknownImage from "@icons/unknown-image.svg";
import * as tus from "tus-js-client";
import { UPLOAD_API_URL } from "@src/config";
import { getToken } from "@src/helpers/authUtils";
import LoadingContainer from "@src/containers/globalLoading";
import message from "@src/helpers/message";

export default function SelectImageFile(props) {
  const {
    label,
    className,
    tooltipText,
    onChange,
    description,
    allowType = "image",
    limitFileSize = 10,
    value,
    typeHandler,
    type = "image",
    previewWidth,
    previewHeight,
    previewPosition,
  } = props;
  const globalLoading = LoadingContainer.useContainer();
  const [t, i18n] = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const beforeUpload = file => {
    if (validation(file)) {
      const token = getToken();
      setFileList([file]);
      console.log(file.name, file.type);
      typeHandler && typeHandler(file.type);
      const upload = new tus.Upload(file, {
        // Endpoint is the upload creation URL from your tus server
        endpoint: `${UPLOAD_API_URL}upload`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // Retry delays will enable tus-js-client to automatically retry on errors
        // retryDelays: [0, 3000, 5000, 10000, 20000],
        // Attach additional meta data about the file for the server
        metadata: {
          filename: file.name,
          filetype: file.type,
          type: type,
        },
        storeFingerprintForResuming: false,
        removeFingerprintOnSuccess: true,
        // Callback for errors which cannot be fixed using retries
        onError: function (error) {
          console.log("Failed because: " + error);
          globalLoading.set(false);
          setLoading(false);
          setFileList([]);
          message("error", t("something happen! please try again."));
        },
        // Callback for reporting upload progress
        onProgress: function (bytesUploaded, bytesTotal) {
          // var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          // console.log(bytesUploaded, bytesTotal, percentage + "%");
        },
        // Callback for once the upload is completed
        onSuccess: function () {
          // console.log("Download %s from %s", upload.file.name, upload.url);
          // https://dev-api.lendochain.io/tus-files-s3/54d2593ec90ce365e5692a2cd9f74fd9
          const lastSlash = upload.url.lastIndexOf("/");
          const getId = upload.url.substring(lastSlash + 1);
          globalLoading.set(false);
          setLoading(false);
          onChange(getId);
        },
      });
      globalLoading.set(true);
      setLoading(true);
      upload.start();
    } else {
      // setFileList([]);
      // onChange(undefined);
    }

    return false;
  };
  const validation = file => {
    const imageAllowedExtensions = /(\.jpeg|\.jpg|\.png|\.gif|\.webp)$/i;
    const allAllowedExtensions =
      /(\.jpeg|\.jpg|\.png|\.gif|\.webp|\.mp4|\.mp3|)$/i;

    const isLimitFile = file.size / 1024 / 1024 < limitFileSize;
    const isFormat =
      allowType === "image"
        ? imageAllowedExtensions.exec(file.name)
        : allAllowedExtensions.exec(file.name);
    if (!isLimitFile) {
      message("error", `file must smaller than ${limitFileSize}MB!`);
    }

    if (!isFormat) {
      message("error", "You can only upload specfic file formats!");
    }
    if (isLimitFile && isFormat) {
      return true;
    } else {
      return false;
    }
  };

  const remove = () => {
    setFileList([]);
    onChange(undefined);
  };
  const render = (node, file, fileList, actions) => {
    if (file.type.includes("image")) {
      return (
        <div className="preview-file image">
          <Spin spinning={loading}>
            <img src={URL.createObjectURL(file)} />
            <div className="hover-box">
              <span className="close" onClick={() => remove()}>
                <CloseOutlined />
              </span>
            </div>
          </Spin>
        </div>
      );
    } else if (file.type.includes("video")) {
      return (
        <div className="preview-file video">
          <Spin spinning={loading}>
            <video controls>
              <source src={URL.createObjectURL(file)} />
              Your browser does not support HTML5 video.
            </video>
            <div className="hover-box">
              <span className="close" onClick={() => remove()}>
                <CloseOutlined />
              </span>
            </div>
          </Spin>
        </div>
      );
    }
  };
  const onRemove = file => {
    setFileList([]);
  };

  const renderDefaultImage = () => {
    if (value) {
      return <img src={value} />;
    } else {
      return <div class="centered-content">
        <img src="/assets/images/wallets/plus-upload.svg" alt="Upload" />
      </div>
    }
  };

  return (
    <Style>
      {description && <p className="description">{description}</p>}

      <Upload
        className={className}
        beforeUpload={beforeUpload}
        onRemove={onRemove}
        itemRender={render}
        multiple={false}
        showUploadList={true}
        fileList={fileList}
      >
        {fileList && fileList[0] ? (
          ""
        ) : (
          <div style={{ margin: previewPosition }} className="default-upload">
            {renderDefaultImage()}
          </div>
        )}
      </Upload>

      {tooltipText && (
        <span className="image-label">
          {t(label)}{" "}
          <Tooltip
            overlayStyle={{
              whiteSpace: "pre-line",
              textAlign: "center",
            }}
            overlayInnerStyle={{ textAlign: "center" }}
            title={t(tooltipText)}
          >
            <InfoCircleOutlined />
          </Tooltip>
        </span>
      )}
    </Style>
  );
}

