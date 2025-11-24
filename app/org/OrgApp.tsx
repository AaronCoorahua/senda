import { Routes, Route, Navigate } from 'react-router-dom';
import OrgLayout from './OrgLayout';
import OrgDashboard from './OrgDashboard';
import OrgStudents from './OrgStudents';
import OrgResults from './OrgResults';
import OrgReports from './OrgReports';
import OrgSettings from './OrgSettings';
import OrgSupport from './OrgSupport';

export default function OrgApp() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route element={<OrgLayout />}>
        <Route path="dashboard" element={<OrgDashboard />} />
        <Route path="estudiantes" element={<OrgStudents />} />
        <Route path="resultados" element={<OrgResults />} />
        <Route path="reportes" element={<OrgReports />} />
        <Route path="configuracion" element={<OrgSettings />} />
        <Route path="soporte" element={<OrgSupport />} />
      </Route>
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
