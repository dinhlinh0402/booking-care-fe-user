import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import CssBaseline from '@mui/material/CssBaseline';

const Layout = () => {
  return (
    <React.Fragment>
    <CssBaseline />
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
