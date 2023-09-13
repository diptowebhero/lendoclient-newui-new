import React, { Fragment } from "react";
import StateLessModal from "@src/components/statelessModal";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Web3ModalContainer from "@src/containers/web3modal";
import MetaMaskCard from "./walletCards/metamask";
import { ROUTE_PRIVACY, ROUTE_TERMS } from "@src/routes";



export default function WalletModal() {
  const [t, i18n] = useTranslation("common");
  const web3ModalContext = Web3ModalContainer.useContainer();
  function renderFarm() {
    return (
      <Fragment>
        <p className="desc">
          {t(
            "By connecting your wallet, you agree to our Terms of Service and our Privacy Policy."
          )}
        </p>
        <div className="wallet-items">
          <ul>
            <MetaMaskCard />
          </ul>
        </div>
        <div className="more-links">
          <ul>
            <li>
              <Link href="#">
                <a target="_blank" rel="noreferrer">
                  {t("Learn about wallets")}
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="more-links">
          <ul>
            <li>
              <Link href={ROUTE_TERMS} prefetch={false}>
                <a target="_blank" rel="noreferrer">
                  {t("Terms of Service")}
                </a>
              </Link>
            </li>
            <li>
              <Link href={ROUTE_PRIVACY} prefetch={false}>
                <a target="_blank" rel="noreferrer">
                  {t("Privacy Policy")}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }

  return (
    <StateLessModal
      className="wallet-connect-modal"
      visibleStatus={web3ModalContext.open}
      onClose={() => web3ModalContext.set(false)}
      footer={null}
      title="Select a wallet"
      titleImage="/assets/icons/user-walllet-connect-modal.svg"
      width={440}
      destroyOnClose={true}
    >
      {renderFarm()}
    </StateLessModal>
  );
}


