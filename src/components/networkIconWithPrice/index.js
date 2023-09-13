import { Fragment } from "react";
import Style from "./style";
import seperateNumber from "@src/helpers/seperateNumber";
import { isFloat } from "@src/helpers/getters/price";

export default function NetworkIconWithPrice({
  blockchain = "",
  price ,
  secondaryDesign,
  isToFixed = false,
}) {
  function renderFarm() {
    switch (blockchain.toLowerCase()) {
      case "bsc":
        return (
          <Fragment>
            {price != null ? (
              <Fragment>
                <img src="/assets/icons/bsc.svg" title="Binance Smart Chain" />
                <span className="price">
                  {isToFixed
                    ? isFloat(price)
                      ? price.toFixed(4)
                      : price
                    : price}
                </span>
              </Fragment>
            ) : (
              <Fragment>
                <img src="/assets/icons/bsc.svg" title="Binance Smart Chain" />
                <span className="price">--</span>
              </Fragment>
            )}
          </Fragment>
        );
      case "polygon":
        return (
          <Fragment>
            {price != null ? (
              <Fragment>
                <img src="/assets/icons/polygon.png" title="Ploygon Chain" />
                <span className="price">
                  {isToFixed
                    ? isFloat(price)
                      ? price.toFixed(4)
                      : price
                    : price}
                </span>
              </Fragment>
            ) : (
              <Fragment>
                <img src="/assets/icons/polygon.png" title="Ploygon Chain" />
                <span className="price">--</span>
              </Fragment>
            )}
          </Fragment>
        );
    }
  }
  return (
    <Style secondaryDesign={secondaryDesign}>
      <Fragment>{renderFarm()}</Fragment>
    </Style>
  );
}


