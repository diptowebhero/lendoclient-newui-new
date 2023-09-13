import { Fragment, useCallback, useState } from "react";
import { AutoComplete, Input, Spin } from "antd";
import { useTranslation } from "next-i18next";
import { SearchOutlined } from "@ant-design/icons";
import Style from "./style";
import Link from "next/link";
import AvatarWithVerified from "@src/components/avatarWithVerify";
import { useRouter } from "next/router";
import {
  ROUTE_SEARCH,
  ROUTE_SINGLE_ASSET,
  ROUTE_SINGLE_COLLECTION,
} from "@src/routes";
import { getRequest } from "@src/helpers/api";
import { API_URL_SUGGEST_SEARCH } from "./const";
import { debounce } from "lodash";

export default function AutoCompleteSearch({ isHome }) {
  const [t, i18n] = useTranslation("common");
  const router = useRouter();
  const [value, setValue] = useState("");
  const [collections, setCollections] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  function renderTitle(title) {
    return <span>{title}</span>;
  }

  function renderItem(items, type) {
    return items.map(item => {
      const { _source, _id } = item;
      const { id, name, image, verified, slug = "" } = _source;
      return {
        value: name,
        label: (
          <Link
            prefetch={false}
            href={
              type === "collection"
                ? ROUTE_SINGLE_COLLECTION.replace(":slug", slug)
                : ROUTE_SINGLE_ASSET.replace(":slug", slug)
            }
          >
            <a className="render-item">
              <AvatarWithVerified
                avatarSize={26}
                image={image}
                title={name}
                verified={verified}
              />
              <span>{name}</span>
            </a>
          </Link>
        ),
        key: id,
      };
    });
  }

  const options = [
    {
      label: renderTitle("Collections"),
      options: renderItem(collections, "collection"),
    },
    {
      label: renderTitle("NFTs"),
      options: renderItem(nfts, "item"),
    },
    // {
    //   label: renderTitle("Accounts"),
    //   options: renderItem(accounts, "account"),
    // },
  ];
  const debouncedSearch = useCallback(
    debounce(nextValue => onSearch(nextValue), 1000),
    [] // will be created only once initially
  );
  const onSearch = async searchText => {
    setValue(searchText);
    if (searchText.length >= 3) {
      setLoading(true);
      const response = await getRequest(API_URL_SUGGEST_SEARCH, {
        input: searchText,
      });
      setCollections(!searchText ? [] : response.data.data.collection);
      setNfts(!searchText ? [] : response.data.data.item);
      setLoading(false);
    }
    if (searchText.length === 0) {
      setCollections([]);
      setNfts([]);
    }
  };

  function onEnter(e) {
    if (e.key === "Enter")
      router.replace({
        pathname: `${ROUTE_SEARCH}`,
        query: { input: encodeURIComponent(value) },
      });
  }

  return (
    <Style isHome={isHome}>
      <div className="search">
        <AutoComplete
          dropdownRender={menu => {
            if (loading) {
              return (
                <div className="loading">
                  <Spin />
                </div>
              );
            } else {
              return (
                <Fragment>
                  {menu}
                  <div className="footer">
                    <a href="#">{t("Press enter to search all items")}</a>
                  </div>
                </Fragment>
              );
            }
          }}
          popupClassName="search-dropdown"
          options={options}
          onSearch={onSearch}
          defaultActiveFirstOption={false}
          onInputKeyDown={onEnter}
          allowClear
        >
          <Input
            // size="large"
            prefix={<SearchOutlined />}
            placeholder={t("Search items and collections")}
          />
        </AutoComplete>
      </div>
    </Style>
  );
}

