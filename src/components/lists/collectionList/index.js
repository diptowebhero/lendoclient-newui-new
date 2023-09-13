import CollectionCard from "@src/components/cards/collectionCard";
import { Empty } from "antd";
import isEmpty from "lodash/isEmpty";
import Style from "./style";

export default function CollectionList(props) {
  const { data } = props;
  function renderFarm() {
    return data.map(item => {
      return (
        <div className="collection-item" key={item.id}>
          <CollectionCard data={item}></CollectionCard>
        </div>
      );
    });
  }
  return (
    <Style>
      {!isEmpty(data) ? (
        <div className="collection-list">{renderFarm()}</div>
      ) : (
        <Empty />
      )}
    </Style>
  );
}
