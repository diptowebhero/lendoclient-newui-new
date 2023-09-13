import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Form, Button, Select, InputNumber, Row, Col, Radio } from "antd";
import Style from "@partials/asset/slug/sell/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import { Fragment, useState } from "react";
import { hooks } from "@src/components/wallet/connectors/metamask";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getRequest, postRequest, redirectOnServer } from "@src/helpers/api";
import message from "@src/helpers/message";
import { useRouter } from "next/router";
import { ROUTE_SINGLE_ASSET } from "@src/routes";
import { get } from "lodash";
import detectEthereumProvider from "@metamask/detect-provider";
import LazyLoadImage from "@src/components/lazyLoadImage";
import textDots from "@src/helpers/textDots";
import Link from "next/link";
import { TbCurrencyDollar, TbAlarm } from "react-icons/tb";
import {
  API_GET_SELL_DETAIL,
  API_POST_STEP_1_LISTING,
  API_POST_STEP_2_LISTING,
  API_POST_STEP_3_LISTING,
} from "@src/partials/asset/slug/sell/const";
import { getUser } from "@src/helpers/authUtils";

const { Option } = Select;
const { useAccounts } = hooks;
export default function AssetSellForm({ data, slug }) {
  const [t, i18n] = useTranslation("common");
  const router = useRouter();
  const [form] = Form.useForm();
  const type = Form.useWatch("type", form);
  Form.useWatch("quantity", form);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const accounts = useAccounts();
  const serviceFee = get(data, "serviceFee", []);
  const fileUrl = get(data, "item.fileUrl", "");
  const previewUrl = get(data, "item.previewUrl", "");
  const name = get(data, "item.name", "");
  const collectionName = get(data, "item.collection.name", "");
  const protocol = get(data, "item.protocol", "ERC-721");
  const quantity = get(data, "item.quantity", 1);
  const totalQuantity = get(data, "totalQuantity", 1);
  const remainedQuantity = get(data, "remainedQuantity", 0);
  const itemId = get(data, "item.id", "");
  const SYSTEM_BID_FEE = serviceFee.filter(el => el.type === "SYSTEM_BID_FEE");
  const SYSTEM_FIX_FEE = serviceFee.filter(el => el.type === "SYSTEM_FIX_FEE");
  const blockChain = get(data, "item.blockChain");

  const onSubmit = async values => {
    try {
      // const account = accounts[0];
      setLoading(true);

      const provider = await detectEthereumProvider();
      const step1Response = await postRequest(API_POST_STEP_1_LISTING, {
        ...values,
        itemId,
        asset: blockChain === "POLYGON" ? "MATIC" : 'BNB',
      });
      const isApprovedStep1 = step1Response.data.data.isApproved;
      const txConfigApprove = {
        ...step1Response.data.data.txConfig,
        from: getUser()?.publicAddress,
      };

      const txHashApprove =
        isApprovedStep1 === false
          ? await provider.request({
            method: "eth_sendTransaction",
            params: [txConfigApprove],
          })
          : null;

      const step2Response = await postRequest(API_POST_STEP_2_LISTING, {
        itemId,
        txId: txHashApprove,
      });
      const isApprovedStep2 = step2Response.data.data.isApproved;
      const txConfigList = {
        ...step2Response.data.data.txConfig,
        from: getUser()?.publicAddress,
      };
      const txHashList =
        isApprovedStep2 === false
          ? await provider.request({
            method: "eth_sendTransaction",
            params: [txConfigList],
          })
          : null;
      const step3Response = await postRequest(API_POST_STEP_3_LISTING, {
        itemId,
        txId: txHashList,
      });
      message("success", t("your NFT has been succesfully listed."));
      router.replace(ROUTE_SINGLE_ASSET.replace(":slug", slug));
      setLoading(false);
    } catch (e) {
      if (e?.code) {
        message("error", e?.message);
      }
      setLoading(false);
    }
  };

  const unitPriceOnChange = price => {
    setTotalPrice(price);
  };

  const printUnitPrice = () => {
    if (form.getFieldValue("unitPrice") == null) {
      return "--";
    } else {
      return totalPrice * form.getFieldValue("quantity");
    }
  };

  return (
    <Style>
      <Seo title="List Asset" desc="" isHome={false} />
      <Mainlayout>
        <div className="container pt40 pb40">
          <div className="pipe-shape">
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
              />
            </svg>
            <Row gutter={40}>
              <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
                <div className="pb40">
                  <Link
                    href={ROUTE_SINGLE_ASSET.replace(":slug", slug)}
                    prefetch={false}
                  >
                    <a>
                      <Button
                        type="text"
                        size="small"
                        icon={<ArrowLeftOutlined />}
                      >
                        {t("Back To Item")}
                      </Button>
                    </a>
                  </Link>
                </div>
                <Form
                  onFinish={onSubmit}
                  form={form}
                  layout="vertical"
                  className="form"
                  initialValues={{
                    type: "FIX",
                    expiration: "DAY_1",
                    quantity: remainedQuantity,
                  }}
                >
                  <Form.Item
                    className="list-type"
                    name="type"
                    label={t("Choose a type of sale")}
                  >
                    <Radio.Group
                      onChange={() => {
                        form.setFieldsValue({ unitPrice: null, quantity: 1 });
                        setTotalPrice(0);
                      }}
                    >
                      <Radio.Button className="bid" value="FIX">
                        <TbCurrencyDollar />
                        <p className="type-title">{t("Fix Price")}</p>
                      </Radio.Button>
                      <Radio.Button
                        disabled={remainedQuantity > 1}
                        className="fixed"
                        value="BID"
                      >
                        <TbAlarm />

                        <p className="type-title">{t("Timed Auction")}</p>
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.type !== currentValues.type
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("type") === "FIX" ? (
                        <Form.Item
                          name="unitPrice"
                          label={t("Set a unit price")}
                          rules={[
                            {
                              required: true,
                              message: t("Please enter amount!"),
                            },
                          ]}
                        >
                          <InputNumber
                            onChange={unitPriceOnChange}
                            min={0.001}
                            size="large"
                            placeholder={t("Amount")}
                            addonAfter={blockChain === "POLYGON" ? "MATIC" : 'BNB'}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      ) : null
                    }
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.type !== currentValues.type
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("type") === "FIX" ? (
                        <Form.Item
                          name="quantity"
                          label={
                            remainedQuantity === 1
                              ? t("Quantity")
                              : `${t("Quantity")} (${remainedQuantity} ${t(
                                "available"
                              )})`
                          }
                          rules={[
                            {
                              required: true,
                              message: t("Please enter a quantity"),
                            },
                          ]}
                        >
                          <InputNumber
                            size="large"
                            disabled={remainedQuantity === 1}
                            min={1}
                            max={remainedQuantity}
                            placeholder={remainedQuantity}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      ) : null
                    }
                  </Form.Item>

                  {form.getFieldValue("type") === "FIX" ? (
                    <div className="summary pt40 pb40">
                      <h2>{t("Summary")}</h2>
                      <ul>
                        <li>
                          <div className="label">{t("Listing price")}</div>
                          <div className="value">{`${printUnitPrice()} ${blockChain === "POLYGON" ? "MATIC" : 'BNB'}`}</div>
                        </li>
                        <li>
                          <div className="label">{t("Service fee")}</div>
                          <div className="value">{`${SYSTEM_FIX_FEE[0].rate}%`}</div>
                        </li>
                      </ul>
                      <hr />
                      <div className="total">
                        <div className="label">{t("Total")}</div>
                        <div className="value">{`${totalPrice == null
                          ? "--"
                          : totalPrice * form.getFieldValue("quantity")
                          } ${blockChain === "POLYGON" ? "MATIC" : 'BNB'}`}</div>
                      </div>
                    </div>
                  ) : (
                    <Fragment />
                  )}
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.type !== currentValues.type
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("type") === "BID" ? (
                        <Form.Item
                          name="unitPrice"
                          label={t("Starting Price")}
                          rules={[
                            {
                              required: true,
                              message: t("Please enter amount!"),
                            },
                          ]}
                        >
                          <InputNumber
                            onChange={unitPriceOnChange}
                            min={0.001}
                            size="large"
                            placeholder={t("Amount")}
                            addonAfter={blockChain === "POLYGON" ? "MATIC" : 'BNB'}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      ) : null
                    }
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.type !== currentValues.type
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("type") === "BID" ? (
                        <Form.Item
                          name="quantity"
                          label={
                            remainedQuantity === 1
                              ? t("Quantity")
                              : `${t("Quantity")} (${remainedQuantity} ${t(
                                "available"
                              )})`
                          }
                          rules={[
                            {
                              required: true,
                              message: t("Please enter a quantity"),
                            },
                          ]}
                        >
                          <InputNumber
                            size="large"
                            disabled={remainedQuantity === 1}
                            min={1}
                            max={remainedQuantity}
                            placeholder={remainedQuantity}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      ) : null
                    }
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.type !== currentValues.type
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("type") === "BID" ? (
                        <Form.Item name="expiration" label={t("Set duration")}>
                          <Select size="large">
                            <Option value="DAY_1">{t("1 Day")}</Option>
                            <Option value="DAY_3">{t("3 Days")}</Option>
                            <Option value="WEEK_1">{t("1 Week")}</Option>
                            <Option value="WEEK_2">{t("2 Weeks")}</Option>
                            <Option value="MONTHS_1">{t("1 Month")}</Option>
                            <Option value="MONTHS_3">{t("3 Months")}</Option>
                            <Option value="MONTHS_6">{t("6 Months")}</Option>
                          </Select>
                        </Form.Item>
                      ) : null
                    }
                  </Form.Item>
                  {form.getFieldValue("type") === "BID" ? (
                    <div className="summary pt40 pb40">
                      <h2>{t("Summary")}</h2>
                      <ul>
                        <li>
                          <div className="label">{t("Listing price")}</div>
                          <div className="value">{`${printUnitPrice()} ${blockChain === "POLYGON" ? "MATIC" : 'BNB'}`}</div>
                        </li>
                        <li>
                          <div className="label">{t("Service fee")}</div>
                          <div className="value">{`${SYSTEM_BID_FEE[0].rate}%`}</div>
                        </li>
                      </ul>
                      <hr />
                      <div className="total">
                        <div className="label">{t("Total")}</div>
                        <div className="value">{`${totalPrice == null ? "--" : totalPrice
                          } ${blockChain === "POLYGON" ? "MATIC" : 'BNB'}`}</div>
                      </div>
                    </div>
                  ) : (
                    <Fragment />
                  )}
                  <Form.Item className="button-section">
                    <Button
                      type="primary"
                      size="large"
                      block
                      htmlType="submit"
                      loading={loading}
                    >
                      {t("Complete Listing")}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                <div className="asset-item">
                  <div className="top">
                    <LazyLoadImage width="100%" src={fileUrl} />
                  </div>
                  <div className="bottom">
                    <div className="titles">
                      <h4 className="collection-name">{collectionName}</h4>
                      <h2 className="item-name">{textDots(name, 20)}</h2>
                    </div>
                    <div className="price">
                      <span className="label">{t("price")}</span>
                      <span className="value">{`${printUnitPrice()} ${blockChain === "POLYGON" ? "MATIC" : 'BNB'}`}</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Mainlayout>
    </Style>
  );
}

export const getServerSideProps = async ctx => {
  const { res, req, params, locale, query } = ctx;
  const { slug } = params;
  let getSellApi = {};
  try {
    getSellApi = await getRequest(
      `${API_GET_SELL_DETAIL}/${slug}/sell`,
      {},
      ctx
    );
  } catch (e) {
    if (e.status === 403 || e.status === 400) {
      return {
        redirect: {
          permanent: true,
          destination: ROUTE_SINGLE_ASSET.replace(":slug", slug),
        },
      };
    } else {
      return redirectOnServer(e);
    }
  }

  return {
    props: {
      data: get(getSellApi, "data.data", {}),
      slug,
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
