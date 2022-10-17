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
          <Route
            path="Admin"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
