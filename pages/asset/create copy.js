import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Modal,
  Form,
  Button,
  Input,
  Select,
  Switch,
  InputNumber,
  Spin,
  Row,
  Col,
  Checkbox,
} from "antd";
import Style from "@partials/account/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import { Fragment, useState } from "react";
import { hooks } from "@src/components/wallet/connectors/metamask";
import AvatarWithVerified from "@src/components/avatarWithVerify";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import SelectImageFile from "@src/components/selectImageFile";
import {
  API_URL_CREATE_STEP_1,
  API_URL_CREATE_STEP_2,
} from "@src/partials/asset/const";
import { getRequest, postRequest, redirectOnServer } from "@src/helpers/api";
import message from "@src/helpers/message";
import LoadingContainer from "@src/containers/globalLoading";
import { useRouter } from "next/router";
import { ROUTE_ACCOUNT, ROUTE_SINGLE_ASSET } from "@src/routes";
import { API_URL_GET_USER_COLLECTION } from "@src/partials/collection/const";
import { get } from "lodash";
import detectEthereumProvider from "@metamask/detect-provider";
import { getUser } from "@src/helpers/authUtils";
import getCurrentNetwork, { switchNetwork } from "@src/helpers/getCurrentNetwork";
import { networks } from "@src/data";

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;
const { TextArea } = Input;
const { Option } = Select;
export default function AssetCreate({ data }) {
  const [t, i18n] = useTranslation("common");
  const [fileType, setFileType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const globalLoading = LoadingContainer.useContainer();
  const accounts = useAccounts();
  const [form] = Form.useForm();
  const protocol = Form.useWatch("protocol", form);
  const isCreatorFee = Form.useWatch("isCreatorFee", form);
  const network = getCurrentNetwork();

  const onSubmit = async values => {
    try {
      globalLoading.set(true);
      const provider = await detectEthereumProvider();
      values.blockChain = network.blockChain;
      const responseStep1 = await postRequest(API_URL_CREATE_STEP_1, values);
      const txConfig = {
        ...responseStep1.data.data.txConfig,
        from: getUser()?.publicAddress,
      };
      const tokenId = responseStep1.data.data.tokenId;
      if (provider) {
        const txHash = await provider.request({
          method: "eth_sendTransaction",
          params: [txConfig],
        });
        const responseStep2 = await postRequest(API_URL_CREATE_STEP_2, {
          txId: txHash,
          tokenId: tokenId,
          blockChain: network.blockChain,
        });
        globalLoading.set(false);
        message("success", t("item has been created successfully!"));
        router.replace({
          pathname: ROUTE_SINGLE_ASSET.replace(
            ":slug",
            responseStep2.data.data.slug
          ),
        });
      }
    } catch (e) {
      globalLoading.set(false);
    }
  };
  const renderCollections = () => {
    return data.map(item => {
      const { id, name, logoImage } = item;
      return (
        <Option value={id} label={name} key={id}>
          <div className="render-item">
            <img src={logoImage} />
            {name}
          </div>
        </Option>
      );
    });
  };
  const fileTypeSetter = value => {
    setFileType(value);
  };
  const previewUrlCheckerIfVideo = () => {
    if (fileType.includes("video") || fileType.includes("audio")) {
      return true;
    } else {
      return false;
    }
  };
  const changeNetwork = async (e) => {
    let result = await switchNetwork(e);
    setTimeout(() => {
      router.reload()
    }, 1000);
  }

  
  return (
    <Style>
      <Seo title="Create NFTs" desc="" isHome={false} />
      <Mainlayout>
        <div className="container-content pt40 pb40">
          <Form
            onFinish={onSubmit}
            form={form}
            name="create_asset"
            layout="vertical"
            className="form form-center-size"
            scrollToFirstError
            initialValues={{
              blockChain: network.blockChain,
              quantity: 1,
              isSensitive: false,
              unlockableContent: false,
              protocol: "ERC-721",
              isCreatorFee: false,
            }}
          >
            <div className="pb40">
              <h1 className="title">{t("Create New Item")}</h1>
            </div>
            <Form.Item
              name="fileUrl"
              label={t("Image, Video, Audio, or 3D Model")}
              rules={[
                {
                  required: true,
                  message: t("Please select file!"),
                },
              ]}
            >
              <SelectImageFile
                className="cover-image"
                allowType="all"
                limitFileSize={10}
                description="File types supported: JPG, PNG, GIF, WEBP, MP4, MP3. Max size: 10 MB"
                typeHandler={fileTypeSetter}
                type="all"
              />
            </Form.Item>
            <Form.Item
              name="previewUrl"
              label={t("Preview Image")}
              hidden={!previewUrlCheckerIfVideo()}
              rules={[
                {
                  required: previewUrlCheckerIfVideo(),
                  message: t("Please select file!"),
                },
              ]}
            >
              <SelectImageFile
                className="featured-image"
                allowType="all"
                limitFileSize={10}
                type="image"
                description="Because you’ve included multimedia, you’ll need to provide an image (PNG, JPG, or GIF) for the card display of your item."
              />
            </Form.Item>
            <Form.Item
              name="name"
              label={t("name")}
              rules={[
                {
                  required: true,
                  message: t("This field is required."),
                },
              ]}
            >
              <Input
                size="large"
                placeholder={t("e.g Redeemable T-Shirt with logo")}
              />
            </Form.Item>
            {/* <Form.Item
              className="no-space-with-text-prefix"
              name="slug"
              label={t("URL")}
              extra={t(
                "Lendochain will include a link to this URL on this item’s detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
              )}
              rules={[
                {
                  pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message: t(
                    "Entered value must only contain lowercase letters, numbers, and hyphens"
                  ),
                },
              ]}
            >
              <Input size="large" prefix="https://lendochain.io/item/" />
            </Form.Item> */}
            <Form.Item
              name="description"
              label={t("Description")}
              extra={
                <span>
                  {t(
                    "The description will be included on the item’s detail page underneath its image."
                  )}
                </span>
              }
            >
              <TextArea
                size="large"
                placeholder="Provide a detailed description of Your item"
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>
            <Form.Item
              name="collectionId"
              label={t("Collection")}
              extra={t("This is the collection where your item will appear.")}
              rules={[
                {
                  required: true,
                  message: t("Please select a collection"),
                },
              ]}
            >
              <Select
                popupClassName="search-dropdown"
                className="search-dropdown"
                size="large"
                placeholder={t("select a collection")}
              >
                {renderCollections()}
              </Select>
            </Form.Item>
            <hr />
            <Form.List name="properties" size="large">
              {(fields, { add, remove }, { errors }) => (
                <>
                  <div className="two-colomn without-antd">
                    <div>
                      <p className="label-title">{t("Properties")}</p>
                      <p className="description no-space">
                        {t("Textual traits that show up as rectangles")}
                      </p>
                    </div>
                    <Form.Item className="no-space">
                      <Button
                        className="curve default"
                        size="medium"
                        icon={<PlusOutlined />}
                        onClick={() => add()}
                      />
                    </Form.Item>
                  </div>
                  <div className="table-list">
                    <table>
                      {fields.length !== 0 && (
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Name</th>
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {fields.map(({ key, name, ...restField }) => (
                          <tr key={key}>
                            <td>
                              <Form.Item
                                className="no-space"
                                {...restField}
                                name={[name, "key"]}
                                help={false}
                                rules={[
                                  {
                                    required: true,
                                    message: t("please type a key"),
                                  },
                                  {
                                    pattern: /^[a-zA-Z0-9._-]+$/,
                                    message: t(
                                      "Entered value must only contain lowercase letters, numbers, hyphens and dash."
                                    ),
                                  },
                                ]}
                              >
                                <Input placeholder="Body" size="large" />
                              </Form.Item>
                            </td>
                            <td>
                              <Form.Item
                                className="no-space"
                                name={[name, "value"]}
                                {...restField}
                                help={false}
                                rules={[
                                  {
                                    required: true,
                                    message: t("please type a value"),
                                  },
                                  {
                                    pattern: /^[a-zA-Z0-9._-]+$/,
                                    message: t(
                                      "Entered value must only contain lowercase letters, numbers, hyphens and dash."
                                    ),
                                  },
                                ]}
                              >
                                <Input size="large" placeholder="Robot" />
                              </Form.Item>
                            </td>
                            <td>
                              <MinusCircleOutlined
                                className="remove-btn"
                                onClick={() => remove(name)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="description">
                      {t(
                        "Entered value must only contain lowercase letters, numbers, hyphens and dash."
                      )}
                    </p>
                  </div>
                </>
              )}
            </Form.List>
            <hr />
            <Form.Item
              name="unlockableContent"
              valuePropName="checked"
              className="two-colomn"
              hidden
              extra={
                <Fragment>
                  <p className="label-title">{t("Unlockable Content")}</p>
                  <p className="description">
                    {t(
                      "Include unlockable content that can only be revealed by the owner of the item."
                    )}
                  </p>
                </Fragment>
              }
            >
              <Switch />
            </Form.Item>
            <Form.Item
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
            </Form.Item>
            <hr />
            <Form.Item className="no-space" dependencies={[]}>
              {({ getFieldValue, setFieldsValue }) => (
                <Form.Item
                  name="protocol"
                  label={t("token type")}
                  extra={
                    <Fragment>
                      <div>
                        {t(
                          "ERC-721: If you want to highlight the uniqueness and individuality of your item"
                        )}
                      </div>
                      <div>
                        {t(
                          "ERC-1155: If you want to share your NFT with a large number of community members"
                        )}
                      </div>
                    </Fragment>
                  }
                  rules={[
                    {
                      required: true,
                      message: t("Please select a token type"),
                    },
                  ]}
                >
                  <Select
                    popupClassName="search-dropdown"
                    className="search-dropdown"
                    size="large"
                    placeholder={t("select a collection")}
                    onChange={() => {
                      if (getFieldValue("protocol") === "ERC-721") {
                        setFieldsValue({ quantity: 1 });
                      } else {
                        null;
                      }
                    }}
                  >
                    <Option value="ERC-721" label="ERC-721">
                      ERC-721
                    </Option>
                    <Option value="ERC-1155" label="ERC-1155">
                      ERC-1155
                    </Option>
                  </Select>
                </Form.Item>
              )}
            </Form.Item>
            <Form.Item dependencies={["protocol"]} className="no-space">
              {({ getFieldValue, setFieldValue }) => (
                <Form.Item
                  name="quantity"
                  label={t("Supply")}
                  extra={t(
                    "The number of items that can be minted. No gas cost to you!"
                  )}
                  rules={[
                    {
                      required: true,
                      message: t("this field is required!"),
                    },
                  ]}
                >
                  <InputNumber
                    disabled={
                      getFieldValue("protocol") === "ERC-721" ? true : false
                    }
                    style={{ width: "100%" }}
                    size="large"
                    min={1}
                  />
                </Form.Item>
              )}
            </Form.Item>

            {/* <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.protocol !== currentValues.protocol
              }
            >
              {({ getFieldValue, setFieldValue }) =>
                getFieldValue("protocol") === "ERC-721" ? (
                  <Form.Item
                    name="isCreatorFee"
                    valuePropName="checked"
                    className="no-space"
                  >
                    <Checkbox
                      size="large"
                      onChange={event => {
                        if (event.target.checked === true) {
                          setFieldValue({ royalityPrecent: 1 });
                        } else {
                          setFieldValue({ royalityPrecent: null });
                        }
                      }}
                    >
                      {t("Royalities")}
                    </Checkbox>
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            {form.getFieldValue("isCreatorFee") === true ? (
              <Fragment>
                <p className="label-title">{t("Creator Fee")}</p>
                <span className="ant-form-item-extra">
                  {t("Suggested: 0%, 2%, 4%, 8%. Maximum is 10%.")}
                </span>
              </Fragment>
            ) : null}
            <Row align="flext-start" gutter={8}>
              <Col span={24}>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.isCreatorFee !== currentValues.isCreatorFee
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("isCreatorFee") === true ? (
                      <Form.Item name="royalityPrecent">
                        <InputNumber
                          size="large"
                          min={1}
                          max={10}
                          placeholder="5"
                          addonAfter="%"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    ) : null
                  }
                </Form.Item>
              </Col>
            </Row> */}
            <Form.Item
              name="blockChain"
              label={t("Blockchain")}
              extra={t(
                "Select the blockchain where you’d like new items from this collection to be added by default"
              )}
            >
              {network.blockChain ? <>
                <Select size="large" value={network.chainId} onChange={(e) => changeNetwork(e)}
                  key={1}
                >
                  {networks.map((item, i) => (
                    <Option value={item.chainId} label={item.blockChain} key={i}>
                      <div className="option-with-icon select_ant">
                        <img src={item.icon} width={24} />
                        <span>{item.name}</span>
                      </div>
                    </Option>
                  ))}

                </Select></> : ''}
            </Form.Item>
            <Form.Item className="button-section">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={globalLoading.status}
              >
                {t("Create")}
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
  let userCollectionsApiResponse = {};
  try {
    userCollectionsApiResponse = await getRequest(
      API_URL_GET_USER_COLLECTION,
      { unnamed: true, blockChain: query.blockChain },
      ctx
    );
  } catch (e) {
    return redirectOnServer(e);
  }

  return {
    props: {
      data: get(userCollectionsApiResponse, "data.data", {}),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};



