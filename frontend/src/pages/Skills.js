import { useEffect, useState } from "react";
import axios from "axios";

function Skills() {

  const [skills, setSkills] = useState([]);

  const [form, setForm] = useState({
    id: "",
    skill_name: ""
  });

  /* ================= FETCH ================= */
  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/skills");
      setSkills(res.data || []);
    } catch (err) {
      console.log(err);
      setSkills([]);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.id) {
        await axios.put(
          `http://localhost:5000/api/skills/${form.id}`,
          form
        );
        alert("Skill Updated ✅");
      } else {
        await axios.post(
          "http://localhost:5000/api/skills",
          form
        );
        alert("Skill Added ✅");
      }

      setForm({ id: "", skill_name: "" });
      fetchSkills();

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= DELETE ================= */
  const deleteSkill = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/skills/${id}`
      );

      fetchSkills();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (skill) => {
    setForm({
      id: skill?.id || "",
      skill_name: skill?.skill_name || ""
    });
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>🛠 Skills Management</h2>
        <p style={{ margin: 0, opacity: 0.7 }}>
          Manage employee skills efficiently
        </p>
      </div>

      {/* FORM CARD */}
      <div style={styles.card}>

        <h3 style={styles.title}>
          {form.id ? "Update Skill" : "Add New Skill"}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter Skill Name"
            value={form.skill_name}
            onChange={(e) =>
              setForm({ ...form, skill_name: e.target.value })
            }
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            {form.id ? "Update Skill" : "Add Skill"}
          </button>
        </form>
      </div>

      {/* TABLE CARD */}
      <div style={styles.card}>

        <h3 style={styles.title}>All Skills</h3>

        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th>ID</th>
              <th>Skill Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {skills.length > 0 ? (
              skills.map((skill) => (
                <tr key={skill.id} style={styles.row}>
                  <td>{skill.id}</td>
                  <td>{skill.skill_name}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(skill)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteSkill(skill.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ padding: "10px", opacity: 0.6 }}>
                  No Skills Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

    </div>
  );
}

/* ================= MODERN DARK UI ================= */
const styles = {

  page: {
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    fontFamily: "Arial"
  },

  header: {
    background: "#111827",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
  },

  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
  },

  title: {
    marginBottom: "10px",
    color: "#38bdf8"
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    marginBottom: "10px",
    outline: "none",
    background: "#0f172a",
    color: "white"
  },

  button: {
    background: "#2563eb",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: "white"
  },

  theadRow: {
    background: "#0f172a"
  },

  row: {
    borderBottom: "1px solid #334155"
  },

  editBtn: {
    background: "#16a34a",
    color: "white",
    marginRight: "8px",
    padding: "6px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  deleteBtn: {
    background: "#dc2626",
    color: "white",
    padding: "6px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Skills;