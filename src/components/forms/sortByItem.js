import { Form, Select } from "antd";
import { useTranslation } from "next-i18next";
const { Option } = Select;
const { Item } = Form;

export default function SortByItem({ width }) {
  const [t, i18n] = useTranslation("common");
  return (
    <Item className="sorting" name="sortBy">
      <Select
        placeholder={t("Sort by")}
        size="large"
        style={width && { width: width }}
      >
        <Option value="">{t("All")}</Option>
        <Option value="RECENTLY_LISTED">{t("Recently Listed")}</Option>
        <Option value="RECENTLY_CREATED">{t("Recently Created")}</Option>
        <Option value="RECENTLY_SOLD">{t("Recently Sold")}</Option>
        {/* <Option value="RECENTLY_RECEIVED">{t("Recently Received")}</Option> */}
        <Option value="ENDING_SOON">{t("Ending Soon")}</Option>
        <Option value="PRICE_LOW_TO_HIGH">{t("Price Low To High")}</Option>
        <Option value="PRICE_HIGH_TO_LOW">{t("Price High To Low")}</Option>
        <Option value="HIGHEST_LAST_SALE">{t("Highest Last Sale")}</Option>
        <Option value="MOST_VIEWED">{t("Most Viewed")}</Option>
        {/* <Option value="MOST_FAVOURIE">{t("Most Favorite")}</Option> */}
        <Option value="OLDEST">{t("Oldest")}</Option>
      </Select>
    </Item>
  );
}
