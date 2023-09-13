import React from "react";
import AvatarWithVerified from "@src/components/avatarWithVerify";
import textDots from "./textDots";
import NetworkIconWithPrice from "@src/components/networkIconWithPrice";
import { truncateAddress } from "./walletConnect/utils.web3";
import { ROUTE_ACCOUNT_OTHERS, ROUTE_SINGLE_ASSET } from "@src/routes";
import Link from "next/link";
import moment from "moment";
import { useTranslation } from "next-i18next";
import NetworkIcon from "@src/components/networkIcon";

export default function useActivityColumns(itHasItem = true, blockChain) {
  const [t, i18n] = useTranslation("common");
  if (itHasItem) {
    return [
      {
        title: t("event"),
        dataIndex: "event",
        key: "event",
      },
      {
        title: t("item"),
        dataIndex: "item",
        key: "item",
        render: ({ name, fileUrl, slug }) => (
          <Link href={ROUTE_SINGLE_ASSET.replace(":slug", slug)}>
            <a className="flex-inline rank-item">
              <AvatarWithVerified
                image={fileUrl}
                title={name}
                verified={false}
              />
              <span>{textDots(name, 30)}</span>
            </a>
          </Link>
        ),
      },
      {
        title: t("blockChain"),
        dataIndex: "blockChain",
        key: "blockChain",
        render: (blockChain, { }) => (
          <NetworkIcon
            blockchain={blockChain}
          />
        ),
      },
      {
        title: t("price"),
        dataIndex: "unitPrice",
        key: "unitPrice",
        render: (unitPrice, { blockChain }) => (
          <NetworkIconWithPrice
            secondaryDesign={true}
            blockchain={blockChain}
            price={unitPrice}
          />
        ),
      },
      {
        title: t("quantity"),
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: t("from"),
        dataIndex: "from",
        key: "from",
        render: (from, { fromPublicAddress, event }) => {
          if (event === "Mint") {
            return (
              <span>{from.length >= 30 ? truncateAddress(from) : from}</span>
            );
          } else {
            return (
              <Link
                href={ROUTE_ACCOUNT_OTHERS.replace(
                  ":username",
                  fromPublicAddress
                )}
                prefetch={false}
              >
                <a>{from.length >= 30 ? truncateAddress(from) : from}</a>
              </Link>
            );
          }
        },
      },
      {
        title: t("to"),
        dataIndex: "to",
        key: "to",
        render: (to, { toPublicAddress, event }) => {
          if (
            event === "List" ||
            event === "Offer" ||
            event === "Cancel" ||
            event === "Auction" ||
            event === "Approve"
          ) {
            return <span>{to.length >= 30 ? truncateAddress(to) : to}</span>;
          } else {
            return (
              <Link
                href={ROUTE_ACCOUNT_OTHERS.replace(
                  ":username",
                  toPublicAddress
                )}
              >
                <a>{to.length >= 30 ? truncateAddress(to) : to}</a>
              </Link>
            );
          }
        },
      },
      {
        title: t("time"),
        dataIndex: "created_at",
        key: "time",
        render: (created_at, { txId }) => (
          <a href={txId} rel="noreferrer" target="_blank">
            {moment(created_at).fromNow()}
          </a>
        ),
      },
    ];
  } else {
  }
  return [
    {
      title: t("event"),
      dataIndex: "event",
      key: "event",
    },

    {
      title: t("price"),
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (unitPrice, { }) => (
        <NetworkIconWithPrice
          secondaryDesign={true}
          blockchain={blockChain}
          price={unitPrice}
        />
      ),
    },
    {
      title: t("quantity"),
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: t("from"),
      dataIndex: "from",
      key: "from",
      render: (from, { fromPublicAddress, event }) => {
        if (event === "Mint") {
          return (
            <span>{from.length >= 30 ? truncateAddress(from) : from}</span>
          );
        } else {
          return (
            <Link
              href={ROUTE_ACCOUNT_OTHERS.replace(
                ":username",
                fromPublicAddress
              )}
            >
              <a>{from.length >= 30 ? truncateAddress(from) : from}</a>
            </Link>
          );
        }
      },
    },
    {
      title: t("to"),
      dataIndex: "to",
      key: "to",
      render: (to, { toPublicAddress, event }) => {
        if (
          event === "List" ||
          event === "Offer" ||
          event === "Cancel" ||
          event === "Auction" ||
          event === "Approve"
        ) {
          return <span>{to.length >= 30 ? truncateAddress(to) : to}</span>;
        } else {
          return (
            <Link
              href={ROUTE_ACCOUNT_OTHERS.replace(":username", toPublicAddress)}
            >
              <a>{to.length >= 30 ? truncateAddress(to) : to}</a>
            </Link>
          );
        }
      },
    },
    {
      title: t("time"),
      dataIndex: "created_at",
      key: "time",
      render: (created_at, { txId }) => (
        <a href={txId} rel="noreferrer" target="_blank">
          {moment(created_at).fromNow()}
        </a>
      ),
    },
  ];
}
