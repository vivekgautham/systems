import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SystemDetailPage from "./pages/SystemDetailPage";
import SystemListPage from "./pages/SystemListPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SystemListPage />} />
      <Route path="/system/:systemId" element={<SystemDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
