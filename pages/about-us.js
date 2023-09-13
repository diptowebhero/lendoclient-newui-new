import { Button } from "antd";
import { useTranslation } from "next-i18next";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import Style from "@src/partials/about-us/style";
import { Col, Row } from "antd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import VideoBox from "@src/components/videoBox";
import LazyLoadImage from "@src/components/lazyLoadImage";

export default function AboutUs() {
  const [t, i18n] = useTranslation("about-us");
  const infoAchievment = [
    {
      url: "/assets/icons/tabler-route.svg",
      number: t("year"),
      name: t("founded"),
    },
    {
      url: "/assets/icons/tabler-users.svg",
      number: t("number.employees"),
      name: t("employees"),
    },
    {
      url: "/assets/icons/tabler-mood-crazy-happy.svg",
      number: t("number.users"),
      name: t("users"),
    },
    {
      url: "/assets/icons/tabler-apps.svg",
      number: t("number.collections"),
      name: t("collections"),
    },
    {
      url: "/assets/icons/tabler-id.svg",
      number: t("number.nfts"),
      name: t("nfts"),
    },
    {
      url: "/assets/icons/tabler-coin.svg",
      number: t("number.volume"),
      name: t("volume"),
    },
  ];
  const industryAbout = [
    {
      id: 1,
      url: "/assets/icons/partners/andressen-horowitz.svg",
    },
    {
      id: 2,
      url: "/assets/icons/partners/coinbase.svg",
    },
    {
      id: 3,
      url: "/assets/icons/partners/ycombinator.svg",
    },
    {
      id: 4,
      url: "/assets/icons/partners/trust-wallet.svg",
    },
    {
      id: 5,
      url: "/assets/icons/partners/dapper.svg",
    },
    {
      id: 6,
      url: "/assets/icons/partners/quantstamp.svg",
    },
    {
      id: 7,
      url: "/assets/icons/partners/quantstamp.svg",
    },
    {
      id: 8,
      url: "/assets/icons/partners/ycombinator.svg",
    },
    {
      id: 9,
      url: "/assets/icons/partners/andressen-horowitz.svg",
    },
    {
      id: 10,
      url: "/assets/icons/partners/dapper.svg",
    },
    {
      id: 11,
      url: "/assets/icons/partners/coinbase.svg",
    },
    {
      id: 12,
      url: "/assets/icons/partners/trust-wallet.svg",
    },
  ];
  const memberAbout = [
    {
      id: 1,
      url: "/assets/data/avatar1.png",
      position: t("memeber.position1"),
      name: t("member.name1"),
    },
    {
      id: 2,
      url: "/assets/data/avatar2.png",
      position: t("memeber.position2"),
      name: t("member.name2"),
    },
    {
      id: 3,
      url: "/assets/data/testimonial-avatar3.png",
      position: t("memeber.position3"),
      name: t("member.name3"),
    },
    {
      id: 4,
      url: "/assets/data/testimonial-avatar4.png",
      position: t("memeber.position4"),
      name: t("member.name4"),
    },
    {
      id: 5,
      url: "/assets/data/avatar1.png",
      position: t("memeber.position5"),
      name: t("member.name5"),
    },
    {
      id: 6,
      url: "/assets/data/avatar2.png",
      position: t("memeber.position6"),
      name: t("member.name6"),
    },
    {
      id: 7,
      url: "/assets/data/testimonial-avatar3.png",
      position: t("memeber.position7"),
      name: t("member.name7"),
    },
    {
      id: 8,
      url: "/assets/data/testimonial-avatar4.png",
      position: t("memeber.position8"),
      name: t("member.name8"),
    },
  ];
  const renderMemberAboutFarm = () => {
    return memberAbout.map(({ id, url, position, name }, index) => {
      return (
        <div
          className="member-about-us-content flex-acenter-jcenter position-rel"
          key={index}
        >
          <img
            className="position-abs member-background-img"
            src="/assets/data/back-member-image.svg"
          />
          <LazyLoadImage width={142} height={190} src={url} alt="lendochain" />
          <h4 className="pt20">{name}</h4>
          <p className="text-center">{position}</p>
        </div>
      );
    });
  };
  const renderInfoAchFarm = () => {
    return infoAchievment.map(({ url, number, name }, index) => {
      return (
        <div className="about-us-icon-inner-content" key={index}>
          <Row className="text-center pb20" align="middle">
            <Col span={24}>
              <LazyLoadImage
                width={58.21}
                height={58.21}
                src={url}
                alt="lendochain"
              />
            </Col>
            <Col className="pt20" span={24}>
              <h4>{number}</h4>
            </Col>
            <Col className="icon-name" span={24}>
              {name}
            </Col>
          </Row>
        </div>
      );
    });
  };
  const renderIndustryAboutFarm = () => {
    return industryAbout.map(({ id, url }, index) => {
      return (
        <div className="position-rel pb40" key={index}>
          <img src={url} alt="lendochain" />
        </div>
      );
    });
  };
  const renderImageCompanyFarm = () => {
    return (
      <div className="about-us-story-wrapper-img">
        <img className="main-img" src="/assets/data/about-us-image.png" />
        <img
          className="position-abs elipse-attached-img"
          src="/assets/data/dashed-circle.svg"
        />
        <img
          className="position-abs path-attached-img"
          src="/assets/data/broken-line.svg"
        />
        <img
          className="position-abs poligon-attached-img"
          src="/assets/data/triangle.svg"
        />
      </div>
    );
  };

  return (
    <Style>
      <Mainlayout>
        <Seo
          title="About Us"
          desc="Lendochain is a creative playground for artists, curators and collectors to experience the new creative economy."
          isHome={false}
        />

        <div className="content-style">
          <div className="container pt60 pb60">
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
            <div className="about-us-desc pt20 pb20">
              <Row gutter={24} justify="space-between" align="middle">
                <Col xs={24} sm={24} md={24} lg={12}>
                  <h1 className="title-page">
                    <span>{t("AboutUs.title-sec1")}</span>
                    <span>{t("AboutUs.title-sec2")}</span>
                  </h1>

                  <p>
                    <span>{t("AboutUs.p1.1th")}</span>
                    <span>{t("AboutUs.p1.2nd")}</span>
                    <span>{t("AboutUs.p1.3rd")}</span>
                  </p>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <img
                    className="img-max-width-100"
                    src="/assets/images/about-us-hero.svg"
                    alt="lendochain"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <p className="pt20">{t("AboutUs.p2")}</p>
                </Col>
                <Col span={24}>
                  <p>{t("AboutUs.p3")}</p>
                </Col>
              </Row>
            </div>
            <div className="about-us-icon pt60">
              <div className="about-us-icon-inner">{renderInfoAchFarm()}</div>
            </div>
          </div>
          <div className="about-us-video pt60 pb60">
            <VideoBox title={t("title.video")} subtitle={t("subtitle.video")} />
          </div>
          <div className="container pt60 pb60 position-rel">
            <div className="about-us-story position-rel pt20 pb60">
              <div className="elipse-shape">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="872.05"
                  height="614.011"
                  viewBox="0 0 872.05 614.011"
                  className="shape"
                >
                  <g
                    id="Group_859"
                    data-name="Group 859"
                    transform="translate(298.024 -2025.034)"
                  >
                    <g
                      id="Ellipse_79"
                      data-name="Ellipse 79"
                      transform="translate(388.871 2528.002) rotate(-179)"
                      fill="none"
                      stroke="#e3e3e3"
                      strokeWidth="24"
                    >
                      <ellipse
                        cx="234.806"
                        cy="144.012"
                        rx="234.806"
                        ry="144.012"
                        stroke="none"
                      ></ellipse>
                      <ellipse
                        cx="234.806"
                        cy="144.012"
                        rx="233.806"
                        ry="143.012"
                        fill="none"
                      ></ellipse>
                    </g>
                    <g
                      id="Ellipse_80"
                      data-name="Ellipse 80"
                      transform="matrix(-0.974, -0.225, 0.225, -0.974, 473.386, 2639.045)"
                      fill="none"
                      stroke="#e3e3e3"
                      strokeWidth="24"
                    >
                      <ellipse
                        cx="395.851"
                        cy="223.692"
                        rx="395.851"
                        ry="223.692"
                        stroke="none"
                      ></ellipse>
                      <ellipse
                        cx="395.851"
                        cy="223.692"
                        rx="394.851"
                        ry="222.692"
                        fill="none"
                      ></ellipse>
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="title-section-page text-center">
                {t("title.story")}
              </h3>
              <p className="text-center pb20">{t("subtitle.story")}</p>
              <Row justify="center" align="middle" gutter={24}>
                <Col className="text-center pb40" md={24} lg={8} xl={8}>
                  {renderImageCompanyFarm()}
                </Col>
                <Col md={24} lg={16} xl={16}>
                  <p>{t("story.p1")}</p>
                  <p>{t("story.p2")}</p>
                  <p>{t("story.p3")}</p>
                  <p>{t("story.p4")}</p>
                  <p>{t("story.p5")}</p>
                </Col>
              </Row>
            </div>
            <div className="about-us-industry pt20 position-rel">
              <div className="pipe-shape zi-1">
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
              <h3 className="title-section-page text-center">
                {t("title.industry.about")}
              </h3>
              <p className="text-center">{t("subtitle.industry.about")}</p>
              <div className="wrapper-industry-img text-center pt20">
                {renderIndustryAboutFarm()}
              </div>
            </div>
            <div className="about-us-member pt60 pb60 position-rel">
              <h3 className="title-section-page text-center">
                {t("title.member.about")}
              </h3>
              <p className="text-center pb20">{t("subtitle.member.about")}</p>
              <div className="wrapper-member-about text-center">
                {renderMemberAboutFarm()}
              </div>
            </div>
          </div>
          <div className="about-us-position pt60 pb60 text-center">
            <div className="container">
              <h3 className="title-section-page">{t("title.join.about")}</h3>
              <p className="text-center pb20">{t("subtitle.join.about")}</p>
              <Button type="primary" shape="round" size="large">
                {t("text.button.join.about")}
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
      ...(await serverSideTranslations(locale, ["common", "about-us"])),
    },
  };
};
