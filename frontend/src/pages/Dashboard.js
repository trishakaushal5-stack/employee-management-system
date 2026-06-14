import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import {
  Bar,
  Line,
  Pie,
  Doughnut
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [data, setData] = useState({
    employees: 0,
    departments: 0,
    skills: 0,
    totalAssets: 0,
    allocatedAssets: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    departmentWise: [],
    monthlyHiring: []
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.log("API Error:", err));
  }, []);

  /* ================= CHART DATA (SAFE) ================= */

  const departmentChart = {
    labels: data.departmentWise.map(d => d.department_name || ""),
    datasets: [
      {
        label: "Employees",
        data: data.departmentWise.map(d => Number(d.total || 0)),
        backgroundColor: "#2563EB"
      }
    ]
  };

  const monthlyChart = {
    labels: data.monthlyHiring.map(m => m.month || ""),
    datasets: [
      {
        label: "Monthly Hiring",
        data: data.monthlyHiring.map(m => Number(m.total || 0)),
        borderColor: "#2563EB",
        backgroundColor: "rgba(37,99,235,0.2)",
        fill: true,
        tension: 0.4
      }
    ]
  };

  const leaveChart = {
    labels: ["Pending", "Approved"],
    datasets: [
      {
        data: [
          data.pendingLeaves || 0,
          data.approvedLeaves || 0
        ],
        backgroundColor: ["#F59E0B", "#10B981"]
      }
    ]
  };

  const assetChart = {
    labels: ["Allocated", "Available"],
    datasets: [
      {
        data: [
          data.allocatedAssets || 0,
          (data.totalAssets || 0) - (data.allocatedAssets || 0)
        ],
        backgroundColor: ["#2563EB", "#10B981"]
      }
    ]
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F1F5F9" }}>

      {/* ================= SIDEBAR ================= */}
      <div style={{
        width: "240px",
        background: "#0F172A",
        color: "white",
        padding: "20px",
        position: "fixed",
        height: "100vh"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          EMS
        </h2>

        <Link to="/" style={linkStyle}>📊 Dashboard</Link>
        <Link to="/employees" style={linkStyle}>👨‍💼 Employees</Link>
        <Link to="/departments" style={linkStyle}>🏢 Departments</Link>
        <Link to="/skills" style={linkStyle}>🛠 Skills</Link>
        <Link to="/assets" style={linkStyle}>💻 Assets</Link>
        <Link to="/reports" style={linkStyle}>📈 Reports</Link>

        {/* ⭐ ADD LEAVE PAGE HERE */}
        <Link to="/leaves" style={linkStyle}>📝 Leaves</Link>
      </div>

      {/* ================= MAIN ================= */}
      <div style={{ marginLeft: "260px", flex: 1, padding: "25px" }}>

        <h2>Dashboard</h2>

        {/* CARDS */}
        <div style={grid3}>
          <Card title="Employees" value={data.employees} />
          <Card title="Departments" value={data.departments} />
          <Card title="Skills" value={data.skills} />
        </div>

        <div style={grid4}>
          <Card title="Assets" value={data.totalAssets} />
          <Card title="Allocated" value={data.allocatedAssets} />
          <Card title="Pending Leaves" value={data.pendingLeaves} />
          <Card title="Approved Leaves" value={data.approvedLeaves} />
        </div>

        {/* CHARTS */}
        <div style={chartRow}>
          <div style={box}>
            <h3>Monthly Hiring</h3>
            <Line data={monthlyChart} options={options} />
          </div>

          <div style={box}>
            <h3>Department Wise</h3>
            <Bar data={departmentChart} options={options} />
          </div>
        </div>

        <div style={chartRow}>
          <div style={box}>
            <h3>Assets</h3>
            <Doughnut data={assetChart} options={options} />
          </div>

          <div style={box}>
            <h3>Leaves</h3>
            <Pie data={leaveChart} options={options} />
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */
function Card({ title, value }) {
  return (
    <div style={card}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

/* ================= STYLES ================= */

const linkStyle = {
  textDecoration: "none",
  color: "white",
  padding: "12px",
  borderRadius: "8px",
  background: "#1E293B",
  display: "block",
  marginBottom: "10px"
};

const card = {
  background: "#fff",
  padding: "15px",
  borderRadius: "12px",
  textAlign: "center"
};

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "15px",
  marginBottom: "15px"
};

const grid4 = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "15px",
  marginBottom: "20px"
};

const chartRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
  marginBottom: "20px"
};

const box = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  height: "350px"
};

const options = {
  responsive: true,
  maintainAspectRatio: false
};

export default Dashboard;