import Mainlayout from "@src/components/layouts/mainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Seo from "@src/components/seo";
import { useRouter } from "next/router";
import Style from "@src/partials/asset/slug/style";
import { useTranslation } from "next-i18next";

import {
  Row,
  Col,
  Collapse,
  Button,
  Spin,
  Popconfirm,
  Modal,
  Tooltip,
  Form,
  InputNumber,
  Empty,
  Avatar,
  List,
} from "antd";
import Icon, {
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
  TagOutlined,
  QuestionCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { TbClick, TbTag, TbInfoCircle } from "react-icons/tb";
import { hooks } from "@src/components/wallet/connectors/metamask";
import detectEthereumProvider from "@metamask/detect-provider";
import Link from "next/link";
import LazyLoadImage from "@src/components/lazyLoadImage";
import {
  API_URL_CANCEL_LISTING,
  API_URL_CHECKOUT_STEP1,
  API_URL_CHECKOUT_STEP2,
  API_URL_GET_SINGLE_ITEM,
  API_URL_POST_OFFER_STEP1,
  API_URL_POST_OFFER_STEP2,
} from "@src/partials/asset/slug/const";
import {
  getRequest,
  patchRequest,
  postRequest,
  redirectOnServer,
} from "@src/helpers/api";
import { get, isEmpty } from "lodash";
import { truncateAddress } from "@src/helpers/walletConnect/utils.web3";
import {
  ROUTE_ACCOUNT_OTHERS,
  ROUTE_HOME,
  ROUTE_LIST_ASSET,
  ROUTE_SINGLE_ASSET,
  ROUTE_SINGLE_COLLECTION,
} from "@src/routes";
import Table from "@src/components/table";
import NetworkIconWithPrice from "@src/components/networkIconWithPrice";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { theme } from "@src/styles/theme";
import HeaderWithLink from "@src/components/headerWithLink";
import NftList from "@src/components/lists/nftList";
import { useState, useEffect, Fragment } from "react";
import ProfileNftList from "@src/components/lists/profileNftList";
import message from "@src/helpers/message";
import time, { shortTime, timeWithHour } from "@src/helpers/time";
import textDots from "@src/helpers/textDots";
import blockExplorerLink from "@src/helpers/getters/blockExplorerLink";
import { networkPrice, usdPriceDollor } from "@src/helpers/getters/price";
import { getUser, isAuth } from "@src/helpers/authUtils";
import AvatarWithVerified from "@src/components/avatarWithVerify";
import useActivityColumns from "@src/helpers/activityColumns";
import UserIdWithAvatar from "@src/components/userIdWithAvatar";
import getCurrentNetwork from "@src/helpers/getCurrentNetwork";

const { Panel } = Collapse;
export default function CollectionId({ data, slug, listingInfo }) {



  const [t, i18n] = useTranslation("common");
  const activityColumns = useActivityColumns(false, data.blockChain);
  const router = useRouter();
  const { query } = router;
  const [form] = Form.useForm();
  const [isFavourited, setIsFavourited] = useState(
    get(data, "isFavourited", false)
  );
  const [totalFavourites, setTotalFavourites] = useState(
    get(data, "totalFavourites", 0)
  );

  const listingId = get(listingInfo, "listingId", "");
  const id = get(listingInfo, "id", 0);
  const usdPrice = get(listingInfo, "usdPrice", 0);
  const type = get(listingInfo, "type", "FIX");
  const unitPrice = get(listingInfo, "unitPrice", 0);
  const unitPriceToBuy = get(listingInfo, "unitPriceToBuy", 0);
  const remainedQuantity = get(listingInfo, "remainedQuantity", 0);
  const expiration = get(listingInfo, "expiration", 0);
  const bestOffer = get(listingInfo, "bestOffer", null);
  const [currentBidOrFixActionDetails, setCurrentBidOrFixActionDetails] =
    useState({
      listingId: id,
      usdPrice: usdPrice,
      type: type,
      unitPrice: unitPrice,
      remainedQuantity: remainedQuantity,
      expiration: expiration,
      bestOffer: bestOffer,
    });
  const [isModalOwners, setIsModalOwners] = useState(false);
  const [listingLoading, setListingLoading] = useState(false);
  const [fixPurchaseLoading, setFixPurchaseLoading] = useState(false);
  const [isModalOpenFix, setIsModalOpenFix] = useState(false);
  const [makeOfferLoading, setMakeOfferLoading] = useState(false);
  const [isModalOpenOffer, setIsModalOpenOffer] = useState(false);
  const [listingData, setListingData] = useState({
    data: [],
    metadata: { offset: 1, total: 0 },
  });
  const [offerLoading, setOfferLoading] = useState(false);
  const [offerData, setOfferData] = useState({
    data: [],
    metadata: { offset: 1, total: 0 },
  });
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityData, setActivityData] = useState({
    data: [],
    metadata: { offset: 1, total: 0 },
  });
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedData, setRelatedData] = useState([]);
  const [cancelListingLoading, setCancelListingLoading] = useState(false);
  const fileUrl = get(data, "fileUrl", "");
  const title = get(data, "name", "");
  const itemId = get(data, "id", "");
  const description = get(data, "description", "");
  const itemProps = get(data, "props", []);
  const collectionName = get(data, "collection.name", "");
  const collectionDescription = get(data, "collection.description", "");
  const collectionSlug = get(data, "collection.slug", "");
  const creatorUsername = get(data, "ownedBy", "");
  const itemOwners = get(data, "itemOwners", []);
  const getFirstOwnerObject = get(data, "itemOwners[0]", {});
  const getFristOwner = get(getFirstOwnerObject, "user.username");
  const views = get(data, "totalViews", 0);
  const isOwner = get(data, "self", false);
  const isListed = get(data, "isListed", false);
  const blockChain = get(data, "blockChain", "");
  const protocol = get(data, "protocol", "");
  const ipfs = get(data, "metadata.IPFS", "");
  const tokenId = get(data, "metadata.tokenId", "");
  const contractAddress = get(data, "metadata.contractAddress", "");
  const quantity = get(data, "quantity", 0);
  const serviceFee = get(data, "serviceFee", []);
  const SYSTEM_BID_FEE = serviceFee.filter(el => el.type === "SYSTEM_BID_FEE");
  const SYSTEM_FIX_FEE = serviceFee.filter(el => el.type === "SYSTEM_FIX_FEE");
  const itemPrice = get(data, "price.unitPrice", 0);
  const priceHistory = get(data, "priceHistory", []);

  const network = getCurrentNetwork()


  async function getListingsApi(offset = 1) {
    try {
      setListingLoading(true);
      const response = await getRequest(
        `${API_URL_GET_SINGLE_ITEM}/${slug}/listing`,
        { offset }
      );

      setListingData(response.data);
      setListingLoading(false);
    } catch (e) {
      setListingLoading(false);
    }
  }
  async function getOffersApi(offset = 1) {
    try {
      setOfferLoading(true);
      const response = await getRequest(
        `${API_URL_GET_SINGLE_ITEM}/${slug}/offer`,
        { offset }
      );

      setOfferData(response.data);
      setOfferLoading(false);
    } catch (e) {
      setOfferLoading(false);
    }
  }
  async function getActivityApi(offset = 1) {
    try {
      setActivityLoading(true);
      const response = await getRequest(
        `${API_URL_GET_SINGLE_ITEM}/${slug}/activity`,
        { offset }
      );

      setActivityData(response.data);
      setActivityLoading(false);
    } catch (e) {
      setActivityLoading(false);
    }
  }
  async function getRelatedApi() {
    try {
      setRelatedLoading(true);
      const response = await getRequest(
        `${API_URL_GET_SINGLE_ITEM}/${slug}/related`
      );
      const limit4 = response.data.data.slice(0, 4);
      setRelatedData(limit4);
      setRelatedLoading(false);
    } catch (e) {
      setRelatedLoading(false);
    }
  }

  useEffect(() => {
    getRelatedApi();
  }, [slug]);
  useEffect(() => {
    getActivityApi();
  }, [slug]);
  useEffect(() => {
    getListingsApi();
  }, [slug]);
  useEffect(() => {
    getOffersApi();
  }, [slug]);

  const onChangePaginationActivity = page => {
    getActivityApi(page);
  };
  const onChangePaginationListings = page => {
    getListingsApi(page);
  };
  const onChangePaginationOffers = page => {
    getOffersApi(page);
  };

  const listingsColumns = [
    {
      title: t("unit price"),
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: unitPrice => (
        <NetworkIconWithPrice
          secondaryDesign={true}
          blockchain={blockChain}
          price={unitPrice}
        />
      ),
    },
    {
      title: t("Expiration"),
      dataIndex: "expiration",
      key: "expiration",
      render: (expiration, { isActive, type }) => {
        if (type === "FIX") {
          return "--";
        } else if (type === "BID") {
          if (isActive) {
            return timeWithHour(expiration);
          } else {
            return t("expired!");
          }
        }
      },
    },
    {
      title: t("from"),
      dataIndex: "user",
      key: "user",
      render: ({ username }) => (
        <Link href={ROUTE_ACCOUNT_OTHERS.replace(":username", username)}>
          <a>{username.length >= 30 ? truncateAddress(username) : username}</a>
        </Link>
      ),
    },
    {
      title: t("action"),
      dataIndex: "listingId",
      key: "listingId",
      render: (
        listingId,
        {
          type,
          bestOffer,
          expiration,
          remainedQuantity,
          unitPrice,
          usdPrice,
          id,
          isActive,
          self,
        }
      ) => {
        if (type === "FIX" && isActive && self === false) {
          return (
            <Button
              size="small"
              type="primary"
              onClick={() =>
                onOpenCheckoutModal({
                  type,
                  bestOffer,
                  expiration,
                  remainedQuantity,
                  unitPrice,
                  usdPrice,
                  listingId: id,
                })
              }
            >
              {t("Buy Now")}
            </Button>
          );
        } else if (type === "BID" && isActive && self === false) {
          return (
            <Button
              size="small"
              type="primary"
              onClick={() =>
                onOpenMakeOfferModal({
                  type,
                  bestOffer,
                  expiration,
                  remainedQuantity,
                  unitPrice,
                  usdPrice,
                  listingId: id,
                })
              }
            >
              {t("Make Offer")}
            </Button>
          );
        } else {
          return "--";
        }
      },
    },
  ];

  const offersColumns = [
    {
      title: t("item"),
      dataIndex: "item",
      key: "item",
      render: ({ fileUrl, name, slug }) => (
        <Link href={ROUTE_SINGLE_ASSET.replace(":slug", slug)}>
          <a className="flex-inline rank-item">
            <AvatarWithVerified image={fileUrl} title="" verified={false} />
            <span>{textDots(name, 30)}</span>
          </a>
        </Link>
      ),
    },
    {
      title: t("unit price"),
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (unitPrice, { }) => (
        <NetworkIconWithPrice
          secondaryDesign={true}
          blockchain={blockChain}
          price={unitPrice}
        />
      ),
    },
    {
      title: t("floor diffrence"),
      dataIndex: "floorPriceDiff",
      key: "floorPriceDiff",
      render: (floorPrice, { }) => {
        const { amount, isHigher } = floorPrice;
        if (amount === 0) {
          return "--";
        }
        if (isHigher) {
          return `${amount.toFixed(0)}% ${t("above")}`;
        } else {
          return `${amount.toFixed(0)}% ${t("below")}`;
        }
      },
    },

    {
      title: t("expiration"),
      dataIndex: "expiration",
      key: "expiration",
      render: expiration => (
        <span>{expiration != null ? time(expiration) : "--"}</span>
      ),
    },
    {
      title: t("from"),
      dataIndex: "user",
      key: "user",
      render: ({ username }) => (
        <Link href={ROUTE_ACCOUNT_OTHERS.replace(":username", username)}>
          <a>{username.length >= 30 ? truncateAddress(username) : username}</a>
        </Link>
      ),
    },
  ];

  function renderProperties() {
    return itemProps.map((item, i) => {
      const { count, key, value, percent } = item;
      return (
        <li key={i}>
          <span className="property-title">{key}</span>
          <span className="property-value">{value}</span>
          <span className="property-desc">&nbsp;{`${percent}% ${t(
            "have this trait"
          )}`}</span>
        </li>
      );
    });
  }
  const options = {
    chart: {
      height: 200,
      type: "line",
    },
    title: {
      text: "",
    },
    xAxis: {
      // tickInterval: 10,
      // type: "logarithmic",
      // type: "datetime",
      categories: priceHistory.map(history => shortTime(history.date)),
      // accessibility: {
      //   rangeDescription: "Range: 1 to 1000",
      // },
      // labels: {
      //   formatter: function () {
      //     return moment(this.value).format("DD MMMM YYYY");
      //   },
      // },
    },

    yAxis: {
      // type: "logarithmic",
      minorTickInterval: 0,
      minorTickLength: 0,
      tickLength: 0,
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      title: {
        text: `Volume (${blockChain === "POLYGON" ? "MATIC" : "BNB"})`,
      },

      // accessibility: {
      //   rangeDescription: "Range: 0.1 to 1000",
      // },
    },
    colors: [theme.colors.primary],
    tooltip: {
      headerFormat: "<b>price history</b><br />",
      pointFormat: "date = {point.date}, price = {point.y}",
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: "line",

        // data: [{ y: 25 }, { y: 50 }, { y: 80 }, { y: 90 }, { y: 5 }],
        data: priceHistory.map(history => {
          return {
            y: history.price,
            date: shortTime(history.date),
          };
        }),
      },
    ],
  };
  function renderUsername(user) {
    if (user) {
      if (getFristOwner.length >= 20) {
        return truncateAddress(user);
      } else {
        return user;
      }
    }
  }
  async function cancelListing() {
    try {
      if (blockChain && network.blockChain && blockChain !== network.blockChain) {
        message("info", t(`Wrong network! please switch to ${blockChain}`));
        return false;
      }
      // const account = accounts[0];
      setCancelListingLoading(true);
      const provider = await detectEthereumProvider();
      const step1Response = await postRequest(
        `${API_URL_CANCEL_LISTING}/${listingId}/step1`,
        { blockChain: blockChain }
      );
      const txConfig = {
        ...step1Response.data.data.txConfig,
        from: getUser()?.publicAddress,
      };
      const txHash = await provider.request({
        method: "eth_sendTransaction",
        params: [txConfig],
      });
      const step2Response = await postRequest(
        `${API_URL_CANCEL_LISTING}/${listingId}/step2`,
        { txId: txHash, blockChain: blockChain }
      );
      message("success", t("Cancel Listing has been done!"));
      window.location.reload();
    } catch (e) {
      if (e?.code) {
        message("error", e?.message);
      }
      setCancelListingLoading(false);
    }
  }
  const handleCancelOwnersModal = () => {
    setIsModalOwners(false);
  };
  function openOwnersModal() {
    setIsModalOwners(true);
  }
  const handleCancelFixModal = () => {
    setIsModalOpenFix(false);
  };
  function openFixModal() {
    setIsModalOpenFix(true);
  }
  function onOpenCheckoutModal(data) {
    if (data) {
      // if data exist so we came to this function from listing, if it's not, we came from big button
      setCurrentBidOrFixActionDetails(data);
    } else {
      setCurrentBidOrFixActionDetails({
        listingId: id,
        usdPrice,
        type,
        unitPrice,
        remainedQuantity,
        expiration,
        bestOffer,
      });
    }
    openFixModal();
  }
  function onOpenMakeOfferModal(data) {
    if (data) {
      // if data exist so we came to this function from listing, if it's not, we came from big button
      setCurrentBidOrFixActionDetails(data);
    } else {
      setCurrentBidOrFixActionDetails({
        listingId: id,
        usdPrice,
        type,
        unitPrice,
        remainedQuantity,
        expiration,
        bestOffer,
      });
    }
    openOfferModal();
  }

  async function onFixPurchase() {
    if (isAuth()) {
      try {
        if (blockChain && network.blockChain && blockChain !== network.blockChain) {
          message("info", t(`Wrong network! please switch to ${blockChain}`));
          return false;
        }
        // const account = accounts[0];
        setFixPurchaseLoading(true);
        const provider = await detectEthereumProvider();
        const step1Response = await postRequest(API_URL_CHECKOUT_STEP1, {
          itemId,
          listingId: currentBidOrFixActionDetails.listingId,
          quantity: currentBidOrFixActionDetails.remainedQuantity,
          blockChain: blockChain
        });
        const txConfig = {
          ...step1Response.data.data.txConfig,
          from: getUser()?.publicAddress,
        };
        const txHash = await provider.request({
          method: "eth_sendTransaction",
          params: [txConfig],
        });
        const step2Response = await postRequest(API_URL_CHECKOUT_STEP2, {
          itemId,
          txId: txHash,
          blockChain: blockChain
        });
        message("success", t("your purchase has been done!"));
        window.location.reload();
      } catch (e) {
        if (e?.code) {
          message("error", e?.message);
        }
        setFixPurchaseLoading(false);
      }
    } else {
      message("info", t("please login/register first!"));
    }
  }
  const handleCancelOfferModal = () => {
    setIsModalOpenOffer(false);
  };
  function openOfferModal() {
    setIsModalOpenOffer(true);
  }
  async function onMakeOffer(values) {

    if (isAuth()) {
      try {
        if (blockChain && network.blockChain && blockChain !== network.blockChain) {
          message("info", t(`Wrong network! please switch to ${blockChain}`));
          return false;
        }
        // const account = accounts[0];
        setMakeOfferLoading(true);
        const provider = await detectEthereumProvider();
        const step1Response = await postRequest(API_URL_POST_OFFER_STEP1, {
          ...values,
          itemId,
          listingId: currentBidOrFixActionDetails.listingId,
          blockChain: blockChain
        });
        const txConfig = {
          ...step1Response.data.data.txConfig,
          from: getUser()?.publicAddress,
        };
        const txHash = await provider.request({
          method: "eth_sendTransaction",
          params: [txConfig],
        });
        const step2Response = await postRequest(API_URL_POST_OFFER_STEP2, {
          itemId,
          txId: txHash,
          blockChain: blockChain
        });
        message("success", t("your OFFER has been sent!"));
        window.location.reload();
      } catch (e) {
        if (e?.code) {
          message("error", e?.message);
        }
        setMakeOfferLoading(false);
      }
    } else {
      message("info", t("please login/register first!"));
    }
  }
  function renderBuy() {
    if (isOwner === false) {
      if (listingInfo.length !== 0) {
        if (type === "FIX") {
          return (
            <div className="sale-box fixed line pb20 pt20">
              <div className="price">
                <p className="description">{t("Current price")}</p>
                <div className="amount">
                  {remainedQuantity > 1 ? (
                    <span className="quanity">{`${remainedQuantity}x`}</span>
                  ) : (
                    <Fragment />
                  )}
                  <span className="network-value">{`${unitPrice} ${blockChain === "POLYGON" ? "MATIC" : "BNB"}`}</span>
                  <span className="usd-value">{`(${usdPriceDollor(
                    usdPrice
                  )})`}</span>
                </div>
              </div>
              <div className="actions">
                <Button
                  icon={<TbTag />}
                  type="primary"
                  size="large"
                  onClick={() => onOpenCheckoutModal()}
                >
                  {t("Buy Now")}
                </Button>
              </div>
            </div>
          );
        } else if (type === "BID") {
          return (
            <div className="sale-box auction line pb20 pt20">
              <div className="time">
                <span className="icon">
                  <TagOutlined />
                </span>
                <span className="text">
                  {`${t("Sale ends")} ${timeWithHour(expiration)}`}
                </span>
              </div>
              <div className="price">
                <p className="description">
                  {t("Minimum bid -- Reserve price not met.")}
                </p>
                <div className="amount">
                  <span className="network-value">{unitPrice} {blockChain === "POLYGON" ? "MATIC" : "BNB"}</span>
                  <span className="usd-value">{`( ${usdPriceDollor(
                    usdPrice
                  )})`}</span>
                  <span className="info">
                    <Tooltip
                      title={t(
                        "the highest bidder will win the item at the end of the auction."
                      )}
                    >
                      <TbInfoCircle />
                    </Tooltip>
                  </span>
                </div>
              </div>
              <div className="actions">
                <Button
                  icon={<TbClick />}
                  type="primary"
                  size="large"
                  onClick={() => onOpenMakeOfferModal()}
                  className="make-offer-btn"
                >
                  {t("Make Offer")}
                </Button>
              </div>
            </div>
          );
        }
      }
    } else {
      return <Fragment />;
    }
  }
  async function onFavorite() {
    if (isAuth()) {
      try {
        const response = await patchRequest(
          `${API_URL_GET_SINGLE_ITEM}/${slug}/favourite`
        );
        setIsFavourited(response.data.data.flag);
        setTotalFavourites(response.data.data.totalFavourites);
      } catch (e) { }
    } else {
      message("info", t("please login/register first!"));
    }
  }
  function calculateTotal(price, quanity, fee) {
    return (
      Math.ceil((price * quanity + (price * quanity * fee) / 100) * 100000000) /
      100000000
    );
  }

  return (
    <Style>
      <Seo title={title} desc={description} image={fileUrl} />
      <Mainlayout>
        <div className="container pt40 pb40">
          {isOwner ? (
            <div className="owner-actions pb40">
              <ul>
                {isListed ? (
                  <li>
                    <Popconfirm
                      title={t("Are you sure to cancel listing?")}
                      placement="bottom"
                      okText={t("Yes")}
                      size="large"
                      onConfirm={() => cancelListing()}
                      cancelText={t("Cancel")}
                      okButtonProps={{
                        size: "medium",
                        loading: cancelListingLoading,
                      }}
                      cancelButtonProps={{ size: "medium" }}
                    >
                      <Button size="large">{t("Cancel Listing")}</Button>
                    </Popconfirm>
                  </li>
                ) : (
                  <Fragment />
                )}
                {!isListed ? (
                  <li>
                    <Link
                      href={ROUTE_LIST_ASSET.replace(":slug", slug)}
                      prefetch={false}
                    >
                      <a>
                        <Button type="primary" size="large">
                          {t("Sell")}
                        </Button>
                      </a>
                    </Link>
                  </li>
                ) : (
                  <Fragment />
                )}
              </ul>
            </div>
          ) : (
            <Fragment />
          )}
          <div className="pipe-shape">
            <Row gutter={40}>
              <Col
                xs={{ span: 24, order: 1 }}
                sm={{ span: 24, order: 1 }}
                md={{ span: 12, order: 1 }}
                lg={{ span: 8, order: 1 }}
                xl={{ span: 8, order: 1 }}
                xxl={{ span: 8, order: 1 }}
              >
                <div className="asset-file">
                  <LazyLoadImage radius={true} width="100%" src={fileUrl} alt={title} />
                </div>
                <div style={{ background: "#1A1C1E" }}>
                  <div className="item-description desc ">
                    <h5>
                      <span>
                        <i className="bi bi-list" />
                      </span>
                      {t("Description")}
                    </h5>
                    <p>{description}</p>
                  </div>
                  <hr className="nft-detail-hr" />
                  <div className="panels">
                    <Collapse
                      ghost
                      expandIconPosition="end"
                      defaultActiveKey={[1, 2, 3]}
                    >
                      <Panel
                        header={
                          <div>
                            <img src="/assets/icons/traits_icon.svg" alt="traits Icon" />&nbsp;&nbsp;
                            {t("Properties")}
                          </div>
                        }
                        key={1}>
                        <div className="properties">
                          <ul>{renderProperties()}</ul>
                        </div>
                      </Panel>
                      <hr className="nft-detail-hr" />

                      <Panel
                        key={2}
                        header={
                          <div>
                            <img src="/assets/icons/aboutlendo_icon.svg" alt="aboutlendo Icon" />&nbsp;&nbsp;
                            {`${t("about")} ${collectionName}`}
                          </div>
                        }
                      >
                        <div className="about-collection">
                          {collectionDescription}
                        </div>
                      </Panel>
                      <hr className="nft-detail-hr" />

                      <Panel
                        key={3}
                        header={
                          <div>
                            <img src="/assets/icons/details_icon.svg" alt="Details Icon" />&nbsp;&nbsp;
                            {t("details")}
                          </div>
                        }>

                        <div className="details">
                          <ul>
                            <li>
                              <span className="detail-title">
                                {t("Contract Address")}
                              </span>
                              <span className="detail-value">
                                <a
                                  href={blockExplorerLink(
                                    contractAddress,
                                    "address",
                                    '',
                                    blockChain
                                  )}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {truncateAddress(contractAddress)}
                                </a>
                              </span>
                            </li>
                            <li>
                              <span className="detail-title">
                                {t("Token ID")}
                              </span>
                              <span className="detail-value">
                                <a
                                  href={blockExplorerLink(
                                    tokenId,
                                    "token",
                                    contractAddress,
                                    blockChain
                                  )}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {tokenId}
                                </a>
                              </span>
                            </li>
                            <li>
                              <span className="detail-title">
                                {t("Token Standard")}
                              </span>
                              <span className="detail-value">{protocol}</span>
                            </li>
                            <li>
                              <span className="detail-title">{t("Chain")}</span>
                              <span className="detail-value">{blockChain}</span>
                            </li>
                            <li>
                              <span className="detail-title">
                                {t("metadata")}
                              </span>
                              <span className="detail-value">
                                <a target="_blank" rel="noreferrer" href={ipfs}>
                                  <Tooltip title={t("Decentralized storage")}>
                                    {t("IPFS")}
                                  </Tooltip>
                                </a>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </Col>
              <Col
                xs={{ span: 24, order: 1 }}
                sm={{ span: 24, order: 1 }}
                md={{ span: 12, order: 1 }}
                lg={{ span: 16, order: 1 }}
                xl={{ span: 16, order: 1 }}
                xxl={{ span: 16, order: 1 }}
              >
                <div className="collection-name">
                  <h2 className="title">
                    <Link
                      href={ROUTE_SINGLE_COLLECTION.replace(
                        ":slug",
                        collectionSlug
                      )}
                      prefetch={false}
                    >
                      <a>{collectionName}</a>
                    </Link>
                  </h2>
                </div>
                <div className="item-title">
                  <h1 className="title">{title}</h1>
                </div>
                <div className="item-information">
                  <ul>
                    <li>
                      {itemOwners.length >= 2 ? (
                        <Fragment>
                          {t("Owned by")}
                          <a href="#" onClick={openOwnersModal}>
                            {`${itemOwners.length} ${t("People")}`}
                          </a>
                        </Fragment>
                      ) : (
                        <Fragment>
                          {t("Owned by")}
                          <Link
                            href={ROUTE_ACCOUNT_OTHERS.replace(
                              ":username",
                              getFristOwner
                            )}
                            prefetch={false}
                          >
                            <a>{renderUsername(getFristOwner)}</a>
                          </Link>
                        </Fragment>
                      )}
                    </li>
                    <li>
                      <EyeOutlined /> {views} {t("Views")}
                    </li>
                    <li className="favorite-box" onClick={onFavorite}>
                      {isFavourited ? (
                        <Fragment>
                          <HeartFilled className="favorited" />{" "}
                          {totalFavourites} {t("Favorites")}{" "}
                        </Fragment>
                      ) : (
                        <Fragment>
                          <HeartOutlined /> {totalFavourites} {t("Favorites")}{" "}
                        </Fragment>
                      )}
                    </li>
                    <li>
                      <AppstoreOutlined /> {`${t("Supply")} ${quantity}`}
                    </li>
                  </ul>
                </div>
                <div className="item-price">{renderBuy()}</div>

                <Collapse
                  ghost
                  expandIconPosition="end"
                  defaultActiveKey={[1, 2, 3]}
                >
                  <Panel header={`${t("listings")}`} key={2}>
                    <div className="item-listing">
                      <Table
                        columns={listingsColumns}
                        rowKey={"id"}
                        dataSource={listingData.data}
                        loading={listingLoading}
                        pagination={{
                          onChange: onChangePaginationListings,
                          total: listingData.metadata.total,
                          current: listingData.metadata.offset,
                          defaultPageSize: 12,
                          hideOnSinglePage: true,
                        }}
                      />
                    </div>
                  </Panel>
                  <Panel header={`${t("offers")}`} key={3}>
                    <div className="item-offers">
                      <Table
                        columns={offersColumns}
                        rowKey={"id"}
                        dataSource={offerData.data}
                        loading={offerLoading}
                        pagination={{
                          onChange: onChangePaginationOffers,
                          total: offerData.metadata.total,
                          current: offerData.metadata.offset,
                          defaultPageSize: 12,
                          hideOnSinglePage: true,
                        }}
                      />
                    </div>
                  </Panel>
                  <Panel header={`${t("price history")}`} key={1}>
                    <div className="item-price-history">
                      <div
                        className="chart-wrapper"
                        style={{ height: "200px" }}
                      >
                        {isEmpty(priceHistory) ? (
                          <Empty />
                        ) : (
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                          />
                        )}
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </div>
          <Row>
            <Col md={24}>
              <div className="activity pt40 pb40">
                <Collapse
                  ghost
                  expandIconPosition="end"
                  defaultActiveKey={[1, 2, 3]}
                >
                  <Panel key={2} header={
                    <div>
                      <img src="/assets/icons/activity_icon.svg" alt="Activity Icon" /> &nbsp;
                      {t("item activity")}
                    </div>}>
                    <Table
                      columns={activityColumns}
                      rowKey="id"
                      dataSource={activityData.data}
                      loading={activityLoading}
                      pagination={{
                        onChange: onChangePaginationActivity,
                        total: activityData.metadata.total,
                        current: activityData.metadata.offset,
                        defaultPageSize: 12,
                        hideOnSinglePage: true,
                      }}
                    />
                  </Panel>

                </Collapse>
              </div>
            </Col>
          </Row>

          <div className="related-items pt40">
            <HeaderWithLink
              title="More From This Collection"
              link={{
                pathname: ROUTE_SINGLE_COLLECTION.replace(
                  ":slug",
                  collectionSlug
                ),
              }}
              textLink="View collection"
            />
            <Spin spinning={relatedLoading} size="large">
              <ProfileNftList data={relatedData} size="medium" />
            </Spin>
          </div>
        </div>
        <Modal
          title={t("Complete checkout")}
          open={isModalOpenFix}
          // onOk={onFixPurchase}
          className="purchaseModal"
          onCancel={handleCancelFixModal}
          destroyOnClose={true}
          footer={[
            <Button
              key="submit"
              type="primary"
              block
              size="large"
              onClick={onFixPurchase}
              loading={fixPurchaseLoading}
            >
              {t("Complete purchase")}
            </Button>,
          ]}
        >
          <div className="header-summary">
            <b>{t("Item")}</b>
            <b>{`${t("Total")} + LendoChain Fee (${SYSTEM_FIX_FEE[0].rate
              }%)`}</b>
          </div>
          <div className="purchaseDetailSummary">
            <div className="info">
              <div className="item-file">
                <LazyLoadImage src={fileUrl} width="60" />
              </div>
              <div className="item-detail">
                <span className="collection-name">
                  <a
                    href={ROUTE_SINGLE_COLLECTION.replace(
                      ":slug",
                      collectionSlug
                    )}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {collectionName}
                  </a>
                </span>
                <span className="item-name">{title}</span>
                <span className="item-quantity">
                  {" "}
                  {`quantity: ${currentBidOrFixActionDetails.remainedQuantity}`}
                </span>
              </div>
            </div>
            <div className="total">
              <div className="price-network">
                <NetworkIconWithPrice
                  secondaryDesign={true}
                  blockchain={blockChain === "POLYGON" ? "MATIC" : "BNB"}
                  price={currentBidOrFixActionDetails.unitPrice}
                />
              </div>
              <div className="price-usd">{`${usdPriceDollor(
                currentBidOrFixActionDetails.usdPrice *
                currentBidOrFixActionDetails.remainedQuantity
              )}`}</div>
              <span className="total">{`${t("Total: ")} (${calculateTotal(
                currentBidOrFixActionDetails.unitPrice,
                currentBidOrFixActionDetails.remainedQuantity,
                SYSTEM_FIX_FEE[0].rate
              )} ${blockChain === "POLYGON" ? "MATIC" : "BNB"})`}</span>
            </div>
          </div>
        </Modal>
        <Modal
          title={t("Make offer")}
          open={isModalOpenOffer}
          className="purchaseModal"
          onCancel={handleCancelOfferModal}
          destroyOnClose={true}
          footer={null}
        >
          <div className="header-summary">
            <b>{t("Item")}</b>
            <b>{`${t("Total")} + LendoChain Fee (${SYSTEM_BID_FEE[0].rate
              }%)`}</b>
          </div>
          <div className="purchaseDetailSummary">
            <div className="info">
              <div className="item-file">
                <LazyLoadImage src={fileUrl} width="60" />
              </div>
              <div className="item-detail">
                <span className="collection-name">
                  <a
                    href={ROUTE_SINGLE_COLLECTION.replace(
                      ":slug",
                      collectionSlug
                    )}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {collectionName}
                  </a>
                </span>
                <span className="item-name">{title}</span>
                <span className="item-quantity">{`quantity: ${currentBidOrFixActionDetails.remainedQuantity}`}</span>
              </div>
            </div>
            <div className="total">
              <div className="price-network">
                <NetworkIconWithPrice
                  secondaryDesign={true}
                  blockchain={blockChain === "POLYGON" ? "MATIC" : "BNB"}
                  price={currentBidOrFixActionDetails.unitPrice}
                />
              </div>
              <div className="price-usd">{`$${currentBidOrFixActionDetails.usdPrice.toFixed(
                2
              )}`}</div>
              {/* <span className="total">{`${t("Total: ")} (${calculateTotal(
                      unitPrice,
                      remainedQuantity,
                      SYSTEM_BID_FEE[0].rate
                    )} BNB)`}</span> */}
            </div>
          </div>
          <div className="offer-information">
            <ul className="balance-information">
              <li>
                <span className="title">{t("Best offer")}</span>
                <span className="value">
                  <NetworkIconWithPrice
                    secondaryDesign={true}
                    blockchain={blockChain === "POLYGON" ? "MATIC" : "BNB"}
                    price={currentBidOrFixActionDetails.bestOffer}
                  />
                </span>
              </li>
            </ul>
            <Form
              onFinish={onMakeOffer}
              form={form}
              layout="vertical"
              className="form"
              initialValues={{
                quantity: currentBidOrFixActionDetails.remainedQuantity,
                unitPrice: currentBidOrFixActionDetails.bestOffer
                  ? currentBidOrFixActionDetails.bestOffer
                  : currentBidOrFixActionDetails.unitPrice,
              }}
            >
              <Form.Item
                name="unitPrice"
                rules={[
                  {
                    required: true,
                    message: t("Please enter a price"),
                  },
                  {
                    min: currentBidOrFixActionDetails.bestOffer
                      ? currentBidOrFixActionDetails.bestOffer
                      : currentBidOrFixActionDetails.unitPrice,
                    type: "number",
                    message: t(
                      "you should enter price more than minimum price to make offer"
                    ),
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  min={
                    currentBidOrFixActionDetails.bestOffer
                      ? currentBidOrFixActionDetails.bestOffer
                      : currentBidOrFixActionDetails.unitPrice
                  }
                  placeholder={t("price")}
                  addonAfter={blockChain === "POLYGON" ? "MATIC" : "BNB"}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  size="large"
                  loading={makeOfferLoading}
                >
                  {t("Make offer")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <Modal
          title={`${title} ${t("Owners")}`}
          open={isModalOwners}
          className="purchaseModal"
          onCancel={handleCancelOwnersModal}
          destroyOnClose={true}
          footer={null}
        >
          <List
            itemLayout="horizontal"
            dataSource={itemOwners}
            renderItem={item => {
              const { user } = item;
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <UserIdWithAvatar
                        justImage={true}
                        size={65}
                        data={{
                          avatar: user.avatar,
                          username: user.username,
                          publicAddress: user.publicAddress,
                        }}
                      />
                    }
                    title={
                      <Link
                        href={ROUTE_ACCOUNT_OTHERS.replace(
                          ":username",
                          user.username
                        )}
                        prefetch={false}
                      >
                        <a> {user.username}</a>
                      </Link>
                    }
                    description={`${"Owned"} ${item.quantity} ${t("item(s).")}`}
                  />
                </List.Item>
              );
            }}
          />
        </Modal>
      </Mainlayout>
    </Style>
  );
}



export const getServerSideProps = async ctx => {
  const { res, req, params, locale, query } = ctx;
  const { slug } = params;
  let itemApiResponse = {};
  let listingInfo = {};
  try {
    [itemApiResponse, listingInfo] = await Promise.all([
      (itemApiResponse = await getRequest(
        `${API_URL_GET_SINGLE_ITEM}/${slug}`,
        {},
        ctx
      )),
      (listingInfo = await getRequest(
        `${API_URL_GET_SINGLE_ITEM}/${slug}/listInfo`,
        {},
        ctx
      )),
    ]);
  } catch (e) {
    return redirectOnServer(e);
  }
  return {
    props: {
      locale,
      slug: slug,
      data: get(itemApiResponse, "data.data", {}),
      listingInfo: get(listingInfo, "data.data", {}),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};



