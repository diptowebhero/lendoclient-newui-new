import { Fragment } from "react";
import {
  TbBrandDiscord,
  TbBrandInstagram,
  TbBrandTwitter,
  TbChartLine,
  TbWorld,
} from "react-icons/tb";

export default function ProfileSocial({ links = {} }) {
  function renderSocial(social) {
    switch (social) {
      case "twitter":
        return <TbBrandTwitter />;
      case "discord":
        return <TbBrandDiscord />;
      case "webSite":
        return <TbWorld />;
      case "instagram":
        return <TbBrandInstagram />;
      case "blockExplorer":
        return <TbChartLine />;
    }
  }
  function renderLinks() {
    if (links === null) {
      return <Fragment />;
    } else {
      return Object.entries(links).map(([key, val]) => {
        if (val === null) {
          return <Fragment key={key} />;
        } else {
          return (
            <li key={key}>
              <a href={val} target="_blank" rel="noreferrer">
                {renderSocial(key)}
              </a>
            </li>
          );
        }
      });
    }
  }
  return <Fragment>{renderLinks()}</Fragment>;
}
