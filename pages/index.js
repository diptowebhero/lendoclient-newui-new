import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Row, Col, Dropdown, Menu, Drawer } from "antd";
import { DownOutlined, FastForwardFilled, CheckCircleFilled } from '@ant-design/icons';
import Style from "@partials/home/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import Link from "next/link";
import StatisticList from "@src/components/lists/statisticList";
import Icon, { RightOutlined } from "@ant-design/icons";
import TopCollections from "@src/components/topCollections";
import HeaderWithLink from "@src/components/headerWithLink";
import CollectionFullSlider from "@src/components/collecltionFullSlider";
import TextBoxList from "@src/components/lists/textBoxList";
import VideoBox from "@src/components/videoBox";
import BlogList from "@src/components/lists/blogList";
import NftList from "@src/components/lists/nftList";
import AuctionHeroSlider from "@src/components/auctionHeroSlider";
import Seo from "@src/components/seo";
import get from "lodash/get";
import {
  ROUTE_ABOUT,
  ROUTE_ALL_ASSETS,
  ROUTE_BLOG,
  ROUTE_CREATE_NFT,
  ROUTE_EXPLORE,
  ROUTE_LOGIN,
  ROUTE_RANKINGS,
} from "@src/routes";
import { useEffect, useState } from "react";
import { getRequest } from "@src/helpers/api";
import {
  API_URL_MAIN_PAGE,
  API_URL_STATISTICS,
} from "@src/partials/home/const";
import { useRouter } from "next/router";
import { removeCredentials } from "@src/helpers/authUtils";
import { metaMask } from "@src/components/wallet/connectors/metamask";
import { ROUTE_HOME } from "@src/routes";
import Sidebar from "@src/sidebar";
import HomeLayout from "@src/components/layouts/homeLayout";



export default function Home(props) {
  const [visibleDrawer, setVisibleDrawer] = useState(false);


  const { statisticsData, mainPageData } = props;
  const router = useRouter();
  const { query } = router;
  const {
    carousel = [],
    trendingAuctions = [],
    topCollections = [],
    trendingCollections = [],
    blog = [],
  } = mainPageData;
  const [t, i18n] = useTranslation("common");
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;
      wb.addEventListener("installed", event => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });
      wb.addEventListener("controlling", event => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });
      wb.addEventListener("activated", event => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });
      const promptNewVersionAvailable = event => {
        // if (
        //   confirm(
        //     "A newer version of this web app is available, reload to update?"
        //   )
        // ) {
        //   wb.addEventListener("controlling", event => {
        //     window.location.reload();
        //   });
        //   wb.messageSW({ type: "SKIP_WAITING" });
        // } else {
        //   console.log(
        //     "User rejected to reload the web app, keep using old verion. New verion will be automatically load when user open the app next time."
        //   );
        // }
      };
      wb.addEventListener("waiting", promptNewVersionAvailable);
      wb.addEventListener("externalwaiting", promptNewVersionAvailable);
      wb.register();
    }
  }, []);

  useEffect(() => {
    if (query?.loggedout) {
      const logout = async () => {
        removeCredentials();
        window.location.replace(ROUTE_HOME);
      };
      setTimeout(() => {
        logout();
      }, 1000);
    }
  }, [query?.loggedout]);
  const OUR_FLOW = [
    {
      subject: "Set up your \nwallet",
      icon: "assets/icons/createprofileicon.svg",
      description:
        "Once you’ve set up your wallet of choice, connect it to LendoChain by clicking the wallet icon in the top right corner. Learn about the wallets we support.",
      slug: "sample-test",
      clssName: 'first-steps'
    },
    {
      subject: "Create your \ncollection",
      icon: "assets/icons/uploadarticon.svg",
      description:
        "Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.",
      slug: "sample-test",
    },
    {
      subject: "Add your NFTs ",
      icon: "assets/icons/tellstoryicon.svg",
      description:
        "Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.",
      slug: "sample-test",
    },
    {
      subject: "List them \nfor sale",
      icon: "assets/icons/listforsaleicon.svg",
      description:
        "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!",
      slug: "sample-test",
    },
  ];

  const onCloseFilterDrawer = () => {
    setVisibleDrawer(false);
  };


  return (
    <Style>
      <Seo
        title="Lendochain NFT Marketpalce"
        desc="Lendochain is a creative playground for artists, curators and collectors to experience the new creative economy."
        isHome={true}
      />
      <div className="container">
      </div>
      <HomeLayout setVisibleDrawer={setVisibleDrawer} isHome >
        <Row className="main-banner-img" >
          <div style={{ width: '1.5%' }} />
          <Col xs={24} sm={24} md={24} lg={4} xl={4}>
            <div className="main-sidebar-section">
              <Sidebar />
              <Drawer
                title=""
                className="filter-drawer"
                onClose={onCloseFilterDrawer}
                open={visibleDrawer}
                placement="left"
              >
                <Sidebar />
              </Drawer>
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={19} xl={19}>
            <div style={{ padding: "5px" }} className="hero-section main_body">
              <div className="hero-section--shapess" />
              <AuctionHeroSlider data={carousel} />
            </div>


            <div className="top-collections padding-section">
              <div className="container">
                <HeaderWithLink
                  title="Top collections"
                  title2="24 hours"
                  link={{ pathname: ROUTE_RANKINGS, query: { sortBy: "TOP" } }}
                  textLink="View all top collections"
                  dropdown={true}
                />
                <TopCollections data={topCollections} />
              </div>
            </div>

            <div className="trending-auctions padding-section">
              <div className="container">
                <HeaderWithLink
                  title="Trending "
                  icon={<><DownOutlined /></>}
                  link={{
                    pathname: ROUTE_ALL_ASSETS,
                    query: { status: "BID", sortBy: "ENDING_SOON" },
                  }}
                  btnText="View all "
                ></HeaderWithLink>
                <NftList data={trendingAuctions} size="medium" />
              </div>
            </div>

            <div className="trending-collections padding-section">
              <CollectionFullSlider data={trendingCollections} />
            </div>

            <div className="our-flow padding-section">
              <div className="container">
                <HeaderWithLink
                  title="Create and"
                  title2="Sell your NFTs"
                  link={{
                    pathname: ROUTE_ALL_ASSETS,
                    query: { status: "BID", sortBy: "ENDING_SOON" },
                  }}
                  btnText="Create "
                ></HeaderWithLink>
                <TextBoxList data={OUR_FLOW} />
              </div>
            </div>

          </Col>
        </Row>
      </HomeLayout>
    </Style>
  );
}

export const getServerSideProps = async ({ res, req, params, locale }) => {
  let statisticsApiResponse = [];
  let mainPageApiResponse = [];
  try {
    [statisticsApiResponse, mainPageApiResponse] = await Promise.all([
      (statisticsApiResponse = await getRequest(API_URL_STATISTICS)),
      (mainPageApiResponse = await getRequest(API_URL_MAIN_PAGE)),
    ]);
  } catch (e) { }
  return {
    props: {
      locale,
      statisticsData: get(statisticsApiResponse, "data.data", {
        artwork: "0",
        auctions: "0",
        artist: "0",
      }),
      mainPageData: get(mainPageApiResponse, "data.data", []),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
