import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import TestimonialSlider from "@src/components/testimonialSlider";
import Style from "@src/partials/careers/style";
import { Button, Col, Row } from "antd";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Careers(props) {
  const [t, i18n] = useTranslation("careers");
  const TESTIMONIAL_COLLECTIONS = [
    {
      id: 1,
      avatar: "/assets/data/testimonial-avatar1.png",
      name: "3LAU",
      job: t("careers.loc.job1"),
      content:
        "Lendo was the first platform I sold my art on, because it was easy. Fast forward months later, I now work for the company as the Social Media Manager. I love that I’m an artist helping artists share their work with the world.later, I now work for the company as the Social Media Manager",
    },
    {
      id: 2,
      avatar: "/assets/data/testimonial-avatar2.png",
      name: "Dylan Field",
      job: t("careers.loc.job1"),
      content:
        "Lendo was the first platform I sold my art on, because it was easy. Fast forward months later, I now work for the company as the Social Media Manager. I love that I’m an artist helping artists share their work with the world.later, I now work for the company as the Social Media Manager",
    },
    {
      id: 3,
      avatar: "/assets/data/testimonial-avatar2.png",
      name: "3LAU",
      job: t("careers.loc.job1"),
      content:
        "Lendo was the first platform I sold my art on, because it was easy. Fast forward months later, I now work for the company as the Social Media Manager. I love that I’m an artist helping artists share their work with the world.later, I now work for the company as the Social Media Manager",
    },
    {
      id: 4,
      avatar: "/assets/data/testimonial-avatar2.png",
      name: "Dylan Field",
      job: t("careers.loc.job1"),
      content:
        "Lendo was the first platform I sold my art on, because it was easy. Fast forward months later, I now work for the company as the Social Media Manager. I love that I’m an artist helping artists share their work with the world.later, I now work for the company as the Social Media Manager",
    },
    {
      id: 5,
      avatar: "/assets/data/testimonial-avatar1.png",
      name: "3LAU",
      job: t("careers.loc.job1"),
      content:
        "Lendo was the first platform I sold my art on, because it was easy. Fast forward months later, I now work for the company as the Social Media Manager. I love that I’m an artist helping artists share their work with the world.later, I now work for the company as the Social Media Manager",
    },
    {
      id: 6,
      avatar: "/assets/data/testimonial-avatar2.png",
      name: "Dylan Field",
      job: t("careers.loc.job1"),
      content:
        "Lendo was the first platform I sold my art on, because it was easy. Fast forward months later, I now work for the company as the Social Media Manager. I love that I’m an artist helping artists share their work with the world.later, I now work for the company as the Social Media Manager",
    },
    {
      id: 7,
      avatar: "/assets/data/testimonial-avatar1.png",
      name: "3LAU",
      job: t("careers.loc.job1"),
      content:
        "Lendo was the first platform I sold my art on, because it was easy. Fast forward months later, I now work for the company as the Social Media Manager. I love that I’m an artist helping artists share their work with the world.later, I now work for the company as the Social Media Manager",
    },
    {
      id: 8,
      avatar: "/assets/data/testimonial-avatar2.png",
      name: "Dylan Field",
      job: t("careers.loc.job1"),
      content:
        "Lendo was the first platform I sold my art on, because it was easy. Fast forward months later, I now work for the company as the Social Media Manager. I love that I’m an artist helping artists share their work with the world.later, I now work for the company as the Social Media Manager",
    },
  ];
  const VALUES_LIST = [
    {
      id: 1,
      icon: "/assets/images/tabler-3d-cube.svg",
      title: t("values.growth.title"),
      content: t("values.growth.text"),
    },
    {
      id: 2,
      icon: "/assets/images/tabler-tractor.svg",
      title: t("values.empathy.title"),
      content: t("values.empathy.text"),
    },
    {
      id: 3,
      icon: "/assets/images/tabler-plant.svg",
      title: t("values.openness.title"),
      content: t("values.openness.text"),
    },
    {
      id: 4,
      icon: "/assets/images/tabler-parachute.svg",
      title: t("values.collaboration.title"),
      content: t("values.collaboration.text"),
    },
  ];
  const renderValuesFarm = () => {
    return VALUES_LIST.map((item, index) => {
      const { content, icon, title } = item;
      return (
        <Col
          key={index}
          className="values-item text-center"
          xl={6}
          lg={8}
          md={12}
          sm={24}
        >
          <img src={icon} alt={title} />
          <div className="content-values">
            <h3 className="title pt10">{title}</h3>
          </div>
          <p>{content}</p>
        </Col>
      );
    });
  };
  return (
    <Style>
      <Mainlayout>
        <Seo
          title="Careers"
          desc="Lendochain is a creative playground for artists, curators and collectors to experience the new creative economy."
          isHome={false}
        />
        <div className="content-style">
          <div className="container">
            <div className="careers-desc pt60 pb60">
              <div className="pipe-shape-bottom">
                <svg
                  className="shape"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1445.979"
                  height="512.206"
                  viewBox="0 0 1445.979 512.206"
                >
                  <path
                    id="Path_21"
                    data-name="Path 21"
                    d="M-1415,598.157s189.443,126.646,410.783,108.894,406.124-169.174,406.124-169.174,227-196.378,500.2-39.818"
                    transform="translate(1404.339 -405.005) rotate(-7)"
                    fill="none"
                    stroke="#fafafa"
                    strokeLinecap="round"
                    strokeWidth="71"
                  ></path>
                </svg>
              </div>
              <Row
                className="pt20"
                justify="space-between"
                gutter={24}
                align="middle"
              >
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <h1 className="title-page pb20">
                    <span>{t("careers.title.sec1")}</span>
                    <span> {t("careers.title.sec2")}</span>
                    <span> {t("careers.title.sec3")}</span>
                  </h1>
                  <p className="pb40">{t("careers.p1")}</p>

                  <div className="button-wrapper">
                    <Button
                      className="button-style pt60"
                      shape="round"
                      size="large"
                      type="primary"
                    >
                      {t("careers.button.view")}
                    </Button>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xxl={12} xl={12}>
                  <img
                    src="/assets/images/careers-logo.svg"
                    className="img-max-width-100"
                  />
                </Col>
              </Row>
            </div>
            <div className="careers-location position-rel pt60 ">
              <h3 className="title-section-page text-center">
                {t("careers.title2")}
              </h3>
            </div>
          </div>
          <div className="careers-country-content text-center">
            <div className="container-content">
              <p>{t("careers.p2")}</p>
              <p className="pb60">{t("careers.p3")}</p>
            </div>
          </div>
          <div className="container">
            <div className="pt60">
              <img className="img-center" src="/assets/images/world-map.svg" />
            </div>
            <div className="careers-testimonial-slider pb60">
              <TestimonialSlider
                className="pb20"
                data={TESTIMONIAL_COLLECTIONS}
              />
            </div>
          </div>
          <div className="careers-values pb60 pt60">
            <div className="container">
              <h3 className="title-section-page text-center pt20">
                {t("values.title")}
              </h3>
              <p className="text-center pb60">{t("values.desc")}</p>
              <Row
                className="wrapper-values pt20 pb20"
                justify="center"
                gutter={20}
              >
                {renderValuesFarm()}
              </Row>
            </div>
          </div>
          <div className="careers-position pt60 pb60 text-center">
            <div className="container">
              <h3 className="title-section-page">{t("intrest.title")}</h3>
              <p className="text-center pb20">{t("intrest.desc")}</p>
              <Button type="primary" shape="round" size="large">
                {t("careers.button.open")}
              </Button>
            </div>
          </div>
        </div>
      </Mainlayout>
    </Style>
  );
}

export const getServerSideProps = async ({ res, req, params, locale }) => {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common", "careers"])),
    },
  };
};
