import { BrowserRouter, Routes, Route } from "react-router-dom";

import Assets from "./pages/Assets";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Employees from "./pages/Employees";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notification";
import Audit from "./pages/Audit";
import Reports from "./pages/Reports";
import Departments from "./pages/Departments";
import Skills from "./pages/Skills";
import EmployeeImages from "./pages/EmployeeImage";
import Leaves from "./pages/leave";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "20px" }}>

          <Routes>

            {/* Default Route */}
            <Route path="/" element={<Login />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/leaves" element={<Leaves/>}/>

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* Employees */}
            <Route
              path="/employees"
              element={<Employees />}
            />

            {/* Departments */}
            <Route
              path="/departments"
              element={<Departments />}
            />

            {/* Skills */}
            <Route
              path="/skills"
              element={<Skills />}
            />

            {/* Assets */}
            <Route
              path="/assets"
              element={<Assets />}
            />

            {/* Notifications */}
            <Route
              path="/notifications"
              element={<Notifications />}
            />

            {/* Audit */}
            <Route
              path="/audit"
              element={<Audit />}
            />

            {/* Reports */}
            <Route
              path="/reports"
              element={<Reports />}
            />

            {/* Images */}
            <Route
              path="/images"
              element={<EmployeeImages />}
            />

          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;