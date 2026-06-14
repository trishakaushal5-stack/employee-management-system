import { useEffect, useState } from "react";
import axios from "axios";

function Departments() {
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    id: "",
    department_name: ""
  });

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/departments"
      );

      setDepartments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.id) {
        await axios.put(
          `http://localhost:5000/api/departments/${form.id}`,
          form
        );

        alert("Department Updated ✅");
      } else {
        await axios.post(
          "http://localhost:5000/api/departments",
          form
        );

        alert("Department Added ✅");
      }

      setForm({
        id: "",
        department_name: ""
      });

      fetchDepartments();

    } catch (err) {
      console.log(err);
    }
  };

  const deleteDepartment = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this department?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/departments/${id}`
      );

      fetchDepartments();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#F8FAFC",
        minHeight: "100vh"
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          color: "#0F172A"
        }}
      >
        Department Management
      </h1>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
          marginBottom: "25px",
          display: "flex",
          gap: "10px"
        }}
      >
        <input
          placeholder="Department Name"
          value={form.department_name}
          onChange={(e) =>
            setForm({
              ...form,
              department_name:
                e.target.value
            })
          }
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border:
              "1px solid #CBD5E1"
          }}
        />

        <button
          type="submit"
          style={{
            background: "#2563EB",
            color: "#fff",
            border: "none",
            padding:
              "12px 20px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          {form.id
            ? "Update Department"
            : "Add Department"}
        </button>
      </form>

      {/* TABLE */}

      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)"
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse"
          }}
        >
          <thead>
            <tr
              style={{
                background:
                  "#2563EB",
                color: "#fff"
              }}
            >
              <th style={thStyle}>
                ID
              </th>
              <th style={thStyle}>
                Department
              </th>
              <th style={thStyle}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {departments.map(
              (dept) => (
                <tr key={dept.id}>
                  <td
                    style={
                      tdStyle
                    }
                  >
                    {dept.id}
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    {
                      dept.department_name
                    }
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    <button
                      onClick={() =>
                        setForm(
                          dept
                        )
                      }
                      style={{
                        background:
                          "#10B981",
                        color:
                          "#fff",
                        border:
                          "none",
                        padding:
                          "8px 12px",
                        borderRadius:
                          "6px",
                        marginRight:
                          "10px",
                        cursor:
                          "pointer"
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteDepartment(
                          dept.id
                        )
                      }
                      style={{
                        background:
                          "#DC2626",
                        color:
                          "#fff",
                        border:
                          "none",
                        padding:
                          "8px 12px",
                        borderRadius:
                          "6px",
                        cursor:
                          "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "center"
};

const tdStyle = {
  padding: "12px",
  textAlign: "center",
  borderBottom:
    "1px solid #E2E8F0"
};

export default Departments;