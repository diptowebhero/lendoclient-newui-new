import time from "@src/helpers/time";
import { truncateAddress } from "@src/helpers/walletConnect/utils.web3";
import { Tooltip, Typography } from "antd";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import Style from "./style";
("use-client");
const { Paragraph } = Typography;
export default function HeaderProfile(props) {
  const [expand, setExpand] = useState("");
  const {
    coverImage,
    avatarImage,
    name,
    isVeryfied,
    description,
    joinedTime,
    children,
    publicAddress,
  } = props;
  const [t, i18n] = useTranslation("common");

  const renderName = () => {
    if (name.length >= 30) {
      return truncateAddress(name);
    } else {
      return name;
    }
  };

  return (
    <Style>
      <div className="hero-section">
        <div className="container">
          <div className="hero-image">
            {coverImage && (
              <img className="cover" src={coverImage} layout="fill" />
            )}
            <div className="hero-avatar">
              {avatarImage && (
                <img
                  className="avatar"
                  src={avatarImage}
                  width={155}
                  height={155}
                />
              )}
            </div>
          </div>
        </div>

        <div className="container">
          {children && children}
          <div className="account-information">
            <div className="title">
              <Tooltip title={name}>
                <h1>{renderName()}</h1>
              </Tooltip>
              {isVeryfied && <img src="/assets/icons/verified-icon.svg" />}
            </div>
            <div className="details">
              <ul>
                <li className="wallet-address">
                  <Paragraph
                    style={{ color: "white" }}
                    copyable={{ text: publicAddress }}
                  >
                    {truncateAddress(publicAddress)}
                  </Paragraph>
                </li>
                <li className="joined-time">{`${t("Joined")} ${time(
                  joinedTime
                )}`}</li>
              </ul>
            </div>
            <div className="account-description">
              {/* <Paragraph ellipsis={{ expandable: true }}>
                
              </Paragraph> */}
              <Paragraph
                ellipsis={
                  !expand
                    ? {
                        expandable: true,
                        rows: 2,
                      }
                    : false
                }
              >
                {description === null ? (
                  <>
                    Take the red bean to join the garden. View the collection at
                    azuki.com/gallery. Azuki starts with a collection of 10,000
                    avatars that give you membership access to The Garden: a
                    corner of the internet where artists, builders, and web3
                    enthusiasts meet to create a decentralized future.{" "}
                  </>
                ) : (
                  description
                )}
              </Paragraph>
              <button
                className="readMoreBtn"
                type="link"
                onClick={() => setExpand(prev => !prev)}
              >
                {expand ? "Read More" : "Read More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Style>
  );
}
