import { Fragment } from "react";
import Style from "./style";

export default function NetworkIcon({ blockchain = "" }) {
  function renderFarm() {
    switch (blockchain.toLowerCase()) {
      case "bsc":
        return (
          <Fragment>
            <Fragment>
              <img
                style={{ width: "12px !important" }}
                src="/assets/icons/bsc.svg"
                title="Binance Smart Chain"
              />
              <span className="price">{blockchain}</span>
            </Fragment>
          </Fragment>
        );
      case "polygon":
        return (
          <Fragment>
            <Fragment>
              <img src="/assets/icons/polygon.png" title="Ploygon Chain" />
              <span className="price">{blockchain}</span>
            </Fragment>
          </Fragment>
        );
    }
  }
  return (
    <Style>
      <Fragment>{renderFarm()}</Fragment>
    </Style>
  );
}
