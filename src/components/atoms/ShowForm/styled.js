import styled from "styled-components";

const ShowFormWrapper = styled.div`
  .booking-wp {
    background-color: #ffffff;
    line-height: 25px;
    border-bottom: 1px #eee solid;
    padding: 10px 0px 10px 0px;

    .content {
      display: flex;
      font-size: 14px;
      background-color: #ffffff;
      padding: 0;
      margin: 0;

      .title {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
        color: #666;
        padding: 0;
        margin: 0;
      }

      .btn-show {
        display: flex;

        .price-txt {
          font-size: 14px;
          background-color: #ffffff;
          padding: 0;
          margin: 0;
          margin-left: 5px;
        }
      }
    }

    .show {
      .title {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
        color: #666;
        padding: 0;
        margin: 0;
      }

      .title-show {
        margin: 0;
        padding: 0;
        font-size: 14px;
        color: black;
      }

      .subtitle-show {
        margin: 0;
        font-size: 12px;
        color: #666;
      }

      .price {
        font-size: 14px;
        padding: 0;
        margin: 0;
        text-align: right;
      }
    }

    .btn-more {
      border: none;
      background-color: #ffffff;
      color: #45c3d2;
    }
  }
`;

export { ShowFormWrapper };
