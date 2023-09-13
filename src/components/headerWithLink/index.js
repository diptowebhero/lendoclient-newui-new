import Link from "next/link";
import Icon, { RightOutlined } from "@ant-design/icons";
import Style from "./style";
import { useTranslation } from "next-i18next";
import { Button, Row, Col, Dropdown, Menu } from "antd";
import { DownOutlined } from '@ant-design/icons';

export default function HeaderWithLink(props) {
  const [t, i18n] = useTranslation("common");
  const { title, title2, icon, textLink, btnText, link, dropdown } = props;

  const menu = (
    <Menu className="dropdown-item" style={{ background: "#2A2C2D" }}>
      <Menu.Item className="custom-menu-item" >Action</Menu.Item>
      <Menu.Item className="custom-menu-item">Another action</Menu.Item>
      <Menu.Item className="custom-menu-item">Something else here</Menu.Item>
    </Menu>
  );


  return (
    <Style>
      <span className="titles">{t(title)}&nbsp;
        <span className="text_orange">
          {title2 && !dropdown && t(title2)}
          {icon}
        </span>
        {dropdown &&
          <Dropdown overlay={menu} >
            <Button className="custom-btn dropdown-toggle">
              <span className="text_orange custom-btn-span">
                {t(title2)}
              </span>
              <DownOutlined className="custom-btn-icon" />
            </Button>
          </Dropdown>
        }
      </span>
      {link &&
        <Link href={link} prefetch={false}>
          <span>
            <a className="gray-link">
              {t(textLink)} {textLink && <Icon component={RightOutlined} />}
            </a>
          </span>
        </Link>
      }

      {btnText &&
        <span className="viewallbtn">
          {t(btnText)}
        </span>
      }
    </Style>
  );
}


