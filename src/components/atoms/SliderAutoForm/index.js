import { Avatar, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";

function SliderAutoForm({ options }) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    //Resize
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    //cleanup fs
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    speed: 500,
    slidesToShow: width < 500 ? 1 : 4,
    slidesToScroll: 1,
  };

  return (
    <Stack
      sx={{
        p: 3,
        bgcolor: "white",
        borderBottom: "3px solid #efeef5",
      }}
    >
      <Stack>
        <Slider {...settings}>
          {options.map((option, index) => (
            <Grid
              key={index}
              xs={3}
              px={3}
              onDoubleClick={() => {
                alert("navigation");
              }}
            >
              <Stack spacing={2}>
                <Avatar
                  sx={{ height: 128, width: "auto", borderRadius: 2 }}
                  src={option.image}
                  alt=""
                />
                <Typography py={1} fontSize={16} fontWeight="bold">
                  {option.title}
                </Typography>
                <ul>
                  {option.info.map((item) => (
                    <li key={item.id} sx={{ fontSize: 10 }}>
                      {item.text}
                    </li>
                  ))}
                </ul>
                <Button>Xem Chi Tiết</Button>
              </Stack>
            </Grid>
          ))}
        </Slider>
      </Stack>
    </Stack>
  );
}

export default SliderAutoForm;
