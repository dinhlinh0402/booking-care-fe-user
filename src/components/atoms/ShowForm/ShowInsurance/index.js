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

function ShowInsurance() {
  const [showBH, setShowBH] = React.useState(false);

  const containerBH = React.useRef(null);

  const handleClickBH = () => {
    setShowBH(!showBH);
  };

  return (
    <ShowFormWrapper>
      <div className="booking-wp">
        <div className="content">
          <p className="title">loại bảo hiểm áp dụng.</p>
          {showBH ? null : (
            <div className="btn-show">
              <button
                className="btn-more"
                type="button"
                onClick={handleClickBH}
              >
                Xem chi tiết
              </button>
            </div>
          )}
        </div>

        <div className="show">
          {showBH ? (
            <Portal container={containerBH.current}>
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
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ padding: 1 }}>
                        <p className="title-show">
                          Bảo hiểm bảo lãnh trực tiếp
                        </p>
                        <p className="subtitle-show">
                          Hiện phòng khám chưa có bảo hiểm bảo lãnh trực tiếp,
                          phòng khám xuất hoá đơn tài chính (hoá đơn đỏ) và hỗ
                          trợ bệnh nhân hoàn thiện hồ sơ
                        </p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <button
                className="btn-more"
                type="button"
                onClick={handleClickBH}
              >
                Thu gọn
              </button>
            </Portal>
          ) : null}
          <Box ref={containerBH} />
        </div>
      </div>
    </ShowFormWrapper>
  );
}

export default ShowInsurance;
