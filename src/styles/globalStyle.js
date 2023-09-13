import { createGlobalStyle } from "styled-components";
import mediaQuery from "./MediaQuery";

const styled = { createGlobalStyle };

export const GlobalStyle = styled.createGlobalStyle`
  link[rel="manifest"] {
    --pwacompat-splash-font: Roboto;
  }
  /* BEGIN Regular */
  @font-face {
    font-family: Roboto;
    src: url("/assets/fonts/roboto/Regular/Roboto-Regular.woff2?v=2.137")
        format("woff2"),
      url("/assets/fonts/roboto/Regular/Roboto-Regular.woff?v=2.137")
        format("woff");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: Roboto;
    src: url("/assets/fonts/roboto/Regular/Roboto-Regular.woff2?v=2.137")
        format("woff2"),
      url("/assets/fonts/roboto/Regular/Roboto-Regular.woff?v=2.137")
        format("woff");
    font-weight: normal;
    font-style: normal;
  }
  /* END Regular */
  /* BEGIN Medium */
  @font-face {
    font-family: Roboto;
    src: url("/assets/fonts/roboto/Medium/Roboto-Medium.woff2?v=2.137")
        format("woff2"),
      url("/assets/fonts/roboto/Medium/Roboto-Medium.woff?v=2.137")
        format("woff");
    font-weight: 500;
    font-style: normal;
  }
  /* END Medium */
  /* BEGIN Bold */
  @font-face {
    font-family: Roboto;
    src: url("/assets/fonts/roboto/Bold/Roboto-Bold.woff2?v=2.137")
        format("woff2"),
      url("/assets/fonts/roboto/Bold/Roboto-Bold.woff?v=2.137") format("woff");
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: Roboto;
    src: url("/assets/fonts/roboto/Bold/Roboto-Bold.woff2?v=2.137")
        format("woff2"),
      url("/assets/fonts/roboto/Bold/Roboto-Bold.woff?v=2.137") format("woff");
    font-weight: bold;
    font-style: normal;
  }
  /* END Bold */
  /* BEGIN Black */
  @font-face {
    font-family: Roboto;
    src: url("/assets/fonts/roboto/Black/Roboto-Black.woff2?v=2.137")
        format("woff2"),
      url("/assets/fonts/roboto/Black/Roboto-Black.woff?v=2.137") format("woff");
    font-weight: 900;
    font-style: normal;
  }
  /* END Black */

  html {
    font-size: 16px;
  }
  #__next {
    overflow-x: hidden;
    width: 100%;
  }
  body {
    font-family: Roboto, sans-serif;
    overflow-x: hidden;
    background: ${props => props.theme.colors.mainBackground};
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 900;
    line-height: 1;
  }
  p {
    font-size: 1rem;
  }
  .content-style {
    p {
      color: ${props => props.theme.colors.gray};
    }
  }
  .container {
    max-width: 1280px;
    margin: 0 auto;
    z-index: 100;
    position: relative;
    padding: 0 20px;
  }
  .container-full {
    width: 100%;
    z-index: 100;
    position: relative;
    padding: 0 20px;
  }
  .container-content {
    max-width: 850px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .text-center {
    text-align: center;
  }
  .position-abs {
    position: absolute;
  }
  .position-rel {
    position: relative;
  }
  .title-page {
    font-size: 5.18rem;
    ${mediaQuery.lg`
    font-size: 4rem;
    `}
    ${mediaQuery.lt`
    font-size: 3rem;
    `}
    ${mediaQuery.xs`
    font-size: 2.5rem;
    `}
    span {
      color: ${props => props.theme.colors.black};
      &:nth-child(2) {
        color: ${props => props.theme.colors.primary};
      }
    }
  }
  .title-section-page {
    font-size: 2.5rem;
    ${mediaQuery.lg`
    font-size: 2.2rem;
    `}
    ${mediaQuery.lt`
    font-size: 2rem;
    `}
    ${mediaQuery.xs`
    font-size: 1.8rem;
    `}
  }
  .img-max-width-100 {
    max-width: 100%;
    height: auto;
  }

  .right-float {
    float: right;
  }
  .gray-link,
  .gray-link * {
    color: ${props => props.theme.colors.grayLink};
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
  .gray-link svg {
    transition: all 0.3s;
    &:hover {
      fill: ${props => props.theme.colors.primary};
    }
  }
  .pipe-shape {
    position: relative;
    .shape {
      position: absolute;
      width: 100%;
      left: 0;
      transform: matrix(0.99, -0.12, 0.12, 0.99, 0, 0);
      top: 84px;
    }
  }
  .center-pipe-shape {
    position: relative;
    .shape {
      position: absolute;
      width: 100%;
      left: 0;
      transform: matrix(0.99, -0.12, 0.12, 0.99, 0, 0) translateY(-50%);
      top: 50%;
    }
  }
  .pipe-shape-bottom {
    position: relative;
    .shape {
      position: absolute;
      width: 100%;
      left: 0;
      transform: matrix(0.99, -0.12, 0.12, 0.99, 0, 0);
      top: 0;
    }
  }
  .padding-section {
    padding: 40px 0 80px 0;
  }
  .pt10 {
    padding-top: 10px;
  }
  .pb10 {
    padding-top: 10px;
  }
  .pt20 {
    padding-top: 20px;
  }
  .pb20 {
    padding-bottom: 20px;
  }
  .pt30 {
    padding-top: 30px;
  }
  .pb30 {
    padding-bottom: 30px;
  }
  .pt40 {
    padding-top: 40px;
  }
  .pb40 {
    padding-bottom: 40px;
  }
  .pt60 {
    padding-top: 60px;
  }
  .pb60 {
    padding-bottom: 60px;
  }
  .modal-title {
    display: flex;
    grid-gap: 10px;
    align-items: center;
    h2 {
      margin: 0;
      font-size: 1.1rem;
    }
  }
  .account-balance-wallet-drawer {
    .user-avatar {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid ${props => props.theme.colors.borderColor};
      justify-content: space-between;
      .content {
        display: flex;
        align-items: center;
        gap: 10px;
        img {
          width: 35px;
          height: 35px;
          object-fit: cover;
          border-radius: 50%;
        }
        .details {
          .ant-typography {
            margin: 0;
          }
          .username {
            display: block;
            color: ${props => props.theme.colors.white};
            text-transform: capitalize;
            font-weight: bold;
            font-size: 1rem;
          }
          .public-address {
            color: ${props => props.theme.colors.gray};
            font-size: 0.9rem;
          }
        }
      }
      .arrow-bottom {
        cursor: pointer;
      }
    }
    .balance-box {
      border: 1px solid ${props => props.theme.colors.borderColor};
      border-radius: 7px;
      text-align: center;
      padding: 40px 10px 10px 10px;
      margin-top: 20px;
      p {
        margin: 0;
        color: ${props => props.theme.colors.gray};
      }
      h5 {
        font-size: 2rem;
        margin: 0;
        color:white;
      }
      .ant-btn-primary.ant-btn-lg {
        border-radius: 6px;
        margin-top: 30px;
      }
    }
  }
  .add-funds-modal {
    img {
      width: 150px;
      height: auto;
      display: block;
      margin: 0 auto;
    }
    p {
      text-align: center;
      color: ${props => props.theme.colors.gray};
    }
    /* .ant-input-lg {
      padding: 11.5px 11px;
    } */
    .ant-form-item.input-section {
      flex: 1 1 20px;
    }
    .ant-form-item.button-section {
      flex: 0 0 auto;
    }
  }
  .ant-modal-header {
    padding: 20px 24px;
  }
  .wallet-connect-modal {
    .desc {
      font-size: 0.9rem;
      color: ${props => props.theme.colors.gray};
    }
    .connecting {
      .logo {
        max-width: 150px;
      }
      .provider {
        max-width: 150px;
      }
    }
    .wallet-items {
      margin: 1rem 0;
      ul {
        display: flex;
        flex-direction: column;
        grid-gap: 10px;
        justify-content: center;
        justify-items: center;
        align-items: center;
        li {
          padding: 0 10px;
          border-radius: 7px;
          min-height: 42px;
          display: flex;
          transition: ${props => props.theme.transitions.defaultTransition};
          border: 1px solid rgba(0, 0, 0, 0.2);
          width: 100%;
          pointer-events: all;
          color: #000;
          cursor: pointer;
          .content {
            width: 100%;
            align-items: center;
            justify-content: flex-start;
            display: flex;
            grid-gap: 10px;
            img {
              max-width: 30px;
              height: auto;
            }
          }
          &.metamask {
            &:hover {
            }
          }
          &:hover {
            background: ${props => props.theme.colors.secondaryBackground};
          }
        }
      }
    }
    .more-links {
      text-align: center;
      ul {
        display: flex;
        justify-content: center;
        grid-gap: 20px;
        li {
          a {
            font-weight: 500;
            display: block;
            margin-top: 5px;
          }
        }
      }
    }
    .wallet-connecting {
      .connecting {
        background: ${props => props.theme.colors.secondaryBackground};
        padding: 20px;
        border-radius: ${props => props.theme.borderRadius.defaultBorderRadius};
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      p {
        text-align: center;
      }
    }
  }
  .mobile-menu-drawer {
    .ant-drawer-header {
      padding: 20px 24px;
    }
    .ant-drawer-header-title {
      flex-direction: row-reverse;
      .ant-drawer-title {
        img {
          max-width: 200px;
        }
      }
    }
    .ant-drawer-close {
      margin: 0;
    }
    .content {
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      flex: 1 1 0%;
      display: flex;
      height: 100%;
      .metamask-note {
        display: block;
        text-align: center;
        text-transform: capitalize;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .menu {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        li {
          a {
            display: block;
            color: #000;
            font-size: 2.5rem;
            letter-spacing: -1px;
            line-height: 1.2;
            font-weight: 500;
            text-transform: capitalize;
          }
        }
      }
    }
  }
  .page-title {
    margin: 0;
    font-size: 2rem;
    text-transform: capitalize;
  }
  .page-description {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: 2rem;
    gap: 5px;
    p {
      margin: 0;
    }
    .anticon {
      cursor: pointer;
      color: ${props => props.theme.colors.gray};
    }
  }
  .flex-inline {
    display: flex;
    align-items: center;
    grid-gap: 10px;
  }
  .ant-pagination {
    text-align: center;
  }
  .search-dropdown {
    .render-item {
      display: flex;
      grid-gap: 10px;
      color: #000;
      border-bottom: 1px solid #ececed;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .ant-select-item-group ~ .ant-select-item-option:last-child {
      border-bottom: 1px solid transparent;
    }
    .loading {
      text-align: center;
      padding: 40px 0;
    }

    .ant-select-item-group {
      color: #000;
      font-weight: 500;
      font-size: 1rem;
      padding: 15px;
    }
    .ant-select-item-option {
      margin: 0;
      padding-top: 0;
      padding-bottom: 0;
      .render-item {
        display: flex;
        grid-gap: 10px;
        color: #000;
        padding: 10px 0px;
        border-bottom: 1px solid #ececed;
        align-items: center;
        a {
        }
      }
      &:last-child,
      &:nth-of-type(4),
      &:nth-of-type(8) {
        .render-item {
          border-bottom: 1px solid transparent;
        }
      }
    }

    .footer {
      padding: 5px 12px;
      border-top: 1px solid #ececed;
      a {
        color: #898989;
        display: block;
      }
    }
  }

  .img-center {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
  .form {
    .label-form {
      font-weight: 500;
      font-size: 1.1rem;
      text-transform: capitalize;
    }
    .no-space {
      margin: 0;
    }
    .ant-upload-list-text-container,
    .ant-upload-list-picture-container {
      transition: none;
    }
    .ant-upload-list {
      .ant-upload-animate-leave {
        display: none !important;
      }
    }
    .table-list {
      width: 100%;

      table {
        width: 100%;
        td {
          padding: 5px 3px;
        }
      }
    }
    .remove-btn {
      font-size: 20px;
      color: ${props => props.theme.colors.gray};
      display: block;
    }
    .ant-input-affix-wrapper-lg {
      font-size: inherit;
    }
    hr {
      border-color: ${props => props.theme.colors.borderColor};
      margin-bottom: 2rem;
      margin-top: 2rem;
    }
    button[type="submit"] {
      margin-top: 2rem;
    }
    .ant-select {
      text-transform: capitalize;
      .option-with-icon {
        display: flex;
        align-items: center;
        gap: 5px;
        img {
          width: 24px;
          height: auto;
        }
        span {
        }
      }
    }
    .ant-form-item-extra {
      order: -2;
      display: flex;
      padding-bottom: 10px;
      flex-direction: column;
    }
    .ant-input-prefix {
      font-size: 0.9rem;
      color: ${props => props.theme.colors.gray};
      font-weight: 100;
    }
    .no-space-with-text-prefix {
      .ant-input.ant-input-lg {
        padding-left: 0;
      }
    }
    /* .ant-input-affix-wrapper-lg {
      padding: 0 11px;
    } */
    /* .title {
      margin-bottom: 2rem;
      font-weight: 500;
      font-size: 2.2rem;
    } */
    .label-title {
      font-weight: bold;
      color: #000;
      margin-bottom: 0;
    }
    p.description {
      font-size: 0.8rem;
      color: ${props => props.theme.colors.gray};
    }
    .two-colomn {
      .ant-form-item-control {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 50px;
      }

      .ant-form-item-extra {
        display: block;
        .description {
          margin: 0;
        }
      }
      &.without-antd {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 50px;
      }
    }

    .ant-form-item {
      .ant-input,
      .ant-select {
        font-size: 0.9rem;
        color: ${props => props.theme.colors.gray};
        font-weight: 100;
      }
      .ant-form-item-label {
        label {
          font-weight: 500;
          font-size: 1.1rem;
          text-transform: capitalize;
        }
      }
      /* .ant-input-lg {
        padding: 12px 11px;
      } */
      &.half-mb-space {
        margin-bottom: 12px;
      }
      &.no-space {
        margin: 0;
      }
    }
  }
  .form-medium {
    max-width: 400px;
  }
  .from-big {
    max-width: 450px;
  }
  .form-center-size {
    width: 464px;
    max-width: 100%;
    margin: 0 auto;
  }
  .form-medium,
  .form-big {
    ${mediaQuery.md`
        width: 100%;
        max-width: 100%;
      `}
  }
  .purchaseModal {
    .header-summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .purchaseDetailSummary {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid ${props => props.theme.colors.gray};
      border-bottom: 1px solid ${props => props.theme.colors.gray};
      padding: 20px 0;
      margin: 10px 0;
      .info {
        display: flex;
        align-items: center;
        gap: 10px;

        .item-file {
          img {
          }
        }
        .item-detail {
          display: flex;
          flex-direction: column;
          .item-name {
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 1.2;
          }
          .item-quantity {
            color: ${props => props.theme.colors.gray};
          }
        }
      }
      .total {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        gap: 5px;
        .price-network {
        }
        .price-usd {
          color: ${props => props.theme.colors.gray};
        }
      }
    }
    .offer-information {
      ul.balance-information {
        padding: 10px;
        border-radius: 10px;
        border: 1px solid rgb(229, 232, 235);
        margin: 15px 0;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 0;

          .title {
            font-weight: 500;
          }
          .value {
          }
        }
      }
    }
  }
  .nft-filter {
    .filter-box {
      .ant-select-single.ant-select-lg:not(.ant-select-customize-input)
        .ant-select-selector,
      .ant-btn-icon-only.ant-btn-lg {
        height: 47.6px;
      }
      .ant-form-item {
        margin: 0;
      }
      .filter-toggle {
        width: 40px;
        height: 40px;
        border: 1px solid ${props => props.theme.colors.gray};
        border-radius: ${props => props.theme.borderRadius.defaultBorderRadius};
        position: relative;
        cursor: pointer;
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 16px;
        }
        &:hover {
          border-color: ${props => props.theme.colors.primary};
        }
      }
    }
  }
  .sort-filter-section {
    .filter-toggle {
      font-size: 1rem;
      border: 1px solid ${props => props.theme.colors.borderColor};
      border-radius: ${props => props.theme.borderRadius.defaultBorderRadius};
      transition: ${props => props.theme.transitions.defaultTransition};
      width: 40px;
      height: 40px;
      position: relative;
      cursor: pointer;
      svg {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      &:hover {
        background: ${props => props.theme.colors.primary};
        color: #fff;
      }
    }
    .sorting {
      .ant-select {
        width: 216px;
      }
    }
  }
  //antd
  .ant-list-items {
    .ant-list-item {
      .ant-list-item-meta {
        align-items: center;
        .ant-list-item-meta-avatar {
          margin-right: 15px;
          .avatar {
            img {
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .change-network-message {
    cursor: pointer;
  }
  .ant-tooltip-inner {
    text-align: center;
  }
  .ant-btn {
    &.white {
      background: #fff;
    }
  }
  .ant-btn {
    &.ant-btn-sm {
      height: 35px;
      padding: 6px 15px;
    }
    &.ant-btn-default {
      color: ${props => props.theme.colors.primary};
      border-color: ${props => props.theme.colors.primary};
      &:hover {
        background: #fff;
      }
    }
    &.default {
      color: ${props => props.theme.colors.primary};
      border-color: #d9d9d9;
      &:hover {
        background: ${props => props.theme.colors.primary};
        color: #fff;
        border-color: #fff;
      }
    }
    &.curve {
      border-radius: 10px;
    }
  }
  .ant-dropdown.big {
    width: 220px;
    ul {
      margin: 0;
      padding: 0;
      li {
        padding: 10px;
        border-radius: ${props => props.theme.borderRadius.defaultBorderRadius};
      }
    }

    * {
      font-size: 1rem;
      text-transform: capitalize;
    }
  }
  .ant-select-dropdown {
    border-radius: 10px;
    .ant-select-item-option-content {
      /* text-transform: uppercase; */
    }
  }
  .ant-select-selection-placeholder {
    color: ${props => props.theme.colors.gray};
  }
  .ant-input {
    border-radius: 9px;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: ${props => props.theme.borderRadius.inputRadius};
  }
  .filter-drawer {
    background: geen;
    &.first-hide {
      display: none;
    }
    .ant-drawer-header {
      padding: 15px 24px;
      .ant-drawer-close {
        border: 1px solid ${props => props.theme.colors.gray};
        border-radius: 10px;
        padding: 15px;
      }
    }
    .ant-collapse-item {
      .ant-collapse-header {
        .anticon {
          svg {
            transform: rotate(90deg) !important;
          }
        }
      }
      &.ant-collapse-item-active {
        .ant-collapse-header {
          .anticon {
            svg {
              transform: rotate(-90deg) !important;
            }
          }
        }
      }
    }
    .filter-list {
      .properties-header {
        display: flex;
        align-items: center;
        gap: 2px;
        span {
          &:last-child {
            font-weight: 100;
            color: ${props => props.theme.colors.gray};
            font-size: 0.9rem;
          }
        }
      }
      .ant-collapse-content > .ant-collapse-content-box {
        padding-right: 0;
        padding-left: 0;
        padding-bottom: 0;
      }
      .ant-checkbox + span {
        padding: 0;
      }
      .ant-form-item {
        margin: 0;
      }
      .ant-collapse-item {
        border-bottom: 1px solid ${props => props.theme.colors.borderColor};
        border-radius: 0 !important;
        padding: 12px 0;
        .ant-collapse-header {
          font-weight: 500;
          text-transform: capitalize;
          font-size: 1.1rem;
          border-radius: 0 !important;
          padding: 0 !important;
          color:white;
          .ant-collapse-arrow {
            right: 0;
          }
        }
        &:last-child {
          border-bottom: 1px solid transparent;
        }
      }
      .ant-checkbox-group,
      .ant-radio-group {
        display: flex;
        flex-direction: column;
        .ant-checkbox-group-item,
        .ant-radio-group-item {
          width: 100%;
        }
        .ant-checkbox-wrapper,
        .ant-radio-wrapper {
          font-size: 1rem;
          padding-bottom: 10px;
          .ant-checkbox + span,
          .ant-radio + span {
            display: flex;
            flex: 1 1 100%;
          }
          .ant-checkbox,
          .ant-radio {
            order: 2;
            justify-content: flex-end;
          }
        }
      }
      .price-filter {
        display: flex;
        grid-gap: 10px;
        align-items: center;
        .ant-form-item {
          margin-bottom: 0;
        }
      }
    }
  }
  /* .ant-dropdown-menu {
    border-radius: 15px;
  } */
  .ant-tabs-top > .ant-tabs-nav .ant-tabs-nav-wrap::after,
  .ant-tabs-bottom > .ant-tabs-nav .ant-tabs-nav-wrap::after,
  .ant-tabs-top > div > .ant-tabs-nav .ant-tabs-nav-wrap::after,
  .ant-tabs-bottom > div > .ant-tabs-nav .ant-tabs-nav-wrap::after {
    box-shadow: none;
  }
  .ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-bottom > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before,
  .ant-tabs-bottom > div > .ant-tabs-nav::before {
    border: none;
  }
  .ant-tabs-ink-bar {
    display: none;
  }
  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0;
  }
  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,
  .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list {
    grid-gap: 10px;
  }
  .ant-tabs-tab {
    border: 2px solid transparent;
    border-radius: ${props => props.theme.borderRadius.inputRadius};
    padding: 10px 15px;
    font-weight: 500;
    color: #a5a5a5;
    text-transform: capitalize;
    transition: ${props => props.theme.transitions.defaultTransition};
    &.ant-tabs-tab-active {
      border-color: #000;
    }
  }
  .double-link {
    ul {
      display: flex;
      border: 1px solid #E46400;
      border-radius: 10px;
      padding: 0 11px;
      li {
        padding: 0 10px;
        position: relative;
        a {
          color: ${props => props.theme.colors.gray};
          text-transform: capitalize;
          display: block;
          padding: 11.5px 0;
          &.active,
          &:hover {
            color: white;
            // color: #000;
          }
        }
        &:first-child {
          &:after {
            content: "";
            position: absolute;
            right: 0;
            width: 1px;
            height: 10px;
            top: 50%;
            transform: translateY(-50%);
            border-right: 1px solid ${props => props.theme.colors.borderColor};
          }
        }
      }
    }
  }
  // swiperjsπP
  .swiper-pointer-events {
    padding: 15px 0px;
    ${mediaQuery.sm`
        padding: 0;
      `}
  }
  @font-face {
    font-family: swiper-icons;
    src: url("data:application/font-woff;charset=utf-8;base64, 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");
    font-weight: 400;
    font-style: normal;
  }
  :root {
    --swiper-theme-color: ${props => props.theme.colors.primary};
  }
  .swiper {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
  }
  .swiper-vertical > .swiper-wrapper {
    flex-direction: column;
  }
  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }
  .swiper-android .swiper-slide,
  .swiper-wrapper {
    transform: translate3d(0px, 0, 0);
  }
  .swiper-pointer-events {
    touch-action: pan-y;
  }
  .swiper-pointer-events.swiper-vertical {
    touch-action: pan-x;
  }
  .swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
  }
  .swiper-slide-invisible-blank {
    visibility: hidden;
  }
  .swiper-autoheight,
  .swiper-autoheight .swiper-slide {
    height: auto;
  }
  .swiper-autoheight .swiper-wrapper {
    align-items: flex-start;
    transition-property: transform, height;
  }
  .swiper-backface-hidden .swiper-slide {
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .swiper-3d,
  .swiper-3d.swiper-css-mode .swiper-wrapper {
    perspective: 1200px;
  }
  .swiper-3d .swiper-cube-shadow,
  .swiper-3d .swiper-slide,
  .swiper-3d .swiper-slide-shadow,
  .swiper-3d .swiper-slide-shadow-bottom,
  .swiper-3d .swiper-slide-shadow-left,
  .swiper-3d .swiper-slide-shadow-right,
  .swiper-3d .swiper-slide-shadow-top,
  .swiper-3d .swiper-wrapper {
    transform-style: preserve-3d;
  }
  .swiper-3d .swiper-slide-shadow,
  .swiper-3d .swiper-slide-shadow-bottom,
  .swiper-3d .swiper-slide-shadow-left,
  .swiper-3d .swiper-slide-shadow-right,
  .swiper-3d .swiper-slide-shadow-top {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
  }
  .swiper-3d .swiper-slide-shadow {
    background: rgba(0, 0, 0, 0.15);
  }
  .swiper-3d .swiper-slide-shadow-left {
    background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );
  }
  .swiper-3d .swiper-slide-shadow-right {
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );
  }
  .swiper-3d .swiper-slide-shadow-top {
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );
  }
  .swiper-3d .swiper-slide-shadow-bottom {
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );
  }
  .swiper-css-mode > .swiper-wrapper {
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .swiper-css-mode > .swiper-wrapper::-webkit-scrollbar {
    display: none;
  }
  .swiper-css-mode > .swiper-wrapper > .swiper-slide {
    scroll-snap-align: start start;
  }
  .swiper-horizontal.swiper-css-mode > .swiper-wrapper {
    scroll-snap-type: x mandatory;
  }
  .swiper-vertical.swiper-css-mode > .swiper-wrapper {
    scroll-snap-type: y mandatory;
  }
  .swiper-centered > .swiper-wrapper::before {
    content: "";
    flex-shrink: 0;
    order: 9999;
  }
  .swiper-centered.swiper-horizontal
    > .swiper-wrapper
    > .swiper-slide:first-child {
    margin-inline-start: var(--swiper-centered-offset-before);
  }
  .swiper-centered.swiper-horizontal > .swiper-wrapper::before {
    height: 100%;
    min-height: 1px;
    width: var(--swiper-centered-offset-after);
  }
  .swiper-centered.swiper-vertical
    > .swiper-wrapper
    > .swiper-slide:first-child {
    margin-block-start: var(--swiper-centered-offset-before);
  }
  .swiper-centered.swiper-vertical > .swiper-wrapper::before {
    width: 100%;
    min-width: 1px;
    height: var(--swiper-centered-offset-after);
  }
  .swiper-centered > .swiper-wrapper > .swiper-slide {
    scroll-snap-align: center center;
  }
  .swiper-cards {
    overflow: visible;
  }
  .swiper-cards .swiper-slide {
    transform-origin: center bottom;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    overflow: hidden;
  }
  .swiper-pagination {
    position: absolute;
    text-align: center;
    transition: 0.3s opacity;
    transform: translate3d(0, 0, 0);
    z-index: 10;
  }
  .swiper-pagination.swiper-pagination-hidden {
    opacity: 0;
  }
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 10px;
    left: 0;
    width: 100%;
  }
  .swiper-pagination-bullets-dynamic {
    overflow: hidden;
    font-size: 0;
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
    transform: scale(0.33);
    position: relative;
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {
    transform: scale(1);
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {
    transform: scale(1);
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
    transform: scale(0.66);
  }
  .swiper-pagination-bullets-dynamic
    .swiper-pagination-bullet-active-prev-prev {
    transform: scale(0.33);
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {
    transform: scale(0.66);
  }
  .swiper-pagination-bullets-dynamic
    .swiper-pagination-bullet-active-next-next {
    transform: scale(0.33);
  }
  .swiper-pagination-bullet {
    width: var(
      --swiper-pagination-bullet-width,
      var(--swiper-pagination-bullet-size, 8px)
    );
    height: var(
      --swiper-pagination-bullet-height,
      var(--swiper-pagination-bullet-size, 8px)
    );
    display: inline-block;
    border-radius: 50%;
    background: var(--swiper-pagination-bullet-inactive-color, #000);
    opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2);
  }
  button.swiper-pagination-bullet {
    border: none;
    margin: 0;
    padding: 0;
    box-shadow: none;
    -webkit-appearance: none;
    appearance: none;
  }
  .swiper-pagination-clickable .swiper-pagination-bullet {
    cursor: pointer;
  }
  .swiper-pagination-bullet:only-child {
    display: none !important;
  }
  .swiper-pagination-bullet-active {
    opacity: var(--swiper-pagination-bullet-opacity, 1);
    background: var(--swiper-pagination-color, var(--swiper-theme-color));
  }
  .swiper-pagination-vertical.swiper-pagination-bullets,
  .swiper-vertical > .swiper-pagination-bullets {
    right: 10px;
    top: 50%;
    transform: translate3d(0px, -50%, 0);
  }
  .swiper-pagination-vertical.swiper-pagination-bullets
    .swiper-pagination-bullet,
  .swiper-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: var(--swiper-pagination-bullet-vertical-gap, 6px) 0;
    display: block;
  }
  .swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,
  .swiper-vertical
    > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
  }
  .swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic
    .swiper-pagination-bullet,
  .swiper-vertical
    > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic
    .swiper-pagination-bullet {
    display: inline-block;
    transition: 0.2s transform, 0.2s top;
  }
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
  .swiper-pagination-horizontal.swiper-pagination-bullets
    .swiper-pagination-bullet {
    margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 4px);
  }
  .swiper-horizontal
    > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic,
  .swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }
  .swiper-horizontal
    > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic
    .swiper-pagination-bullet,
  .swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic
    .swiper-pagination-bullet {
    transition: 0.2s transform, 0.2s left;
  }
  .swiper-horizontal.swiper-rtl
    > .swiper-pagination-bullets-dynamic
    .swiper-pagination-bullet {
    transition: 0.2s transform, 0.2s right;
  }
  .swiper-pagination-progressbar {
    background: rgba(0, 0, 0, 0.25);
    position: absolute;
  }
  .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
    background: var(--swiper-pagination-color, var(--swiper-theme-color));
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: scale(0);
    transform-origin: left top;
  }
  .swiper-rtl
    .swiper-pagination-progressbar
    .swiper-pagination-progressbar-fill {
    transform-origin: right top;
  }
  .swiper-horizontal > .swiper-pagination-progressbar,
  .swiper-pagination-progressbar.swiper-pagination-horizontal,
  .swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite,
  .swiper-vertical
    > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {
    width: 100%;
    height: 4px;
    left: 0;
    top: 0;
  }
  .swiper-horizontal
    > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,
  .swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite,
  .swiper-pagination-progressbar.swiper-pagination-vertical,
  .swiper-vertical > .swiper-pagination-progressbar {
    width: 4px;
    height: 100%;
    left: 0;
    top: 0;
  }
  .swiper-pagination-lock {
    display: none;
  }

  .select_ant{
      display:flex;
      gap:5px;
      align-items: center;
  }
  .ant-drawer-wrapper-body{
    background:#181818;
  }
  .ant-checkbox-wrapper{
    color:#888888;
  }
  .filter-drawer .ant-drawer-header .ant-drawer-close {
    border: 1px solid #E46400; 
    border-radius: 10px;
    padding: 15px;
    background: #E46400;
    color:white ;
  }
  .ant-dropdown-menu-title-content {
    flex: auto;
    color: white;
  }
  .ant-btn.ant-btn-default:hover {
    background: none;
  }
  .ant-dropdown-menu-item:hover{
    background: rgba(172, 172, 172, 0.3);
  }
  .ant-dropdown-menu-item-divider{
    background:#181818;
  }
  .ant-dropdown-menu-item{
    span{
      color:white;
    }
  }
`;

