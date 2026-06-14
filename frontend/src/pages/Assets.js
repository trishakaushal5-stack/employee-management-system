import { useEffect, useState } from "react";
import axios from "axios";

function Assets() {
  const [assets, setAssets] = useState([]);

  const [form, setForm] = useState({
    asset_code: "",
    asset_name: "",
    asset_type: "",
    purchase_date: "",
    purchase_cost: "",
    status: "Available"
  });

  // GET ASSETS
  const fetchAssets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/assets"
      );
      setAssets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ADD ASSET
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/assets",
        form
      );

      alert("Asset Added Successfully ✅");

      setForm({
        asset_code: "",
        asset_name: "",
        asset_type: "",
        purchase_date: "",
        purchase_cost: "",
        status: "Available"
      });

      fetchAssets();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE ASSET
  const deleteAsset = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/assets/${id}`
      );

      fetchAssets();
    } catch (err) {
      console.log(err);
    }
  };

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
        Asset Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "25px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "12px"
        }}
      >
        <input
          name="asset_code"
          placeholder="Asset Code"
          value={form.asset_code}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="asset_name"
          placeholder="Asset Name"
          value={form.asset_name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="asset_type"
          placeholder="Asset Type"
          value={form.asset_type}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="date"
          name="purchase_date"
          value={form.purchase_date}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="purchase_cost"
          placeholder="Purchase Cost"
          value={form.purchase_cost}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Available">
            Available
          </option>
          <option value="Allocated">
            Allocated
          </option>
          <option value="Maintenance">
            Maintenance
          </option>
        </select>

        <button
          type="submit"
          style={{
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Add Asset
        </button>
      </form>

      {/* TABLE */}
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
              <th style={thStyle}>Code</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Cost</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td style={tdStyle}>
                  {asset.id}
                </td>

                <td style={tdStyle}>
                  {asset.asset_code}
                </td>

                <td style={tdStyle}>
                  {asset.asset_name}
                </td>

                <td style={tdStyle}>
                  {asset.asset_type}
                </td>

                <td style={tdStyle}>
                  ₹{asset.purchase_cost}
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background:
                        asset.status ===
                        "Available"
                          ? "#DCFCE7"
                          : "#FEE2E2",
                      color:
                        asset.status ===
                        "Available"
                          ? "#166534"
                          : "#991B1B",
                      padding:
                        "5px 12px",
                      borderRadius:
                        "20px",
                      fontSize: "14px"
                    }}
                  >
                    {asset.status}
                  </span>
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      deleteAsset(asset.id)
                    }
                    style={{
                      background:
                        "#DC2626",
                      color: "#fff",
                      border: "none",
                      borderRadius:
                        "6px",
                      padding:
                        "8px 12px",
                      cursor:
                        "pointer"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// STYLES

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #CBD5E1"
};

const thStyle = {
  padding: "12px"
};

const tdStyle = {
  padding: "12px",
  borderBottom:
    "1px solid #E2E8F0",
  textAlign: "center"
};

export default Assets;