import { useState, useEffect, Fragment } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { hooks } from "@src/components/wallet/connectors/metamask";
import UserContainer from "@src/containers/userContainer";
import { get, isEmpty } from "lodash";
import LazyLoadImage from "../lazyLoadImage";

const { useAccounts } = hooks;

export default function ProfileAvatar({ size = 24 }) {
  const userData = UserContainer.useContainer();
  const accounts = useAccounts();
  const [safeAccount, setSafeAccount] = useState([]);
  const userAvatar = get(userData, "user.avatar", null);

  useEffect(() => {
    if (!isEmpty(accounts)) {
      setSafeAccount(accounts[0]);
    }
  }, [accounts]);
  const renderAvatar = () => {
    if (userAvatar == null) {
      if (safeAccount.length === 0) {
        return <Fragment />;
      } else {
        return (
          <Jazzicon diameter={size} seed={jsNumberForAddress(safeAccount)} />
        );
      }
    } else {
      return (
        <LazyLoadImage
          width={size}
          height={size}
          className="avatar"
          src={userAvatar}
        />
      );
    }
  };
  return <Fragment> {renderAvatar()}</Fragment>;
}
