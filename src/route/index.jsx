import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import ForFamily from "@/pages/for-family.jsx";
import ForNannies from "../pages/for-nannies";
import Dashboard from "@/pages/dashboard/dashoard";
import Help from "@/pages/help/help";
import NannyPayroll from "../pages/service/nanny-payroll";
import AuthSignUp from "../pages/auth/sign-up";
import AuthSignIn from "../pages/auth/sign-in";
import Welcome from "../pages/dashboard/welcome";
import NannyShare from "../pages/nanny-share";
import NannyBackgroundCheck from "../pages/service/nanny-backgroundcheck";
import NannyContracts from "../pages/service/nanny-contracts";
import NannyPlusmember from "../pages/service/nanny-plusmember";
import Request from "../pages/request/request";
import Packages from "../component/auth/packages/packages";
import { useSelector } from "react-redux";
import NotFound from "../pages/not-found";

export default function AppRoutes() {
  const isActive = useSelector((state) => state?.user?.isActive);
  console.log(isActive);

  return (
    <>
      <Routes>
        <Route path="/" element={<ForFamily />} />
        <Route path="/for-nannies" element={<ForNannies />} />
        <Route path="/nanny-share" element={<NannyShare />} />
        <Route path="/service/nanny-payroll" element={<NannyPayroll />} />
        <Route
          path="/service/nanny-background-check"
          element={<NannyBackgroundCheck />}
        />
        <Route path="/service/nanny-contracts" element={<NannyContracts />} />
        <Route
          path="/service/nanny-plus-member"
          element={<NannyPlusmember />}
        />
        <Route path="/help" element={<Help />} />
        <Route path="/request" element={<Request />} />
        <Route path="/package" element={<Packages />} />
        <Route path="/auth/sign-in" element={<AuthSignIn />} />
        <Route path="/auth/sign-up" element={<AuthSignUp />} />
        {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
        <Route
          path="/dashboard/*"
          element={isActive === true && <Dashboard />}
        />
        <Route
          path="/welcome-dashboard"
          element={isActive === true && <Welcome />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
