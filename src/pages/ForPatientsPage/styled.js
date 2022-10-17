import styled from "styled-components";

const BookingWrapper = styled.div`

  .specialist-name{
    font-size: 21px;
    font-weight: bold;
  }

  .introduce{
    padding-top: 10px;
    padding-bottom: 20px;

    .btn-more{
      border: none;
      background-color: #eee;
      padding: 10px 20px 10px 20px;

      :hover{
        background-color: #45c3d2;
        color: white;
      }
    }
  }

  .content{
    background-color: #eeeeee;
    padding: 30px 0 10px 0;

    .form-control{
      width: 150px;
      background-color: white;
      padding: 0;

      .select{
        height: 50px;
        border: none;
      }
    }

    .wrapper{
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding: 10px;
      border-radius: 10px;
      width: 100%;
      background-color: white;

      .wp-left{
        width: 55%;
        display: flex;
        justify-content: space-between;
        border-right: 1px solid #eee;

        .img{
          width: 20%;
          display: flex;
          flex-direction: column;
          align-items: center;

          .link{
            text-decoration-line: none;
            color: #45c3d2;
          }
        }

        .information{
          width: 75%;

          .name{
            font-size: 16px;
            color: #45c3d2;
            font-weight: bold;
            margin: 0;
            padding-bottom: 10px;
          }

          .detail{
            color: #555;
            font-size: 14px;
            margin: 0;
            padding-bottom: 10px;
          }

          .address{
            display: flex;
            color: #555;
            font-size: 14px;
          }
        }
      }

      .wp-right{
        width: 43%;
        display: flex;
        flex-direction: column;

        .calender{
          padding: 10px 0px 0px 0px;
          border-bottom: 1px #eee solid;

          .title{
            display: flex;

            .text{
              padding: 0;
              margin: 0;
              font-weight: 600;
              font-size: 15px;
              padding-left: 5px;
            }
          }

          & > .booking{
            padding: 20px 0px 10px 0px;

            .btn-booking{
              padding: 12px;
              font-weight: 600;
              border: none;
              background-color: #eee;
              text-decoration-line: none;
              color: #000000;
              font-size: 14px;

              :hover{
                color: white;
                background-color: #45c3d2;
              }
            }
          }

          .txt{
            font-size: 13px;
          }
        }

        .booking-address{
          background-color: #ffffff;
          line-height: 25px;
          border-bottom: 1px #eee solid;
          padding: 10px 0px 10px 0px;

          & > .title{
            font-size: 14px;
            font-weight: 600;
            color: #666;
            padding: 0;
            margin: 0;
          }

          & > .content{
            font-size: 14px;
            background-color: #ffffff;
            padding: 0;
            margin: 0;
          }
        }
      }
    }
  }
`

export {BookingWrapper}