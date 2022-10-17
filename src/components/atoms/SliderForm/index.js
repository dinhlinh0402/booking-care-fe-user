import { Avatar, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";

function SliderForm({ bgcolor, options, label, buttonTitle, itemPerRow }) {
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
    arrows: false,
    speed: 500,
    slidesToShow: width < 500 ? 1 : 4,
    slidesToScroll: width < 500 ? 1 : 4,
  };
  console.log('options: ', options);
  return (
    <Stack
      sx={{
        minHeight: 330,
        py: 3,
        px: width < 500 ? 3 : 8,
        bgcolor: bgcolor,
        borderBottom: "3px solid #efeef5",
      }}
    >
      <Stack pt={3} direction="row">
        <Typography sx={{ flex: 7, fontSize: 24, fontWeight: "bold", pb: 1 }}>
          {label}
        </Typography>
        {buttonTitle.map((item, index) => (
          <Button
            key={index}
            sx={{
              borderRadius: 1,
              flex: 1,
              height: 40,
              maxWidth: '100px',
              background: '#ebebeb',
              color: '#282e41',
              // "&:hover": {
              //   color: "#fff",
              //   // background: 'yellow',
              // }
            }}>
            <Typography sx={{
              fontSize: '12px'
            }}>{item.title}</Typography>
          </Button>
        ))}
      </Stack>
      <Stack sx={{ mt: 5 }}>
        <Slider {...settings}>
          {options.map((option, index) => (
            <Grid
              key={option.id}
              xs={width < 500 ? 12 : 3}
              px={1}
              onDoubleClick={() => {
                alert("navigation");
              }}
            >
              <Stack
                direction="column"
                sx={
                  !!option.work && {
                    alignItems: "center",
                    height: 280,
                    p: 3,
                    border: "1px solid #efeef5",
                  }
                }
              >
                <Avatar
                  sx={
                    !!option.work
                      ? { width: 120, height: 120, cursor: "pointer" }
                      : { height: 128, width: "auto", borderRadius: 0 }
                  }
                  src={option?.image}
                  alt=""
                />
                <Typography
                  py={1}
                  fontSize={13}
                  sx={
                    !!option.work
                      ? { textAlign: "center", "&:hover": { color: "#45c3d2", cursor: "pointer" } }
                      : { "&:hover": { color: "#45c3d2" } }
                  }
                >
                  {option.title}
                </Typography>
                <Typography
                  color="#555"
                  fontSize={12}
                  sx={!!option.work && { textAlign: "center" }}
                >
                  {option.work}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Slider>
      </Stack>
    </Stack>
  );
}

export default SliderForm;
