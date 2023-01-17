import React from "react";
import Box from "@mui/material/Box";
import Portal from "@mui/material/Portal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ShowFormWrapper } from "../styled";

function ShowPriceList({ detail }) {
  const [showPL, setShowPL] = React.useState(false);

  const containerPL = React.useRef(null);

  const handleClickPL = () => {
    setShowPL(!showPL);
  };

  return (
    <ShowFormWrapper>
      <div className="booking-wp">
        <div className="content">
          <p className="title">Giá khám:</p>
          {showPL ? null : (
            <div className="btn-show">
              <p className="price-txt">
                {detail?.doctorInfor?.price.toLocaleString("it-IT")} đ
              </p>
              {/* <button
                className="btn-more"
                type="button"
                onClick={handleClickPL}
              >
                Xem chi tiết
              </button> */}
            </div>
          )}
        </div>

        <div className="show">
          {showPL ? (
            <Portal container={containerPL.current}>
              <TableContainer component={Paper} sx={{ mt: 1, mb: 1 }}>
                <Table
                  sx={{ minWidth: 400, backgroundColor: "#f8f8f8" }}
                  aria-label="a dense table"
                >
                  <TableBody sx={{ padding: 0 }}>
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ padding: 1 }}>
                        <p className="title-show">Bảo hiểm Y tế nhà nước</p>
                        <p className="subtitle-show">Không áp dụng</p>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ padding: 1 }}>
                        <p className="price">
                          {detail?.doctorInfor?.price.toLocaleString("en-US")}đ
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ padding: 1 }}>
                        <p className="title-show">Xét nghiệm công thức máu</p>
                        <p className="subtitle-show">
                          Theo chỉ định của bác sĩ
                        </p>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ padding: 1 }}>
                        <p className="price">
                          {detail?.doctorInfor?.price.toLocaleString("en-US")}đ
                        </p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <p className="title">Giá dịch vụ liên quan:</p>
              <TableContainer component={Paper} sx={{ mt: 1, mb: 1 }}>
                <Table
                  sx={{ minWidth: 400, backgroundColor: "#f8f8f8" }}
                  aria-label="a dense table"
                >
                  <TableBody sx={{ padding: 0 }}>
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ padding: 1 }}>
                        <p className="title-show">Bảo hiểm Y tế nhà nước</p>
                        <p className="subtitle-show">Không áp dụng</p>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ padding: 1 }}>
                        <p className="price">500.000đ</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ padding: 1 }}>
                        <p className="title-show">Xét nghiệm công thức máu</p>
                        <p className="subtitle-show">
                          Theo chỉ định của bác sĩ
                        </p>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ padding: 1 }}>
                        <p className="price">500.000đ</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <button
                className="btn-more"
                type="button"
                onClick={handleClickPL}
              >
                Ẩn bảng giá
              </button>
            </Portal>
          ) : null}
          <Box ref={containerPL} />
        </div>
      </div>
    </ShowFormWrapper>
  );
}

export default ShowPriceList;
