import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Col, Form, Row, Button, Input, Select, Switch } from "antd";
import Style from "@partials/account/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import { Fragment } from "react";
import SelectImageFile from "@src/components/selectImageFile";
import { categories } from "@src/data";
import { getRequest, patchRequest, redirectOnServer } from "@src/helpers/api";
import LoadingContainer from "@src/containers/globalLoading";
import { API_URL_CRUD_COLLECTION } from "@src/partials/collection/const";
import {
  TbBrandDiscord,
  TbBrandTwitter,
  TbWorld,
  TbBrandInstagram,
} from "react-icons/tb";
import { useRouter } from "next/router";
import message from "@src/helpers/message";
import { get } from "lodash";
import { ROUTE_SINGLE_COLLECTION } from "@src/routes";
import getCurrentNetwork from "@src/helpers/getCurrentNetwork";
import TextFrame from "pages/asset/formTextFrame";

const { TextArea } = Input;
const { Option } = Select;
export default function EditCollection({ slug, data }) {
  const [t, i18n] = useTranslation("common");
  const router = useRouter();
  const globalLoading = LoadingContainer.useContainer();
  const [form] = Form.useForm();
  const network = getCurrentNetwork();

  const onSubmit = async values => {
    console.log(values);
    try {
      globalLoading.set(true);
      const response = await patchRequest(
        `${API_URL_CRUD_COLLECTION}/${slug}`,
        values
      );
      globalLoading.set(false);
      message("success", t("collection has been edited successfully!"));
      router.replace({
        pathname: ROUTE_SINGLE_COLLECTION.replace(
          ":slug",
          response.data.data.slug
        ),
      });
    } catch (e) {
      globalLoading.set(false);
    }
  };

  return (
    <Style>
      <Seo title="Edit Collection" desc="" isHome={false} />
      <Mainlayout>
        <div className="container pt40 pb40">
          <Form
            onFinish={onSubmit}
            form={form}
            layout="vertical"
            className="form "
            initialValues={data}
          >

            <div className="main-form-title pb40">
              <h1 className="title">{t("Edit Collection")}</h1>
              <hr />
            </div>
            <div className="">
              <TextFrame
                title="logo-image"
                title2="This image will also be used for navigation"
                formText=" 350 x 350 recommended.Max size: 10 MB"
                icon={true}
              />
            </div>
            <Form.Item
              name="logoImage"
              rules={[
                {
                  required: true,
                  message: t("Please select file!"),
                },
              ]}
            >
              <SelectImageFile
                className="logo-image "
                type="image"
              />
            </Form.Item>
            <div className="">
              <TextFrame
                title="Featured image"
                title2="This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of LendoChain. "
                formText="  600 x 400 px recommended.
                  Max size: 10 MB"
                icon={true}
              />
            </div>
            <Form.Item name="featuredImage" >
              <SelectImageFile
                className="featured-image"
                type="image"
              />
            </Form.Item>
            <div className="">
              <TextFrame
                title="Banner image"
                title2="This image will appear at the top of your collection page. Avoid including too much text in teh image, as the dimensions change on different devices. "
                formText="1400 x 350 px recommended.
                  Max size: 10 MB"
                icon={true}
              />
            </div>
            <Form.Item name="bannerImage" >
              <SelectImageFile
                className="cover-image"
                type="image"
              />
            </Form.Item>
            <div className="my-5">
              <TextFrame
                title="Name"
                icon={true}
              />
            </div>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: t("This field is required."),
                },
              ]}
            >
              <Input
                size="large"
                placeholder={t("Example: Treasures of the Sea")}
              />
            </Form.Item>
            <hr className="border-bottom" />
            <div className="my-5">
              <TextFrame
                title="Url"
                title2="Customize your URL on LendoChain. Must only contain lowercase letters, numbers, and hyphens."
                icon={true}
              />
            </div>
            <Form.Item
              className="no-space-with-text-prefix"
              name="slug"
              rules={[
                {
                  pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message: t(
                    "Entered value must only contain lowercase letters, numbers, and hyphens"
                  ),
                },
              ]}
            >
              <Input size="large" prefix="https://lendochain.io/collection/" />
            </Form.Item>
            <hr className="border-bottom" />
            <div className="my-5">
              <TextFrame
                title="Description"
                icon={true}
              />
            </div>
            <Form.Item name="description" >
              <TextArea size="large" />
            </Form.Item>

            <hr className="border-bottom" />
            <div className="my-5">
              <TextFrame
                title="Category"
                title2="This is the collection where your item will appear."
                icon={true}
              />
            </div>
            <Form.Item
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: t("Please select a category"),
                },
              ]}
            >
              <Select
                options={categories}
                size="large"
                placeholder={t("select a category")}
              />
            </Form.Item>
            <hr className="border-bottom" />
            <div className="my-5">
              <TextFrame
                title="Links"
                icon={true}
              />
            </div>
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
            {/* <p className="label-title">{t("Creator earnings")}</p>
            <p className="description">
              {t(
                "Earn a percentage of the sale price every time one of your items is sold. Adding multiple addresses may increase gas fees for buyers."
              )}
            </p> */}
            {/* <Form.List name="creatorEarn" size="large">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row
                      align="flext-start"
                      gutter={8}
                      className="pb20"
                      key={key}
                    >
                      <Col span={17}>
                        <Form.Item
                          className="no-space"
                          {...restField}
                          name={[name, "address"]}
                          dependencies={[
                            ["creatorEarn", 0, "address"],
                            ["creatorEarn", 1, "address"],
                            ["creatorEarn", 3, "address"],
                            ["creatorEarn", 4, "address"],
                            ["creatorEarn", 5, "address"],
                            ["creatorEarn", 6, "address"],
                            ["creatorEarn", 7, "address"],
                            ["creatorEarn", 8, "address"],
                            ["creatorEarn", 9, "address"],
                            ["creatorEarn", 10, "address"],
                          ]}
                          rules={[
                            {
                              required: true,
                              message: "Missing wallet address",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("creatorEarn").filter(
                                    item => item.address === value
                                  ).length !== 1
                                ) {
                                  return Promise.reject(
                                    new Error(
                                      "Payout addresses must be unique."
                                    )
                                  );
                                } else {
                                  return Promise.resolve();
                                }
                              },
                            }),
                          ]}
                        >
                          <Input
                            placeholder="Please enter an address, e.g. 0x1ed3... or destination.eth, destination.lens"
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          validateTrigger={["onChange", "onBlur", "onFocus"]}
                          className="no-space"
                          name={[name, "rate"]}
                          dependencies={[
                            ["creatorEarn", 0, "rate"],
                            ["creatorEarn", 1, "rate"],
                            ["creatorEarn", 3, "rate"],
                            ["creatorEarn", 4, "rate"],
                            ["creatorEarn", 5, "rate"],
                            ["creatorEarn", 6, "rate"],
                            ["creatorEarn", 7, "rate"],
                            ["creatorEarn", 8, "rate"],
                            ["creatorEarn", 9, "rate"],
                            ["creatorEarn", 10, "rate"],
                          ]}
                          rules={[
                            {
                              required: true,
                              message: t(""),
                            },
                            {
                              pattern: "^([-]?[1-9][0-9]*|0)$",
                              message: t("percent must be a number"),
                            },
                            ({ getFieldValue }) => ({
                              validator: async _ => {
                                const totalFees = getFieldValue(
                                  "creatorEarn"
                                ).reduce(
                                  (total, item) =>
                                    parseInt(item?.percent) + total,
                                  0
                                );

                                if (totalFees > 10) {
                                  return Promise.reject(
                                    t("Total creator fees must not exceed 10%.")
                                  );
                                } else {
                                  return Promise.resolve();
                                }
                              },
                            }),
                          ]}
                          {...restField}
                        >
                          <Input size="large" suffix="%" />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <MinusCircleOutlined
                          className="remove-btn"
                          style={{ marginTop: "15px" }}
                          onClick={() => remove(name)}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button size="large" onClick={() => add()}>
                      {t("Add address")}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List> */}
            <hr className="border-bottom" />
            <div className="my-5">
              <TextFrame
                title="Blockchain"
                title2="Select the blockchain where you’d like new items from this collection to be added by default."
                icon={true}
              />
            </div>
            <Form.Item
              name="blockChain"
            > 
              {network.blockChain ? <>
                <Select size="large" disabled defaultValue={data.blockChain}>
                  <Option value={network.blockChain} label={network.blockChain}>
                    <div className="option-with-icon select_ant">
                      <img src={network.icon} width={24} />
                      <span>{network.name}</span>
                    </div>
                  </Option>
                </Select> </> : ''}
            </Form.Item>
            <hr className="border-bottom" />
            <div className="my-5">
              <TextFrame
                title="Payment Tokens"
                title2="These tokens can be used to buy and sell your items."
                icon={true}
              />
            </div>
            <Form.Item
              name="paymentToken"
            >
              {network.currency ? <>
                <Select
                  defaultValue={network.currency}
                  size="large"
                  disabled
                  options={[{ value: network.currency, label: network.currency }]}
                /></> : ''}
            </Form.Item>
            {/* <Form.Item
              name="isSensitive"
              valuePropName="checked"
              className="two-colomn"
              extra={
                <Fragment>
                  <p className="label-title">
                    {t("Explicit & sensitive content")}
                  </p>
                  <p className="description">
                    {t("Set this collection as explicit and sensitive content")}
                  </p>
                </Fragment>
              }
            >
              <Switch />
            </Form.Item> */}
            <Form.Item className="button-section">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={globalLoading.status}
              >
                {t("Edit")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Mainlayout>
    </Style>
  );
}

export const getServerSideProps = async ctx => {
  const { res, req, params, locale, query } = ctx;
  const { slug } = params;
  let getCollectionApiResponse = {};
  try {
    getCollectionApiResponse = await getRequest(
      `${API_URL_CRUD_COLLECTION}/${slug}/edit`,
      {},
      ctx
    );
  } catch (e) {
    if (e.status === 403 || e.status === 400) {
      return {
        redirect: {
          permanent: true,
          destination: ROUTE_SINGLE_COLLECTION.replace(":slug", slug),
        },
      };
    } else {
      return redirectOnServer(e);
    }
  }

  return {
    props: {
      data: get(getCollectionApiResponse, "data.data", {}),
      locale,
      slug,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
