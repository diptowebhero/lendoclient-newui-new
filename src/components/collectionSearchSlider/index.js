import Style from "./style";
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Fragment, useRef } from "react";
import Icon, { RightOutlined, LeftOutlined } from "@ant-design/icons";
import AvatarWithVerified from "@src/components/avatarWithVerify";
import Link from "next/link";
import NetworkIconWithPrice from "@src/components/networkIconWithPrice";
import "swiper/css/pagination";
import TheBigTitle from "@src/components/titles/theBigTitle";
import { useRouter } from "next/router";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { ROUTE_ACCOUNT_OTHERS, ROUTE_SINGLE_COLLECTION } from "@src/routes";
import { Empty } from "antd";
import { truncateAddress } from "@src/helpers/walletConnect/utils.web3";
import LazyLoadImage from "../lazyLoadImage";

export default function CollectionSearchSlider(props) {
  const router = useRouter();
  const { q } = router.query;
  const SliderRef = useRef(null);
  const [t, i18n] = useTranslation("common");
  const { data } = props;
  function renderFarm() {
    return data.map(item => {
      const id = get(item, "id", "");
      const name = get(item, "name", "");
      const logoImage = get(item, "logoImage", "");
      const slug = get(item, "slug", "");
      const featured = get(item, "featured", "");
      const featuredImage = get(item, "featuredImage", "");
      const bannerImage = get(item, "bannerImage", "");
      const description = get(item, "description", "");
      const blockChain = get(item, "blockChain", "");
      const paymentToken = get(item, "paymentToken", "");
      const verify = get(item, "verify", false);
      const username = get(item, "user.username", "");
      const avatar = get(item, "user.avatar", "");
      const publicAddress = get(item, "user.publicAddress", "");
      const items = get(item, "items", []);
      const countItems = get(item, "countItems", 0);
      const countOwners = get(item, "countOwners", 0);
      const floorPrice = get(item, "price.floorprice", 0);
      const totalVolume = get(item, "price.totalVolume", 0);
      const asset = get(item, "price.asset", "BNB");
      function renderUsername() {
        if (username) {
          if (username.length >= 20) {
            return truncateAddress(username);
          } else {
            return username;
          }
        }
      }
      return (
        <SwiperSlide key={id}>
          <div className="collection-search-item">
            <Link
              href={ROUTE_SINGLE_COLLECTION.replace(":slug", slug)}
              prefetch={false}
            >
              <a className="item">
                <div className="information">
                  <div className="avatar">
                    <AvatarWithVerified
                      image={logoImage}
                      title={name}
                      avatarSize="medium"
                      verified={verify}
                    />
                  </div>
                  <div className="names">
                    <h5 className="title">{name}</h5>
                    <p className="owner">
                      <span>{t("by")}</span>{" "}
                      <Link
                        href={ROUTE_ACCOUNT_OTHERS.replace(
                          ":username",
                          username
                        )}
                        prefetch={false}
                      >
                        <a>{renderUsername()}</a>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="statistics">
                  <ul>
                    <li>
                      <span className="value">{countItems}</span>
                      <span className="title">{t("items")}</span>
                    </li>
                    <li>
                      <span className="value">{countOwners}</span>
                      <span className="title">{t("owner")}</span>
                    </li>
                    <li>
                      <span className="value">
                        <NetworkIconWithPrice
                          blockchain={asset}
                          price={floorPrice}
                          secondaryDesign
                        />
                      </span>
                      <span className="title">{t("floor price")}</span>
                    </li>
                    <li>
                      <span className="value">
                        <NetworkIconWithPrice
                          blockchain={asset}
                          price={totalVolume}
                          secondaryDesign
                        />
                      </span>
                      <span className="title">{t("volume")}</span>
                    </li>
                  </ul>
                </div>
                <div className="nfts">
                  <ul>{renderNfts(items)}</ul>
                </div>
              </a>
            </Link>
          </div>
        </SwiperSlide>
      );
    });
  }
  function renderNfts(items) {
    return items.map(item => {
      const { id, fileUrl } = item;
      return (
        <li key={id}>
          <LazyLoadImage src={fileUrl} width={58} height={58} />
        </li>
      );
    });
  }
  const params = {
    slidesPerView: 3,
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
    },
    modules: [Pagination],
    pagination: {
      enabled: true,
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      620: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },
    },
  };
  return (
    <Style>
      <div className="collection-search-slider">
        <TheBigTitle title={q ? decodeURIComponent(q) : ""} />
        <div className="headerWithPaginate pb20">
          <div className="first">
            <h3>{t("Collection results")}</h3>
          </div>
          <div className="second">
            {!isEmpty(data) ? (
              <div className="next-prev">
                <div
                  className="prev"
                  onClick={() => SliderRef.current.swiper.slidePrev()}
                >
                  <Icon component={LeftOutlined} />
                </div>
                <div
                  className="next"
                  onClick={() => SliderRef.current.swiper.slideNext()}
                >
                  <Icon component={RightOutlined} />
                </div>
              </div>
            ) : (
              <Fragment />
            )}

            <div className="swiper-pagination" />
          </div>
        </div>
        {!isEmpty(data) ? (
          <Swiper ref={SliderRef} {...params}>
            {renderFarm()}
          </Swiper>
        ) : (
          <Empty />
        )}
      </div>
    </Style>
  );
}
