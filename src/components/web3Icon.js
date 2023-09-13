import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import LazyLoadImage from "./lazyLoadImage";

export default function Web3Icon(props) {
  const { publicAddress, avatar, size = 35 } = props;
  if (avatar) {
    return (
      <LazyLoadImage
        width={size}
        height={size}
        src={avatar}
        alt={publicAddress}
      />
    );
  } else {
    return (
      <Jazzicon diameter={size} seed={jsNumberForAddress(publicAddress)} />
    );
  }
}
