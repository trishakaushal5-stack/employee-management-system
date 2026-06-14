import { useEffect, useState } from "react";
import axios from "axios";

function Leaves() {
  const [leaves, setLeaves] = useState([]);

  // FETCH LEAVES (CORRECT API)
  const fetchLeaves = () => {
    axios
      .get("http://localhost:5000/api/leaves/all")
      .then((res) => setLeaves(res.data || []))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // UPDATE STATUS (APPROVE / REJECT)
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/leaves/update/${id}`,
        { status: status }
      );

      fetchLeaves(); // refresh table

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Leave Management</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.length > 0 ? (
            leaves.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.employee_id}</td>
                <td>{l.status}</td>

                <td>
                  <button
                    onClick={() => updateStatus(l.id, "Approved")}
                    style={{
                      marginRight: "10px",
                      background: "green",
                      color: "white",
                      padding: "5px"
                    }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(l.id, "Rejected")}
                    style={{
                      background: "red",
                      color: "white",
                      padding: "5px"
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Leaves Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaves;