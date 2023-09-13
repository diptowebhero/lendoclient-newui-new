import Link from "next/link";
import UserIdWithAvatar from "../userIdWithAvatar";
import { useTranslation } from "next-i18next";
import Style from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, EffectCards, Autoplay } from "swiper";
import textDots from "@src/helpers/textDots";
import LazyLoadImage from "@src/components/lazyLoadImage";
import { ROUTE_SINGLE_ASSET } from "@src/routes";
import { get } from "lodash";
import { networkPrice } from "@src/helpers/getters/price";
import { Button, Row, Col } from "antd";
import 'swiper/swiper-bundle.min.css';
import { useRef } from "react";
import Icon, {
  RightOutlined,
  LeftOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";

// Import navigation styles and add custom styles for navigation labels
// import 'swiper/components/navigation/navigation.min.css';




function CardItem({ data }) {
  const [t, i18n] = useTranslation("common");
  const id = get(data, "id", "");
  const fileUrl = get(data, "fileUrl", "");
  const name = get(data, "name", "");
  const blockChain = get(data, "blockChain", "");
  const creator = get(data, "creator", "");
  const price = get(data, "price", "");
  const slug = get(data, "slug", "");
  const username = get(data, "creator.username", "");
  const avatar = get(data, "creator.avatar", "");
  const publicAddress = get(data, "creator.publicAddress", "");
  const type = get(data, "price.type", "");
  const unitPrice = get(data, "price.unitPrice", 0);
  const asset = get(data, "price.asset", "");
  const previousUnitPrice = get(data, "price.previousUnitPrice", "");
  const floorPrice = get(data, "price.floorPrice", "");
  const last24h = get(data, "price.last24h", "");
  const last7d = get(data, "price.last7d", "");
  const livePrice = get(data, "price.livePrice", "");
  const totalVolume = get(data, "price.totalVolume", "");
  const expiration = get(data, "price.expiration", "");

  return (
    <Link href={ROUTE_SINGLE_ASSET.replace(":slug", slug)}>
      <a className="auction-slider-card" >
        <div className="top">
          <LazyLoadImage src={fileUrl} title={name} width={374} />
        </div>
      </a>
    </Link>
  );

}


export default function AuctionHeroSlider(props) {
  const { data = [] } = props;
  const SliderRef = useRef(null);

  const params = {
    slidesPerView: "auto",
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
    },
    freeMode: {
      enabled: true,
      momentum: false,
      momentumBounce: false,
    },
    centeredSlides: true,
    // loop: true,
    loop: data.length >= 6,
    modules: [FreeMode, Autoplay],
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };


  function renderFarm() {
    return data.map((item, index) => {
      return (
        <SwiperSlide key={index + 1} >
          <Row  gutter={[16, 16]}>
          {/* style={{ height: '34em' }} */}
            <Col style={{ background: "#1D2022", padding: "5%" }} xs={24} sm={24} md={24} lg={12} xl={12} >
              <br /> <br /> <br /> <br />
              <div class="cartexthead"> Lendo Dragonz </div>
              <div class="cartext">
                <p>Lendo Dragonz were born in the fire of the
                  Binance Smart Chain.  </p>
                <p>
                  They rise from the ashes to build the Smart Marketplace that
                  changes everything for BNB Chain NFTs: LendoChain.
                </p>
                <p>  Welcome to the Revolution. </p>
              </div>
              <a href="">
                <button class="launchpadnav">
                  Go To Launchpad
                </button>
              </a>
            </Col>
            <Col style={{ background: "#1D2022" }} xs={24} sm={24} md={24} lg={12} xl={12}>
              <CardItem data={item}></CardItem>
            </Col>
          </Row>
        </SwiperSlide>
      );
    });
  }




  return (
    <Style>
      <div className="card-slider ">
        {/* <br /> <br /> <br /> */}
        <div className="swiper-container">
          <div className="second">
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
            </div>&nbsp;&nbsp;&nbsp;
          </div>

          <Swiper
            ref={SliderRef}
            {...params}
            init="false"
            className="main-swiper-box"
            // style={{ width: '89%', height: '30rem', marginTop: '-44%' }}
          >
            {renderFarm()}
          </Swiper>
        </div>
      </div>
      <br />

    </Style>
  );
}







