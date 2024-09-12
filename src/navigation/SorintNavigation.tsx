import React from "react";
import SircleLeader from "@pages/sorint/SircleLeader";
import TalentHandler from "@pages/sorint/TalentHandler";
import { Outlet, Routes, Route, Navigate } from "react-router-dom";

const SorintNavigation: React.FC = () => (
  <>
    <Routes>
      <Route path="/" element={<Navigate to="sircleleader" replace />} />
      <Route path="sircleleader" element={<SircleLeader />} />
      <Route path="talentHandler" element={<TalentHandler />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
    <Outlet />
  </>
);

export default SorintNavigation;
