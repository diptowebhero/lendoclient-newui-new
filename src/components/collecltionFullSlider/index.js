import Style from "./style";
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper";
import { Fragment, useRef, useState } from "react";
import Icon, {
  RightOutlined,
  LeftOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { Select } from "antd";
import CollectionCard from "@src/components/cards/collectionCard";
import CardNFT from "../lists/nftList/CardNFT";


const { Option } = Select;

export default function CollectionFullSlider(props) {
  const SliderRef = useRef(null);
  const [t, i18n] = useTranslation("common");
  const { data } = props;

  function renderFarm() {
    return data.map(item => {
      return (
        <SwiperSlide key={item.id}>
          {/* <CollectionCard data={item}></CollectionCard> */}
          <CardNFT data={item} size="medium" ></CardNFT>
        </SwiperSlide>
      );
    });
  }

  const params = {
    slidesPerView: "auto",
    spaceBetween: 25,
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
    // breakpoints: {
    //   1200: {
    //     slidesPerView: 4, 
    //     spaceBetween: 20, 
    //   },
    //   950: {
    //     slidesPerView: 3, 
    //     spaceBetween: 10, 
    //   },
    //   768: {
    //     slidesPerView: 2, 
    //     spaceBetween: 10, 
    //   },
    //   450: {
    //     slidesPerView: 1, 
    //     spaceBetween: 10, 
    //   },
    // },
  };
  return (
    <Style>
      <div className="collection-full-slider">
        <div className="container">
          <div className="headerWithPaginate">
            <div className="first">
              <span>
                {t("Trending")}&nbsp;
                <span class="text_orange ">{t("Auctions")}</span>
              </span>
            </div>
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

              <a class="read_more text-decoration-none" href="/explore-art" style={{ color: '#ACACAC', marginTop: '3%' }} >
                <span>View All Trending Auctions &gt; </span>
                <span>
                  <i class="bi bi-chevron-right"></i>
                </span>
              </a>
            </div>


          </div>
        </div>

        <Swiper ref={SliderRef} {...params}>
          {renderFarm()}
        </Swiper>
      </div>
    </Style>
  );
}
