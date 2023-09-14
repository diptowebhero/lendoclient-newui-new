import { Checkbox, Form } from "antd";
import { useTranslation } from "next-i18next";
const { Item } = Form;
const { Group: CheckboxGroup } = Checkbox;

const data = [
  {
    label: "Offer",
    value: "Offer",
  },
  {
    label: "Cancel",
    value: "Cancel",
  },
  {
    label: "Mint",
    value: "Mint",
  },
  {
    label: "List",
    value: "List",
  },
  {
    label: "Buy",
    value: "Buy",
  },
  {
    label: "Approve",
    value: "Approve",
  },
  {
    label: "Settle",
    value: "Settle",
  },
];

export default function ActivityBy() {
  const [t, i18n] = useTranslation("common");
  return (
    <Item className="activity" name="activity">
      <CheckboxGroup options={data} />
    </Item>
  );
}
