import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Style from "@src/partials/account/setting/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import { Col, Row, Input, Button, Tag } from "antd";
import SettingMenu from "@src/partials/account/setting/settingMenu";
import Table from "@src/components/table";
import time from "@src/helpers/time";
import { Fragment, useEffect, useState } from "react";
import { getRequest } from "@src/helpers/api";
import { API_URL_NOTOFIATIONS } from "@src/partials/account/notifications/const";
import { theme } from "@src/styles";

const { TextArea } = Input;

export default function Notifications() {
  const [t, i18n] = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    data: [],
    metadata: { offset: 1, total: 0 },
  });
  const columns = [
    {
      title: t("source"),
      dataIndex: "source",
      key: "source",
      render: source => <Tag color={theme.colors.primary}>{source}</Tag>,
    },
    {
      title: t("title"),
      dataIndex: "title",
      key: "title",
      render: title => title,
    },
    {
      title: t("content"),
      dataIndex: "content",
      key: "content",
      render: (content, { updated_at }) => {
        return (
          <Fragment>
            <p>{content}</p>
            <span>{time(updated_at)}</span>
          </Fragment>
        );
      },
    },
    {
      title: "BlockChain",
      dataIndex: "link",
      align: "link",
      render: (link) => (
        link.indexOf('poly') > -1 ? "POLYGON" : "BSC"
      ),
    },
    {
      title: t("link"),
      dataIndex: "link",
      key: "link",
      render: link => {
        if (link == null) {
          return "--";
        } else {
          return (
            <a href={link} rel="noreferrer" target="_blank">
              <Button>{t("link")}</Button>
            </a>
          );
        }
      },
    },
  ];
  async function getNotificationApi(page = 1) {
    try {
      setLoading(true);
      const response = await getRequest(API_URL_NOTOFIATIONS, { offset: page });
      setData(response.data);
      setLoading(false);
    } catch (e) { }
    setLoading(false);
  }
  async function onChangePagination(page) {
    getNotificationApi(page);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  useEffect(() => {
    getNotificationApi();
  }, []);
  return (
    <Style>
      <Seo title={t("notifications")} />
      <Mainlayout>
        <div className="container">
          <Row gutter={30}>
            <Col xs={2} sm={4} md={6} lg={6} xl={6}>
              <SettingMenu />
            </Col>
          </Row>
          <Row gutter={30}>

            <Col xs={20} sm={16} md={18} lg={24} xl={24}>
              <div className="pt60 ">
                <h1 style={{ color: 'white' }}>{t("Notifications")}</h1>
                <div className="pb40">
                  <div className="list pt40 pb40">
                    <Table
                      columns={columns}
                      rowKey={"id"}
                      dataSource={data.data}
                      loading={loading}
                      pagination={{
                        onChange: onChangePagination,
                        total: data.metadata.total,
                        current: data.metadata.offset,
                        defaultPageSize: 12,
                        hideOnSinglePage: true,
                        showSizeChanger: false,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Mainlayout>
    </Style>
  );
}

export const getServerSideProps = async ({ res, req, params, locale }) => {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
