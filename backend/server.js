require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const pool = require("./config/db");
const sendEmail = require("./utils/emailService");
const logger = require("./utils/logger");
const startDailyReport = require("./jobs/dailyReport");

const errorHandler = require("./middleware/errorHandler");

// ROUTES
const assetRoutes = require("./routes/assets");
const assetAllocationRoutes = require("./routes/assetAllocation");
const notificationRoutes = require("./routes/notification");
const auditRoutes = require("./routes/audit");
const reportRoutes = require("./routes/report");
const departmentRoutes = require("./routes/department");
const skillRoutes = require("./routes/skill");
const imageRoutes = require("./routes/image");
const leaveRoutes = require("./routes/leave");

const authRoutes = require("./routes/v1/auth");
const employeeRoutes = require("./routes/v1/employee");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= STATIC FILES =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ================= HEALTH =================
app.get("/api/health", (req, res) => {
  res.json({ status: "UP" });
});

// ================= TEST =================
app.get("/test", (req, res) => {
  res.json({ message: "Backend OK" });
});

// ================= EMAIL TEST =================
app.get("/test-email", async (req, res) => {
  try {
    await sendEmail("test@gmail.com", "Test", "Hello");
    res.send("Email Sent");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// ================= ROUTES =================
app.use("/api/leaves", leaveRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/asset-allocation", assetAllocationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/images", imageRoutes);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employees", employeeRoutes);

// ================= DASHBOARD API =================
app.get("/api/dashboard", async (req, res) => {
  try {
    const emp = await pool.query("SELECT COUNT(*) FROM employee_profiles");
    const dept = await pool.query("SELECT COUNT(*) FROM departments");
    const skill = await pool.query("SELECT COUNT(*) FROM skills");

    const totalAssets =
      (await pool.query("SELECT COUNT(*) FROM assets")).rows[0].count;

    const allocatedAssets =
      (
        await pool.query(
          "SELECT COUNT(*) FROM asset_allocations WHERE status='Allocated'"
        )
      ).rows[0].count;

    const pendingLeaves =
      (
        await pool.query(
          "SELECT COUNT(*) FROM leave_applications WHERE status='Pending'"
        )
      ).rows[0].count;

    const approvedLeaves =
      (
        await pool.query(
          "SELECT COUNT(*) FROM leave_applications WHERE status='Approved'"
        )
      ).rows[0].count;

    const departmentWise = (
      await pool.query(`
        SELECT d.department_name, COUNT(ep.id) AS total
        FROM departments d
        LEFT JOIN employee_profiles ep ON d.id = ep.department_id
        GROUP BY d.department_name
        ORDER BY d.department_name
      `)
    ).rows;

    const monthlyHiring = (
      await pool.query(`
        SELECT TO_CHAR(NOW(),'YYYY-MM') AS month,
        COUNT(*) AS total
        FROM employee_profiles
        GROUP BY month
        ORDER BY month
      `)
    ).rows;

    const monthlyIncome = (
      await pool.query(`
        SELECT TO_CHAR(created_at,'YYYY-MM') AS month,
        SUM(salary) AS amount
        FROM employee_profiles
        GROUP BY month
        ORDER BY month
      `)
    ).rows;

    res.json({
      employees: parseInt(emp.rows[0].count),
      departments: parseInt(dept.rows[0].count),
      skills: parseInt(skill.rows[0].count),

      totalAssets: parseInt(totalAssets),
      allocatedAssets: parseInt(allocatedAssets),

      pendingLeaves: parseInt(pendingLeaves),
      approvedLeaves: parseInt(approvedLeaves),

      departmentWise,
      monthlyHiring,
      monthlyIncome
    });

  } catch (err) {
    console.log("❌ Dashboard Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= ERROR HANDLER =================
app.use(errorHandler);

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on ${PORT}`);
  console.log(`Server running on ${PORT}`);
});

startDailyReport();