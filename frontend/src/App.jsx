import GoogleButtonLogin from "./components/Button";
import Header from "./components/header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import AppLayout from "./components/layout/AppLayout";
import Insights from "./pages/Insights";
import Overview from "./pages/Overview";
import Stats from "./pages/Stats";
import Workouts from "./pages/Workouts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/overview" element={<Overview />}/>
          <Route path="/stats" element={<Stats />}/>
          <Route path="/workouts" element={<Workouts />}/>
          <Route path="/insights" element={<Insights />}/>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
