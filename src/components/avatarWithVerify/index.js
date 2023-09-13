import { Fragment } from "react";
import LazyLoadImage from "../lazyLoadImage";
import Style from "./style";

export default function AvatarWithVerified(props) {
  const { image, title, verified, avatarSize = "medium" } = props;
  return (
    <Style avatarSize={avatarSize}>
      <div className="image">
        <LazyLoadImage
          width={avatarSize === "medium" ? 50 : 26}
          height={avatarSize === "medium" ? 50 : 26}
          className="avatar"
          src={image}
          alt={title}
        />
        <span className="verified-status">
          {verified ? (
            <img src="/assets/icons/verified-icon.svg" />
          ) : (
            <Fragment >
              {/* <img src="/assets/images/img/userimg.png" /> */}
            </Fragment>
          )}
        </span>
      </div>
    </Style>
  );
}
