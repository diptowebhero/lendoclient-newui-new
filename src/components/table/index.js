import Style from "./style";
import { Table as AntdTable } from "antd";

export default function Table(props) {
  return (
    <Style>
      <AntdTable
        className="custom-table"
        pagination={{
          position: ["none", "bottomCenter"],
          hideOnSinglePage: true,
          ...props.pagination,
        }}
        scroll={{ x: "100%" }}
        tableLayout="auto"
        size="large"
        bordered={false}
        {...props}
      />
    </Style>
  );
}

