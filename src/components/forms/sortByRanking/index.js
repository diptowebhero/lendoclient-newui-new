import { Form, Select } from "antd";
import { useTranslation } from "next-i18next";
import Style from './style'
import { useState, useEffect } from "react";

const { Option } = Select;
const { Item } = Form;


export default function SortByRanking({ form, onFilter, width, className }) {
  const [t, i8n] = useTranslation("common");
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const selectedSortBy = form.getFieldValue('sortBy');
    setSelectedValue(selectedSortBy);
  }, [form]);

  const handleItemClick = (value) => {
    form.setFieldsValue({ sortBy: value });
    setSelectedValue(value);
    onFilter(form.getFieldsValue());
  };


  return (
    <Style>
      <ul className="items" name="sortBy">
        <li onClick={() => handleItemClick('')} className={selectedValue === '' ? 'active' : ''}>
          <b>{t("All")}</b>
        </li>
        <li onClick={() => handleItemClick('TOP')} className={selectedValue === 'TOP' ? 'active' : ''}>
          <b>{t("Top")}</b>
        </li>
        <li onClick={() => handleItemClick('TRENDING')} className={selectedValue === 'TRENDING' ? 'active' : ''}>
          <b>{t("Trending")}</b>
        </li>
      </ul>
    </Style>
  );
}



{/* <Item className={`sorting ${className}`} name="sortBy">
        <Select
          placeholder={t("Sort by")}
          size="large"
          style={width && { width: width }}
        >
          <Option value="">{t("All")}</Option>
          <Option value="TRENDING">{t("Trending")}</Option>
          <Option value="TOP">{t("Top")}</Option>
        </Select>
      </Item> */}