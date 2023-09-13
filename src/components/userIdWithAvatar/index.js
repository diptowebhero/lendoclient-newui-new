import Style from "./style";
import Link from "next/link";
import { truncateAddress } from "@src/helpers/walletConnect/utils.web3";
import Web3Icon from "../web3Icon";
import { ROUTE_ACCOUNT_OTHERS } from "@src/routes";

export default function UserIdWithAvatar({
  data,
  justImage = false,
  size = 35,
}) {
  const { username, avatar, publicAddress } = data;
  function renderUsername() {
    if (username) {
      if (username.length >= 20) {
        return truncateAddress(username);
      } else {
        return username;
      }
    } else {
      return truncateAddress(publicAddress);
    }
  }
  return (
    <Style>
      {justImage ? (
        <span className="avatar">
          <Web3Icon size={size} publicAddress={publicAddress} avatar={avatar} />
        </span>
      ) : (
        <Link
          href={ROUTE_ACCOUNT_OTHERS.replace(":username", username)}
          prefetch={false}
        >
          <a>
            <span className="avatar">
              <Web3Icon
                size={size}
                publicAddress={publicAddress}
                avatar={avatar}
              />
            </span>
            <span>{`@${renderUsername()}`}</span>
          </a>
        </Link>
      )}
    </Style>
  );
}
