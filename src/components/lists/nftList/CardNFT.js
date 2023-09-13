import Link from "next/link";
import UserIdWithAvatar from "@src/components/userIdWithAvatar";
import Style from "./style";
import { Row, Col, Empty } from "antd";
import { useTranslation } from "next-i18next";
import { Fragment } from "react";
import Countdown from "react-countdown";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import LazyLoadImage from "@src/components/lazyLoadImage";
import { ROUTE_SINGLE_ASSET } from "@src/routes";
import { networkPrice } from "@src/helpers/getters/price";

const AUCTION = "BID";
const FIX = "FIX";


export default function CardNft({ data, size, userAdd }) {
  const [t, i18n] = useTranslation("common");
  const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="countdown-ends">-</span>;
    } else {
      return <span>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</span>;
    }
  };

  function renderType(type, price, blockchain) {
    if (type === FIX) {
      return (
        <Fragment>
          <span className="title">{t("buy.now")}</span>
          <span className="value">{`${networkPrice(
            price
          )} ${blockchain}`}</span>
        </Fragment>
      );
    } else if (type === AUCTION) {
      return (
        <Fragment>
          <span className="title">{t("current.bid")}</span>
          <span className="value">
            <span className="circle">
              <span className="blink">
                <span className="inside" />
                <span className="outside" />
              </span>
            </span>
            {`${networkPrice(price)} ${blockchain}`}
          </span>
        </Fragment>
      );
    }
  }

  function renderTime(time, type) {
    if (type === FIX) {
      return <Fragment />;
    } else if (type === AUCTION) {
      return (
        <Fragment>
          <span className="title">{t("ends.in")}</span>
          <span className="value timer">
            {/* {listingsIsActive ? ( */}
            <Countdown date={time} renderer={renderCountdown} />
            {/* ) : (
              t("expired")
            )} */}
          </span>
        </Fragment>
      );
    }
  }
  const id = get(data, "id", "");
  // const fileUrl = get(data, "fileUrl", "");
  const fileUrl = get(data, "fileUrl") || get(data, "file_url") || "";
  const name = get(data, "name", "");
  const slug = get(data, "slug", "");
  const blockChain = get(data, "blockChain", "");
  const creator = get(data, "creator", "");
  const asset = get(data, "asset", "");
  const price = get(data, "price", "");
  const collection = get(data, "collection", "");
  const username = userAdd || get(data, "creator.username", "")
  const avatar = get(data, "creator.avatar", "");
  const publicAddress = userAdd || get(data, "creator.publicAddress", "");
  const type = get(data, "price.type", "");
  const unitPrice = get(data, "price.unitPrice", 0);
  const previousUnitPrice = get(data, "price.previousUnitPrice", "");
  const floorPrice = get(data, "price.floorPrice", "");
  const last24h = get(data, "price.last24h", "");
  const last7d = get(data, "price.last7d", "");
  const livePrice = get(data, "price.livePrice", "");
  const totalVolume = get(data, "price.totalVolume", "");
  const expiration = get(data, "price.expiration", "");
  const assetPrice = get(data, "price.asset", "");
  const created_at = get(data, "collection.created_at", "");
  const updated_at = get(data, "collection.updated_at", "");
  const deleted_at = get(data, "collection.deleted_at", "");
  const collectionId = get(data, "collection.id", "");
  const userId = get(data, "collection.userId", "");
  const collectionName = get(data, "collection.name", "");
  const logoImage = get(data, "collection.logoImage", "");
  const collectionSlug = get(data, "collection.slug", "");
  const featured = get(data, "collection.featured", "");
  const featuredImage = get(data, "collection.featuredImage", "");
  const bannerImage = get(data, "collection.bannerImage", "");
  const collectionDesc = get(data, "collection.description", "");
  const categoryId = get(data, "collection.categoryId", "");
  const royaltiesRate = get(data, "collection.royaltiesRate", "");
  const collectionBlockChain = get(data, "collection.blockchain", "");
  const paymentToken = get(data, "collection.paymentToken", "");
  const displayTheme = get(data, "collection.displayTheme", "");
  const isSensitive = get(data, "collection.isSensitive", "");
  const unlockableContent = get(data, "collection.unlockableContent", "");
  const verify = get(data, "collection.verify", "");
  const isActive = get(data, "collection.isActive", "");
  const listingsIsActive = get(data, "listings[0].isActive", false);

 
  return (
    <Style>
      <div className="nft-list">
        <div className="nft-item" >
          <Link href={ROUTE_SINGLE_ASSET.replace(":slug", slug)}>
            <a className="nft-card" style={{ background: "#1D2022", border: "0.5px solid #404242" }}>
              <div className="top">
                <div className="hover-box">
                  <div className="padding-box">
                    <h2 className="collection-title">
                      <img src={logoImage} />
                      {collectionName}
                    </h2>
                    <div className="owner">
                      <UserIdWithAvatar data={{ username, avatar, publicAddress }} />
                    </div>
                  </div>
                </div>

                <LazyLoadImage
                  src={fileUrl}
                  alt={name}
                  width="100%"
                  height={size == "medium" ? 300 : 400}
                />
              </div>
              <div className="bottom">
                <div className="content">

                  <div style={{ marginBottom: "5%", fontSize: '12px' }} className="recentbids mb-3">
                    <div style={{ display: "flex", alignItems: "center" }} className="recentbidders d-flex align-items-center ">
                      <div className="bidderimgs">
                        <img src="assets/images/img/nftimg.png" className="bidderimg2" alt="bidderimg" />
                        <img src="assets/images/img/nftimg.png" className="bidderimg1" alt="bidderimg" />
                        <img src="assets/images/img/nftimg.png" className="bidderimg3" alt="bidderimg" />
                      </div>
                      <span className="no_ofbidders ms-2" style={{ color: "#ACACAC" }}>&nbsp;
                        <span> 9+</span>
                        Placed Bids</span>
                    </div>

                  </div>

                  <h3 className="item-title">{name}</h3>

                  <div className="information">
                    <Row justify="space-between">
                      <Col>{renderType("FIX" || type, 32 || unitPrice, 2 || assetPrice)}</Col>
                      <Col>{renderTime(360000 || expiration, "BID" || type)}</Col>
                    </Row>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </Style>
  );
}


