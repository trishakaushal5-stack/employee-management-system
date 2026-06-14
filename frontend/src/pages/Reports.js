import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Reports() {

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    axios.get("http://localhost:5000/api/reports/employees")
      .then((res) => setEmployees(res.data || []))
      .catch((err) => {
        console.log(err);
        setEmployees([]);
      });

    axios.get("http://localhost:5000/api/reports/departments")
      .then((res) => setDepartments(res.data || []))
      .catch((err) => {
        console.log(err);
        setDepartments([]);
      });

  }, []);

  /* ================= EXPORT EMPLOYEES ================= */
  const exportEmployees = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees || []);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const fileData = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    saveAs(fileData, "Employee_Report.xlsx");
  };

  /* ================= EXPORT DEPARTMENTS ================= */
  const exportDepartments = () => {
    const worksheet = XLSX.utils.json_to_sheet(departments || []);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Departments");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const fileData = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    saveAs(fileData, "Department_Report.xlsx");
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>📊 Reports Dashboard</h2>
      </div>

      {/* ================= EMPLOYEE REPORT ================= */}
      <div style={styles.card}>
        <h3>Employee Report</h3>

        <button onClick={exportEmployees} style={styles.button}>
          Export Employee Excel
        </button>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department_name}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.salary}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Employees Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= DEPARTMENT REPORT ================= */}
      <div style={styles.card}>
        <h3>Department Wise Count</h3>

        <button onClick={exportDepartments} style={styles.button}>
          Export Department Excel
        </button>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Department</th>
              <th>Total Employees</th>
            </tr>
          </thead>

          <tbody>
            {departments.length > 0 ? (
              departments.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.department_name}</td>
                  <td>{dept.total_employees}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No Departments Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: "20px",
    background: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  header: {
    background: "#111827",
    color: "white",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px"
  },

  button: {
    background: "#2563eb",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "10px"
  }
};

export default Reports;