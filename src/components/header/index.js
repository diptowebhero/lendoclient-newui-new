import { CloseOutlined, FastForwardFilled } from "@ant-design/icons";
import MainMenu from "@src/components/mainMenu";
import { Col, Row } from "antd";
import Link from "next/link";
import { Fragment, useState } from "react";
import AutoCompleteSearch from "../autoCompleteSearch";
import Style from "./style";

export default function Header({
  homeSetVisibleDrawer,
  isHome = false,
  overflow = "hidden",
}) {
  const [isVisibleMobileSearch, setVisibleMobileSearch] = useState(false);

  function MobileSearchToggle() {
    setVisibleMobileSearch(!isVisibleMobileSearch);
  }

  function MobileSidebarToggle() {
    homeSetVisibleDrawer(true);
  }
  return (
    <Style overflow={overflow}>
      {!isHome && <Fragment></Fragment>}

      {/* <div className="container"> */}
      <div
        className="mobile-search"
        style={{ display: isVisibleMobileSearch ? "block" : "none" }}
      >
        <div className="mobile-search-wrapper">
          <div className="search">
            <AutoCompleteSearch isHome={isHome} />
          </div>
          <div className="close" onClick={MobileSearchToggle}>
            <CloseOutlined />
          </div>
        </div>
      </div>

      <Row
        style={{ display: isVisibleMobileSearch ? "none" : "flex" }}
        align="middle"
        gutter={24}
      >
        <div style={{ width: "1.5%" }} />
        <Col xs={17} sm={17} md={12} lg={5} xl={5}>
          <div style={{ display: "flex" }} className="logo-bar-right-true">
            {homeSetVisibleDrawer && (
              <FastForwardFilled
                onClick={() => MobileSidebarToggle()}
                className="arrow-bar-right-true"
              />
            )}
            <Link href="/" prefetch={false}>
              <a className="logo">
                <img src="/assets/images/img/logo.png" />
              </a>
            </Link>
          </div>
        </Col>

        <Col xs={0} sm={0} md={0} lg={7} xl={8}>
          <AutoCompleteSearch isHome={isHome} />
        </Col>
        <Col xs={6} sm={6} md={11} lg={10} xl={9}>
          <div className="right-float">
            <MainMenu MobileSearchToggle={MobileSearchToggle} />
          </div>
        </Col>
      </Row>

      {/* </div> */}
    </Style>
  );
}
