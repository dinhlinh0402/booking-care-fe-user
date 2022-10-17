import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Portal from "@mui/material/Portal";

function SpecialistFrom({ detail }) {
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div className="introduce">
      <Container className="container">
        <Box>
          <p className="specialist-name">{detail?.name}</p>
          <p>{detail?.description}</p>
        </Box>
        {/* <p>Danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:</p>
            {show ? (
                <Portal container={container.current}>
                <ul>
                    <li>Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm</li>
                    <li>Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội</li>
                    <li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.</li>
                    <li>Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,...</li>
                    <li>Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...</li>
                </ul>

                <p>Bệnh Cơ Xương Khớp</p>
                <ul>
                    <li>Gout</li>
                    <li>Thoái hóa khớp: khớp gối, cột sống thắt lưng, cột sống cổ</li>
                    <li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.</li>
                    <li>Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,...</li>
                    <li>Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...</li>
                </ul>
                </Portal>
            ) : null}
            </Box>
            <Box ref={container} />
        <button className='btn-more' type="button" onClick={handleClick}>
            {show ? 'Ẩn bớt' : 'Đọc thêm'}
        </button> */}
      </Container>
    </div>
  );
}

export default SpecialistFrom;
