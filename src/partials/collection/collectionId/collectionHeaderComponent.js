import { useTranslation } from "next-i18next";
import { Menu, Dropdown, Button } from "antd";
import { Fragment } from "react";
import {
  TbBrandDiscord,
  TbBrandTwitter,
  TbWorld,
  TbBrandInstagram,
  TbDots,
  TbEdit,
  TbAlignLeft,
  TbSearch,
  TbChartLine,
} from "react-icons/tb";
import Link from "next/link";
import { ROUTE_EDIT_COLLECTION } from "@src/routes";
import { isFloat } from "@src/helpers/getters/price";
import { EditOutlined } from "@ant-design/icons";

export default function collectionHeaderComponent(props) {
  const [t, i18n] = useTranslation("common");
  const {
    countItems,
    countOwners,
    floorPrice,
    totalVolume,
    links,
    self = false,
    slug = "",
    isExternal,
  } = props;
  const moreMenu = (
    <Menu
      size="large"
      width="200px"
      items={[
        {
          key: "1",
          label: (
            <Link
              href={ROUTE_EDIT_COLLECTION.replace(":slug", slug)}
              prefetch={false}
            >
              {t("edit")}
            </Link>
          ),
          icon: <TbEdit />,
        },
      ]}
    />
  );
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
  return (
    <div className="collection-detail">
      <div className="stats">
        <ul>
          <li>
            <span className="value">{countItems}</span>
            <span className="title"> {t("items")}</span>
          </li>
          <li>
            <span className="value">{countOwners}</span>
            <span className="title"> {t("owner")}</span>
          </li>
          <li>
            <span className="value">
              <i>
              <i>
                {props.priceAsset === "BNB" ? <img src="/assets/icons/bsc.svg" /> :  props.priceAsset === "MATIC" ? <img src="/assets/icons/polygon.png" /> : ""}
              </i>
              </i>
              {floorPrice ? floorPrice : "--"}
            </span>
            <span className="title"> {t("floor price")}</span>
          </li>
          <li>
            <span className="value">
              <i>
                {props.priceAsset === "BNB" ? <img src="/assets/icons/bsc.svg" /> :  props.priceAsset === "MATIC" ? <img src="/assets/icons/polygon.png" /> : ""}
              </i>
              {totalVolume
                ? isFloat(totalVolume)
                  ? totalVolume.toFixed(4)
                  : totalVolume
                : "--"}
            </span>
            <span className="title"> {t("volume")}</span>
          </li>
        </ul>
      </div>
      <div className="social">
        <ul>
          {renderLinks()}
          {self && isExternal === false ? (
            <li>
              <Button size="small" type="ghost">
                <Link
                  href={ROUTE_EDIT_COLLECTION.replace(":slug", slug)}
                  prefetch={false}
                >
                  {t("Edit Collection")}
                </Link>
              </Button>
            </li>
          ) : (
            <Fragment />
          )}
        </ul>
      </div>
    </div>
  );
}
