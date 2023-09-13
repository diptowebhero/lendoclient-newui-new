import Link from "next/link";
import Style from "./style";
import { Row, Col, Form, Input, Button } from "antd";
import { useTranslation } from "next-i18next";
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
import { getYear } from "@src/helpers/time";
import { postRequest } from "@src/helpers/api";
import { API_URL_NEWSLETTER } from "@src/partials/home/const";
import { useState } from "react";
import message from "@src/helpers/message";
import BinanceSC from './svg/binanceSC.svg'
import Tatum from './svg/tatum.svg'
import Metamask from './svg/metamask.svg'
import Twittericon from './svg/twittericon.svg'


export default function Footer2(props) {
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
        <div className="footer">
          <div className="container">
            <Row gutter={[16, 16]} >
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className="footer-wrapper">
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
                          <div className="footer-menu">
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
                                <Link href={ROUTE_MY_COLLECTIONS} prefetch={false}>
                                  <a>{t("my collections")}</a>
                                </Link>
                              </li>
                              <li>
                                <Link href={ROUTE_CREATE_NFT} prefetch={false}>
                                  <a>{t("create")}</a>
                                </Link>
                              </li>
                              <li>
                                <Link href={ROUTE_ACCOUNT_SETTING} prefetch={false}>
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
              </Col>
            </Row>
          </div>
        </div>
        <hr className="footer-hr" />
        <div style={{ background: "#1A1C1E", }} className="bottom-line footer-wrapper">
          <div style={{ background: "#1A1C1E", marginBottom: '-5%', }}>
            <div className="copyright">
              <br />
              <div className="container">
                <Row justify="space-between" align="center">
                  {/* <Col xs={24} sm={24} md={3} lg={1} xl={1} /> */}
                  <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <div className="copyright-text">
                      {t("copyRight", { year: getYear() })}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <div className="social copytight-links">
                      <ul>
                        <li>
                          <a>
                            <h3 className="title"><b>{t("Join the community")}</b>
                            </h3>
                          </a>
                        </li>
                        <li>
                          <a className="icon-title" href="#" target="_blank" rel="noreferrer">
                            <Twittericon />
                          </a>
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


