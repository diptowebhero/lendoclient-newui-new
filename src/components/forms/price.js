import getCurrentNetwork from "@src/helpers/getCurrentNetwork";
import { Form, Select, Input } from "antd";
import { useTranslation } from "next-i18next";
const { Option } = Select;
const { Item } = Form;

export default function PriceBy() {
  const [t, i18n] = useTranslation("common");
  const network = getCurrentNetwork();

  return (

    <div className="price-filter">
      <Item className="unit-price" name="currency">
        <Select size="large">
          {/* <Option value="USD">{t("USD")}</Option> */}
          <Option value={network.currency}>{network.currency}</Option>
        </Select>
      </Item>
      <Item className="min-price" name="min">
        <Input size="large" placeholder={t("Min")} />
      </Item>
      <span style={{color:"white"}}>{t("to")}</span>
      <Item
        className="max-price"
        name="max"
        help={false}
        dependencies={["min"]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (
                !value ||
                !getFieldValue("min") ||
                getFieldValue("min") <= value
              ) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Minumum must be less than maximum")
              );
            },
          }),
        ]}
      >
        <Input size="large" placeholder={t("Max")} />
      </Item>
    </div>
  );
}
