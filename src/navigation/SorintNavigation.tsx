import SircleLeader from 'pages/sorint/SircleLeader';
import {
  Outlet, Routes, Route, Navigate,
} from 'react-router-dom';

const SorintNavigation = () => (
  <>
    <Routes>
      <Route path="/" element={<Navigate to="sircleleader" replace />} />
      <Route path="sircleleader" element={<SircleLeader />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
    <Outlet />
  </>
);

export default SorintNavigation;
