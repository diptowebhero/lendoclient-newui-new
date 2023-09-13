import { Fragment } from "react";
import Style from "./style";

export default function IncreaseDecreaseStatus({ isIncrease, average }) {
  function renderFarm() {
    if (average != null) {
      if (isIncrease) {
        return <span className="increase">{`+${average}%`}</span>;
      } else {
        return <span className="decrease">{`-${average}%`}</span>;
      }
    } else {
      return <span className="increase">--</span>;
    }
  }
  return (
    <Style>
      <Fragment>{renderFarm()}</Fragment>
    </Style>
  );
}


