import Style from "./style";
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { FreeMode, Autoplay } from "swiper";
import { useRef, useState } from "react";
import Icon, {
  RightOutlined,
  LeftOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { Col, Row, Select } from "antd";
import TestimonialCard from "@src/components/cards/testimonialCard";

const { Option } = Select;

export default function TestimonialSlider(props) {
  const SliderRef = useRef(null);
  const [t, i18n] = useTranslation("common");
  const { data } = props;
  const [collections, setCollections] = useState(data);
  const [filteredCollection, setFilteredCollection] = useState(collections);

  function renderFarm() {
    return data.map((item, i) => {
      return (
        <SwiperSlide key={i}>
          <TestimonialCard data={item}></TestimonialCard>
        </SwiperSlide>
      );
    });
  }
  const params = {
    slidesPerView: 2,
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
    loop: true,
    breakpoints: {
      800: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      },
    },
  };
  return (
    <Style>
      <div className="container">
        <Swiper className="testimonial-space" ref={SliderRef} {...params}>
          {renderFarm()}
        </Swiper>
        <div className="headerWithPaginate pt40">
          <div className="second">
            <div className="swiper-pagination" />
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
          </div>
        </div>
      </div>
    </Style>
  );
}
