import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Admin from "../admin";
import Layout from "../layout/DefaultLayout/index";
import ClinicDetailPage from "../pages/ClinicDetailPage/clinicDetail";
import DepthsListPage from "../pages/DepthsListPage";
import DoctorsListPage from "../pages/DoctorsListPage";
import ExaminationPackagesPage from "../pages/ExaminationPackagesPage";
import FacilitiesPage from "../pages/FacilitiesPage/index";
import ForDoctorsPage from "../pages/ForDoctorPage/index";
import ForPatientsPage from "../pages/ForPatientsPage/index";
import Home from "../pages/Home/index";
import NotFound from "../pages/NotFoundPage/index";
import Bookings from "../user/Bookings";
import ChangePassword from "../user/ChangePassword";
import LoginUser from "../user/login";
import MyAccount from "../user/MyAccount";
import RegisterUser from "../user/register";
import ResetPassword from "../user/ResetPassword";
import RequireAuth from "./AuthRouter";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="DepthsListPage" element={<DepthsListPage />} />
          <Route path="ForPatientsPage/:id" element={<ForPatientsPage />} />
          <Route path="FacilitiesPage" element={<FacilitiesPage />} />
          <Route path="DoctorsListPage" element={<DoctorsListPage />} />
          <Route
            path="ExaminationPackagesPage"
            element={<ExaminationPackagesPage />}
          />
          <Route path="ClinicDetailPage/:id" element={<ClinicDetailPage />} />
          <Route path="ForDoctorsPage/:id" element={<ForDoctorsPage />} />

          {/* <Route
            path="Admin"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          /> */}
          <Route
            path="user/my-account"
            element={
              <RequireAuth>
                <MyAccount />
              </RequireAuth>
            }
          />

          <Route
            path="user/change-password"
            element={
              <RequireAuth>
                <ChangePassword />
              </RequireAuth>
            }
          />
          <Route
            path="user/bookings"
            element={
              <RequireAuth>
                <Bookings />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="login" element={<LoginUser />} />
        <Route path="register" element={<RegisterUser />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;