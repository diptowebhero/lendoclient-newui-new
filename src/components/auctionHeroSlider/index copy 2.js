import Link from "next/link";
import UserIdWithAvatar from "../userIdWithAvatar";
import { useTranslation } from "next-i18next";
import Style from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper";
import textDots from "@src/helpers/textDots";
import LazyLoadImage from "@src/components/lazyLoadImage";
import { ROUTE_SINGLE_ASSET } from "@src/routes";
import { get } from "lodash";
import { networkPrice } from "@src/helpers/getters/price";
import { Button, Row, Col } from "antd";
import 'swiper/swiper-bundle.min.css';

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
      <a className="auction-slider-card" style={{ width: '86%' }}>
        <div className="top">
          <LazyLoadImage src={fileUrl} title={name} width={374} height={374} />
        </div>
        {/* <div className="bottom">
          <div className="content">
            <div className="owner">
              <UserIdWithAvatar
                data={{
                  avatar,
                  username,
                  publicAddress,
                }}
              />
            </div>
            <p className="title">{textDots(name, 30)}</p>
            <h6 className="price">{`${networkPrice(unitPrice)} ${asset}`}</h6>
          </div>
          <div className="auction-type">
            <p>{type ? type : t("MINT")}</p>
          </div>
        </div> */}
      </a>
    </Link>
  );

}


export default function AuctionHeroSlider(props) {
  const { data = [] } = props;

  function renderFarm() {
    return data.map(item => {
      return (
        <SwiperSlide key={item.id}>
          <Row >
            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
              <br /> <br /> <br />
              <br /> <br /> <br />
              <h1>jehrbgje krtjbv ekrjbgierg jretgijb </h1>
              <br /> <br /> <br />
              <br /> <br /> <br />
            </Col> &nbsp;&nbsp;&nbsp;&nbsp;
            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
              <CardItem data={item}></CardItem>
            </Col></Row>
        </SwiperSlide>
      );
    });
  }


  return (
    <Style>
      <div className="card-slider ">
        <br /> <br /> <br />

        <Swiper
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          effect={"cards"}
          grabCursor={true}
          className="swapper-ssssss"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index} > &nbsp;&nbsp;&nbsp;&nbsp;
              <Row style={{padding:'4%',marginTop:'4%'}} gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={2} xl={2} ></Col>
                <Col xs={24} sm={24} md={24} lg={10} xl={10} >
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
                </Col> &nbsp;&nbsp;&nbsp;&nbsp;
                <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                  <CardItem data={item}></CardItem>
                </Col>
              </Row>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Style>
  );
}







