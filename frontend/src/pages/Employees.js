import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    id: "",
    user_id: "",
    department_id: "",
    phone: "",
    address: "",
    designation: "",
    salary: ""
  });

  /* ================= FETCH EMPLOYEES ================= */
  const fetchEmployees = useCallback(async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/v1/employees"
    );

    console.log("Employees API:", res.data);

    const data = Array.isArray(res.data)
      ? res.data
      : [];

    console.log("API Response:",res.data)

    console.log("Final Data:", data);

    setEmployees(data);
  } catch (err) {
    console.error("Employee Fetch Error:", err);
    setEmployees([]);
  }
}, []);

  /* ================= FETCH DEPARTMENTS ================= */
  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/departments"
      );
      setDepartments(res.data || []);
    } catch (err) {
      console.log(err);
      setDepartments([]);
    }
  };

  /* ================= FETCH SKILLS ================= */
  const fetchSkills = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/skills"
      );
      setSkills(res.data || []);
    } catch (err) {
      console.log(err);
      setSkills([]);
    }
  };

  /* ================= USE EFFECT ================= */
  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchSkills();
  }, [fetchEmployees]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ================= RESET FORM ================= */
  const resetForm = () => {
    setForm({
      id: "",
      user_id: "",
      department_id: "",
      phone: "",
      address: "",
      designation: "",
      salary: ""
    });
    setSelectedSkills([]);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
  user_id: Number(form.user_id),
  department_id: Number(form.department_id),
  phone: form.phone,
  address: form.address,
  designation: form.designation,
  salary: Number(form.salary),
  skills: selectedSkills
};

console.log("Payload:", payload);

    try {
      if (form.id) {
        await axios.put(
          `http://localhost:5000/api/v1/employees/${form.id}`,
          payload
        );
        alert("Employee Updated ✅");
      } else {
        await axios.post(
          "http://localhost:5000/api/v1/employees",
          payload
        );
        alert("Employee Added ✅");
      }

      resetForm();
      fetchEmployees();

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= DELETE ================= */
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/employees/${id}`
      );
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (emp) => {
    setForm({
      id: emp?.id || "",
      user_id: emp?.user_id || "",
      department_id: emp?.department_id || "",
      phone: emp?.phone || "",
      address: emp?.address || "",
      designation: emp?.designation || "",
      salary: emp?.salary || ""
    });
  };

  return (
    <div style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}>

      <h1>Employees Management</h1>

      {/* SEARCH */}
      <input
        placeholder="Search Designation"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{ padding: "8px", width: "250px" }}
      />

      <br /><br />

      {/* FORM */}
      <div style={{ background: "white", padding: "15px", borderRadius: "10px" }}>

        <input name="user_id" value={form.user_id} onChange={handleChange} placeholder="User ID" />
        <br /><br />

        <select name="department_id" value={form.department_id} onChange={handleChange}>
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.department_name}
            </option>
          ))}
        </select>

        <br /><br />

        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <br /><br />

        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
        <br /><br />

        <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" />
        <br /><br />

        <input name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" />

        <h4>Skills</h4>

        {skills.map((s) => (
          <label key={s.id} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={selectedSkills.includes(s.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedSkills([...selectedSkills, s.id]);
                } else {
                  setSelectedSkills(
                    selectedSkills.filter((id) => id !== s.id)
                  );
                }
              }}
            />
            {s.skill_name}
          </label>
        ))}

        <br /><br />

        <button onClick={handleSubmit}>
          {form.id ? "Update Employee" : "Add Employee"}
        </button>

      </div>

      <br />

      {/* TABLE */}
      <div style={{ background: "white", padding: "10px", borderRadius: "10px" }}>
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Designation</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees?.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.department_name || emp.department_id}</td>
                  <td>
                    <button onClick={() => handleEdit(emp)}>Edit</button>
                    <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Employees Found</td>
              </tr>
            )}
          </tbody>
        </table>

        <br />

        {/* PAGINATION */}
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "10px" }}>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>

      </div>

    </div>
  );
}

export default Employees;