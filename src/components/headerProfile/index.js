import { useTranslation } from "next-i18next";
import { truncateAddress } from "@src/helpers/walletConnect/utils.web3";
import time from "@src/helpers/time";
import { Tooltip, Typography } from "antd";
import Style from "./style";

const { Paragraph } = Typography;
export default function HeaderProfile(props) {
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
                  <Paragraph style={{color:'white'}} copyable={{ text: publicAddress }}>
                    {truncateAddress(publicAddress)}
                  </Paragraph>
                </li>
                <li className="joined-time">{`${t("Joined")} ${time(
                  joinedTime
                )}`}</li>
              </ul>
            </div>
            <div className="account-description">
              <Paragraph ellipsis={{ expandable: true }}>
                {description}
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </Style>
  );
}
