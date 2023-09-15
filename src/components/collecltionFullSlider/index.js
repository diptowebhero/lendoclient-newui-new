import Icon, { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useTranslation } from "next-i18next";
import { useRef } from "react";
import { Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CardNFT from "../lists/nftList/CardNFT";
import Style from "./style";

const { Option } = Select;

export default function CollectionFullSlider(props) {
  const SliderRef = useRef(null);
  const [t, i18n] = useTranslation("common");
  const { data } = props;

  function renderFarm() {
    return data.map(item => {
      return (
        <SwiperSlide key={item.id} className="s_my_class">
          {/* <CollectionCard data={item}></CollectionCard> */}
          <CardNFT data={item} size="medium" ></CardNFT>
        </SwiperSlide>
      );
    });
  }

  const params = {
    // slidesPerView: 3,
    // // spaceBetween: 25,
    // autoplay: {
    //   delay: 5000,
    // },
    // freeMode: {
    //   enabled: true,
    //   momentum: false,
    //   momentumBounce: false,
    // },
    // centeredSlides: true,
    // loop: true,
    // loop: data.length >= 6,
    // modules: [FreeMode, Autoplay],
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    // breakpoints:{
    //   640: {
    //     slidesPerView: 1,
    //     spaceBetween: 20,
    //   },
    //   768: {
    //     slidesPerView: 1,
    //     spaceBetween: 40,
    //   },
    //   1024: {
    //     slidesPerView: 1,
    //     spaceBetween: 50,
    //   },
    //   1200: {
    //     slidesPerView: 1,
    //     spaceBetween: 50,
    //   },
    //   1500: {
    //     slidesPerView: 4,
    //     spaceBetween: 50,
    //   },
    // }
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
              </div>
              &nbsp;&nbsp;&nbsp;
              <a
                class="read_more text-decoration-none"
                href="/explore-art"
                style={{ color: "#ACACAC", marginTop: "3%" }}
              >
                <span>View All Trending Auctions &gt; </span>
                <span>
                  <i class="bi bi-chevron-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>

        <Swiper
          ref={SliderRef}
          // {...params}
          slidesPerView={4}
        spaceBetween={10}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
          loop="true"
          breakpoints={{
            375: {
              slidesPerView: 1,
              spaceBetween: 15,
              
            },
            450: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1100: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
       
        >
          {renderFarm()}
        </Swiper>
      </div>
    </Style>
  );
}
