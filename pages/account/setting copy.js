import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Style from "@src/partials/account/setting/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import { Col, Form, Row, Button, Input } from "antd";
import SettingMenu from "@src/partials/account/setting/settingMenu";
import SelectImageFile from "@src/components/selectImageFile";
import message from "@src/helpers/message";
import Link from "next/link";
import {
  TbBrandDiscord,
  TbBrandTwitter,
  TbWorld,
  TbChartLine,
  TbBrandInstagram,
  TbCopy,
} from "react-icons/tb";
import { hooks, metaMask } from "@src/components/wallet/connectors/metamask";
import copyTextToClipboard from "@src/helpers/copyToClipboard";
import { ROUTE_ACCOUNT, ROUTE_ACCOUNT_SETTING } from "@src/routes";
import { API_URL_GET_USER } from "@src/components/wallet/walletModal/const";
import {
  getRequest,
  patchRequest,
  postRequest,
  redirectOnServer,
} from "@src/helpers/api";
import get from "lodash/get";
import LoadingContainer from "@src/containers/globalLoading";
import { EyeOutlined, CopyOutlined } from "@ant-design/icons";
import UserContainer from "@src/containers/userContainer";
import { saveCookie } from "@src/helpers/cookie";
import { KEY_USER, KEY_TOKEN } from "@src/config";

const { TextArea } = Input;
const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export default function Setting(props) {
  const { data } = props;
  const [t, i18n] = useTranslation("common");
  const globalLoading = LoadingContainer.useContainer();
  const userData = UserContainer.useContainer();
  const accounts = useAccounts();
  const [form] = Form.useForm();
  const onSubmit = async values => {
    try {
      globalLoading.set(true);
      const response = await patchRequest(API_URL_GET_USER, values);
      saveCookie(KEY_USER, JSON.stringify(response.data));
      userData.set(response.data);
      message("success", t("your profile has been updated!"));
      globalLoading.set(false);
    } catch (e) {
      globalLoading.set(false);
    }
  };

  return (
    <Style>
      <Seo title={t("Profile Setting")} />
      <Mainlayout>
        <div className="container">
          <SettingMenu />
          <Row gutter={30}>

            <Col
              xs={{ order: 1, span: 24 }}
              sm={{ order: 1, span: 24 }}
              md={{ order: 1, span: 24 }}
              lg={{ order: 1, span: 24 }}
              xl={{ order: 1, span: 24 }}
            >
              <div className="pt60 pb60">
                <div className="pb40">
                  <Row justify="space-between" align="middle" gutter={[48, 48]}>
                    <Col>
                      <h1 className="title">{t("Profile details")}</h1>
                    </Col>
                    <Col>
                      <Link href={ROUTE_ACCOUNT}>
                        <a>
                          <Button
                            icon={<EyeOutlined />}
                            className="white"
                            size="large"
                          >
                            {t("Preview")}
                          </Button>
                        </a>
                      </Link>
                    </Col>
                  </Row>
                </div>
                <Form
                  onFinish={onSubmit}
                  form={form}
                  layout="vertical"
                  className="form "
                  initialValues={data}
                >
                  <Form.Item name="heroAvatar">
                    <SelectImageFile
                      className="banner-image"
                      label="banner image"
                      tooltipText="RecommandTipsOnBannerImage"
                      type="image"
                    />
                  </Form.Item>

                  <Row gutter={30}>
                    <Col
                      xs={{ order: 1, span: 24 }}
                      sm={{ order: 1, span: 24 }}
                      md={{ order: 1, span: 24 }}
                      lg={{ order: 1, span: 12 }}
                      xl={{ order: 1, span: 12 }}
                    >
                      <div className="profile-setup">
                        <Form.Item name="avatar">
                          <SelectImageFile
                            className="avatar-image"
                            type="image"
                            previewPosition="0"
                          />
                        </Form.Item>
                        <p>{accounts && accounts[0]}</p>
                      </div>
                    </Col>

                    <Col
                      xs={{ order: 1, span: 24 }}
                      sm={{ order: 1, span: 24 }}
                      md={{ order: 1, span: 24 }}
                      lg={{ order: 1, span: 12 }}
                      xl={{ order: 1, span: 12 }}
                    >
                      <div>
                        <Form.Item
                          name="username"
                          label={t("username")}
                          rules={[
                            {
                              pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                              message: t(
                                "Entered value must only contain lowercase letters, numbers, and hyphens"
                              ),
                            },
                          ]}
                        >
                          <Input size="large" />
                        </Form.Item>
                        <Form.Item name="bio" label={t("bio")}>
                          <TextArea size="large" />
                        </Form.Item>
                      </div>
                    </Col>

                  </Row>

                  <Row gutter={30}>
                    <Col
                      xs={{ order: 1, span: 24 }}
                      sm={{ order: 1, span: 24 }}
                      md={{ order: 1, span: 24 }}
                      lg={{ order: 1, span: 12 }}
                      xl={{ order: 1, span: 12 }}
                    >
                      <Form.Item
                        name="email"
                        label={t("email address")}
                        rules={[
                          {
                            type: "email",
                            message: t("The input is not valid E-mail!"),
                          },
                        ]}
                      >
                        <Input size="large" />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ order: 1, span: 24 }}
                      sm={{ order: 1, span: 24 }}
                      md={{ order: 1, span: 24 }}
                      lg={{ order: 1, span: 12 }}
                      xl={{ order: 1, span: 12 }}
                    >
                      <Form.Item label={t("Wallet Address")}>
                        <Input
                          disabled
                          size="large"
                          placeholder={accounts && accounts[0]}
                          addonAfter={
                            <CopyOutlined
                              onClick={() =>
                                copyTextToClipboard(accounts && accounts[0])
                              }
                              width={"16px"}
                              height={"16px"}
                            />
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col
                      xs={{ order: 1, span: 24 }}
                      sm={{ order: 1, span: 24 }}
                      md={{ order: 1, span: 24 }}
                      lg={{ order: 1, span: 12 }}
                      xl={{ order: 1, span: 12 }}
                    >
                      <Form.Item name="instagram" className="half-mb-space">
                        <Input
                          size="large"
                          prefix={<TbBrandInstagram />}
                          placeholder={t("Your instagram handle")}
                        />
                      </Form.Item>
                      <Form.Item name="twitter" className="half-mb-space">
                        <Input
                          size="large"
                          prefix={<TbBrandTwitter />}
                          placeholder={t("Your twitter")}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ order: 1, span: 24 }}
                      sm={{ order: 1, span: 24 }}
                      md={{ order: 1, span: 24 }}
                      lg={{ order: 1, span: 12 }}
                      xl={{ order: 1, span: 12 }}
                    >
                      <Form.Item name="webSite" className="half-mb-space">
                        <Input
                          size="large"
                          prefix={<TbWorld />}
                          placeholder={t("Your site address")}
                        />
                      </Form.Item>
                      <Form.Item name="discord">
                        <Input
                          size="large"
                          prefix={<TbBrandDiscord />}
                          placeholder={t("Your discord")}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item className="button-section">
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      loading={globalLoading.status}
                    >
                      {t("save")}
                    </Button>
                  </Form.Item>
                </Form>
              </div>

            </Col>
          </Row>
        </div>
      </Mainlayout>
    </Style>
  );
}

export const getServerSideProps = async ctx => {
  const { res, req, params, locale, query } = ctx;
  let userApiResponse = {};
  try {
    userApiResponse = await getRequest(API_URL_GET_USER, {}, ctx);
  } catch (e) {
    return redirectOnServer(e);
  }
  return {
    props: {
      data: get(userApiResponse, "data", {}),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
