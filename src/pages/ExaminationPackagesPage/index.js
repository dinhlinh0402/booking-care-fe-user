import { Box, List, ListItem, ListItemText, Link } from "@mui/material";
import React from "react";

const ExaminationPackagesPage = () => {
  return (
    <Box bgcolor="#F5F5F5">
      <Box bgcolor="#FFFFFF" sx={{ mt: 1, width: "100%" }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            p: 0,
            maxHeight: "650px",
          }}
        >
          {examinationPackages.map((packages) => (
            <ListItem
              key={packages.id}
              sx={{
                pt: 2,
                pb: 1,
                display: "flex",
                borderBottom: "1.5px #F1F1F1 solid",
                "&:first-child": {
                  pt: 0,
                },
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
              component="Box"
            >
              <Link href={packages.url}>
                <img
                  src={packages.imageURL}
                  alt={packages.name}
                  width={100}
                  height={50}
                />
              </Link>
              <Link
                href={packages.url}
                underline="none"
                color="#333333"
                sx={{
                  display: "flex",
                  alignSelf: "flex-start",
                  mx: 1.5,
                }}
              >
                <ListItemText>{packages.name}</ListItemText>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

const examinationPackages = [
  {
    id: "1",
    name: "Cơ bản",
    imageURL:
      "https://cdn.bookingcare.vn/fr/w200/2018/06/12/113345goi-kham-co-b.jpg",
    url: "/",
  },
  {
    id: "2",
    name: "Nâng cao",
    imageURL:
      "https://cdn.bookingcare.vn/fr/w200/2018/06/12/113606goi-kham-nang-cao.jpg",
    url: "/",
  },
  {
    id: "3",
    name: "Nam",
    imageURL: "https://cdn.bookingcare.vn/fr/w200/2018/05/21/155354men.jpg",
    url: "/",
  },
  {
    id: "4",
    name: "Nữ",
    imageURL: "https://cdn.bookingcare.vn/fr/w200/2018/05/21/155338woman.jpg",
    url: "/",
  },
  {
    id: "5",
    name: "Trẻ em",
    imageURL: "https://cdn.bookingcare.vn/fr/w200/2018/05/21/155249baby.jpg",
    url: "/",
  },
  {
    id: "6",
    name: "Người già",
    imageURL: "https://cdn.bookingcare.vn/fr/w200/2018/05/21/155222old.jpg",
    url: "/",
  },
  {
    id: "7",
    name: "Tiền hôn nhân",
    imageURL: "https://cdn.bookingcare.vn/fr/w200/2018/05/21/155207love.jpg",
    url: "/",
  },
  {
    id: "8",
    name: "Tầm soát ung thư",
    imageURL:
      "https://cdn.bookingcare.vn/fr/w200/2018/06/12/115138tam-soat-ung-thu.jpg",
    url: "/",
  },
  {
    id: "9",
    name: "Tầm soát ung thư vú",
    imageURL:
      "https://cdn.bookingcare.vn/fr/w200/2018/06/12/104851ung-thu-v.jpg",
    url: "/",
  },
];
export default ExaminationPackagesPage;
