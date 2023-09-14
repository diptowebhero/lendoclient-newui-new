import { postRequest } from "@src/helpers/api";
import message from "@src/helpers/message";
import { getYear } from "@src/helpers/time";
import { API_URL_NEWSLETTER } from "@src/partials/home/const";
import {
  ROUTE_ABOUT,
  ROUTE_ACCOUNT,
  ROUTE_ACCOUNT_SETTING,
  ROUTE_ALL_ASSETS,
  ROUTE_BLOG,
  ROUTE_CAREERS,
  ROUTE_CREATE_NFT,
  ROUTE_MY_COLLECTIONS,
  ROUTE_PRIVACY,
  ROUTE_SINGLE_CATEGORY,
  ROUTE_TERMS,
} from "@src/routes";
import { Button, Col, Form, Input, Row } from "antd";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";
import Style from "./style";
import BinanceSC from "./svg/binanceSC.svg";
import Metamask from "./svg/metamask.svg";
import Tatum from "./svg/tatum.svg";
import Twittericon from "./svg/twittericon.svg";

export default function Footer(props) {
  const [t, i18n] = useTranslation("common");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data } = props;
  async function onFinishNewsletter(values) {
    try {
      setLoading(true);
      const response = await postRequest(API_URL_NEWSLETTER, values);
      form.resetFields();
      message("success", response.data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }
  return (
    <Style>
      <div className="home-footer-section">
        <div style={{ background: "#404242" }} className="footer">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={4} xl={4} />
            <Col xs={24} sm={24} md={24} lg={19} xl={19}>
              <div className="logos" style={{ marginBottom: "-3%" }}>
                <br />
                <div className="container">
                  <ul>
                    <li>
                      {" "}
                      <BinanceSC />{" "}
                    </li>
                    <li> &nbsp;</li>
                    <li>
                      {" "}
                      <Tatum />
                    </li>
                    <li> &nbsp; </li>
                    <li>
                      {" "}
                      <Metamask />{" "}
                    </li>
                  </ul>
                </div>
                <br />
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ background: "#2A2C2D" }} className="footer">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={4} xl={4}></Col>
            <Col xs={24} sm={24} md={24} lg={19} xl={19}>
              <div className="footer-wrapper">
                <div className="container">
                  <div className="top">
                    <Row>
                      <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                        <div className="newsletter">
                          <h4 className="title">{t("Stay in the loop")}</h4>
                          <p className="desc">
                            {t(
                              "Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating LendoChain."
                            )}
                          </p>
                          <br />
                          <Form
                            form={form}
                            name="horizontal_login"
                            layout="inline"
                            onFinish={onFinishNewsletter}
                          >
                            <Form.Item
                              className="input-section "
                              name="email"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your username!",
                                },
                                { type: "email" },
                              ]}
                            >
                              <Input
                                size="large"
                                style={{ borderRadius: "40px" }}
                                placeholder={t("please enter your email")}
                              />
                            </Form.Item>
                            <Form.Item
                              style={{ marginLeft: "-10%" }}
                              className="button-section"
                            >
                              <Button
                                loading={loading}
                                className="white email-send-btn"
                                size="large"
                                htmlType="submit"
                                style={{
                                  background: "#E46400",
                                  color: "white",
                                  marginTop: " -1%",
                                  marginLeft: "-13%",
                                }}
                              >
                                {t("Send")}
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={7} xl={7} />
                      <Col xs={24} sm={24} md={5} lg={6} xl={6}>
                        <br />
                        <br />
                        <br />
                        <div
                          className="social"
                          style={{ display: "flex", marginTop: "20%" }}
                        >
                          <div>
                            <h3 className="title">
                              <b>{t("Join the community")}</b>
                            </h3>
                          </div>
                          <div style={{ margin: "-15% 0 0 8%" }}>
                            <ul>
                              <li>
                                <a href="#" target="_blank" rel="noreferrer">
                                  <Twittericon />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="bottom">
                    <Row gutter={24}>
                      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <div className="company-description">
                          <img src="/assets/images/logo-white.svg" />
                          <p>
                            {t(
                              "The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items."
                            )}
                          </p>
                          <p>{t("Let’s build #BNBChainNFTs. ")}</p>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                        <div className="footer-menu">
                          <h6>{t("Marketplace")}</h6>
                          <ul>
                            <li>
                              <Link href={ROUTE_ALL_ASSETS} prefetch={false}>
                                <a>{t("All NFTs")}</a>
                              </Link>
                            </li>
                            <li>
                              <Link
                                prefetch={false}
                                href={ROUTE_SINGLE_CATEGORY.replace(
                                  ":categoryId",
                                  "art"
                                )}
                              >
                                <a>{t("Art")}</a>
                              </Link>
                            </li>
                            <li>
                              <Link
                                prefetch={false}
                                href={ROUTE_SINGLE_CATEGORY.replace(
                                  ":categoryId",
                                  "collectibles"
                                )}
                              >
                                <a>{t("Collectibles")}</a>
                              </Link>
                            </li>
                            <li>
                              <Link
                                prefetch={false}
                                href={ROUTE_SINGLE_CATEGORY.replace(
                                  ":categoryId",
                                  "music"
                                )}
                              >
                                <a>{t("music")}</a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                        <div
                          className="footer-menu"
                          style={{ marginTop: "45px;" }}
                        >
                          <ul>
                            <li>
                              <Link
                                prefetch={false}
                                href={ROUTE_SINGLE_CATEGORY.replace(
                                  ":categoryId",
                                  "carbon-credit"
                                )}
                              >
                                <a>{t("Carbon Credit")}</a>
                              </Link>
                              <Link
                                prefetch={false}
                                href={ROUTE_SINGLE_CATEGORY.replace(
                                  ":categoryId",
                                  "photography"
                                )}
                              >
                                <a>{t("Photography")}</a>
                              </Link>
                            </li>
                            <li>
                              <Link
                                prefetch={false}
                                href={ROUTE_SINGLE_CATEGORY.replace(
                                  ":categoryId",
                                  "sports"
                                )}
                              >
                                <a>{t("Sports")}</a>
                              </Link>
                            </li>
                            <li>
                              <Link
                                prefetch={false}
                                href={ROUTE_SINGLE_CATEGORY.replace(
                                  ":categoryId",
                                  "trading-card"
                                )}
                              >
                                <a>{t("Trading Cards")}</a>
                              </Link>
                            </li>
                            <li>
                              <Link
                                prefetch={false}
                                href={ROUTE_SINGLE_CATEGORY.replace(
                                  ":categoryId",
                                  "utility"
                                )}
                              >
                                <a>{t("Utility")}</a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                        <div className="footer-menu">
                          <h6> {t("My Account")}</h6>
                          <ul>
                            <li>
                              <Link href={ROUTE_ACCOUNT} prefetch={false}>
                                <a>{t("profile")}</a>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={ROUTE_MY_COLLECTIONS}
                                prefetch={false}
                              >
                                <a>{t("my collections")}</a>
                              </Link>
                            </li>
                            <li>
                              <Link href={ROUTE_CREATE_NFT} prefetch={false}>
                                <a>{t("create")}</a>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={ROUTE_ACCOUNT_SETTING}
                                prefetch={false}
                              >
                                <a>{t("setting")}</a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                        <div className="footer-menu">
                          <h6> {t("Company")}</h6>
                          <ul>
                            <li>
                              <Link href={ROUTE_ABOUT} prefetch={false}>
                                <a>{t("about")}</a>
                              </Link>
                            </li>
                            <li>
                              <Link href={ROUTE_CAREERS} prefetch={false}>
                                <a>{t("carees")}</a>
                              </Link>
                            </li>
                            <li>
                              <Link href={ROUTE_BLOG} prefetch={false}>
                                <a>{t("blog")}</a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{ background: "#E46400" }}
          className="bottom-line footer-wrapper"
        >
          <div style={{ background: "#E46400", marginBottom: "-5%" }}>
            <div className="copyright">
              <br />
              <div className="container">
                <Row justify="space-between" align="center">
                  <Col xs={24} sm={24} md={3} lg={3} xl={3} />
                  <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <div className="copyright-text">
                      {t("copyRight", { year: getYear() })}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <div className="copytight-links">
                      <ul>
                        <li>
                          <Link href={ROUTE_PRIVACY} prefetch={false}>
                            <a>{t("Privacy Policy")}</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={ROUTE_TERMS} prefetch={false}>
                            <a>{t("Terms of Service")}</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </Style>
  );
}
