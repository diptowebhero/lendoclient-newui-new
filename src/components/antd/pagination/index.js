import Link from "next/link";
import Style from "./style";
import { Pagination as AntdPagination } from "antd";
import { useTranslation } from "next-i18next";

export default function Pagination(props) {
  const [t, i18n] = useTranslation("common");
  function showTotal(total) {
    return t("total items", { total });
  }

  const { total } = props;

  // Conditionally render disabled pagination if total is 0
  if (total === 0) {
    return (
      <Style>
        <div className="pagination pb40 pt40">
          <div className="disabled-pagination">
            {t("No items to display")}
          </div>
        </div>
      </Style>
    );
  }


  return (
    <Style>
      <div className="pagination pb40 pt40">
        <AntdPagination
          hideOnSinglePage={true}
          defaultCurrent={1}
          showTotal={showTotal}
          showSizeChanger={false}
          defaultPageSize={12}
          {...props}
        />
      </div>
    </Style>
  );
}


