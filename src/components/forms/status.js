import { Form, Checkbox } from "antd";
import { useTranslation } from "next-i18next";
const { Item } = Form;

const statusFilterGroup = [
  {
    label: "Buy Now",
    value: "FIX",
  },
  {
    label: "on auction",
    value: "BID",
  },
  // {
  //   label: "New",
  //   value: "New",
  // },
  {
    label: "Has Offers",
    value: "HAS_OFFER",
  },
];

export default function StatusBy() {
  const [t, i18n] = useTranslation("common");
  return (
    <Item  className="status" name="status">
      <Checkbox.Group style={{color:"white"}} options={statusFilterGroup} />
    </Item>
  );
}

