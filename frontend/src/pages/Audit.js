import { useEffect, useState } from "react";
import axios from "axios";

function Audit() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/audit")
      .then((res) => setLogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        background: "#F1F5F9",
        minHeight: "100vh"
      }}
    >
      <h1
        style={{
          color: "#0F172A",
          marginBottom: "20px"
        }}
      >
        Audit Logs
      </h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr
              style={{
                background: "#2563EB",
                color: "#fff"
              }}
            >
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Table Name</th>
              <th style={thStyle}>Action</th>
              <th style={thStyle}>Record ID</th>
              <th style={thStyle}>Performed By</th>
              <th style={thStyle}>Date & Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id}>
                  <td style={tdStyle}>
                    {log.id}
                  </td>

                  <td style={tdStyle}>
                    {log.table_name}
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        background:
                          log.action_type === "INSERT"
                            ? "#DCFCE7"
                            : log.action_type === "UPDATE"
                            ? "#DBEAFE"
                            : "#FEE2E2",
                        color:
                          log.action_type === "INSERT"
                            ? "#166534"
                            : log.action_type === "UPDATE"
                            ? "#1D4ED8"
                            : "#991B1B",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "bold"
                      }}
                    >
                      {log.action_type}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    {log.record_id}
                  </td>

                  <td style={tdStyle}>
                    {log.performed_by}
                  </td>

                  <td style={tdStyle}>
                    {new Date(
                      log.created_at
                    ).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px"
                  }}
                >
                  No Audit Logs Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Styles

const thStyle = {
  padding: "14px",
  textAlign: "center"
};

const tdStyle = {
  padding: "12px",
  textAlign: "center",
  borderBottom: "1px solid #E2E8F0"
};

export default Audit;