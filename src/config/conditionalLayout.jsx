"use client";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/component/layout/header";
import Footer from "@/component/layout/footer";
import RequestHeader from "@/component/layout/request-header";

const ConditionalLayout = ({ children }) => {
  const location = useLocation();

  // List of paths where the header should be hidden
  const hideHeaderPaths = [
    "/auth/sign-up",
    "/auth/sign-in",
    "/welcome-dashboard",
    "/dashboard",
    "/dashboard/for-family",
    "/dashboard/for-nanny",
    "/help",
    "/request",
    "/package",
    "/payment-gateway",
  ];

  // List of paths where the footer should be hidden
  const hideFooterPaths = [
    "/auth/sign-up",
    "/auth/sign-in",
    "/welcome-dashboard",
    "/package",
    "/payment-gateway",
  ];

  const showHelpHeader = ["/help", "/request"];

  // Check if the current path is in the list of paths where the header should be hidden
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  // Check if the current path is in the list of paths where the footer should be hidden
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  const shouldShowHelpHeader = showHelpHeader.includes(location.pathname);

  return (
    <>
      {shouldShowHelpHeader && <RequestHeader />}
      {!shouldHideHeader && <Header />}
      {children}
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default ConditionalLayout;
