import { useState, useEffect } from "react";
import axios from "axios";

function EmployeeImages() {
  const [employeeId, setEmployeeId] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [images, setImages] =
    useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/images"
      );

      setImages(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async (e) => {
    e.preventDefault();

    try {
      const formData =
        new FormData();

      formData.append(
        "employee_id",
        employeeId
      );

      formData.append(
        "image",
        image
      );

      await axios.post(
        "http://localhost:5000/api/images/upload",
        formData
      );

      alert(
        "Image Uploaded Successfully ✅"
      );

      setEmployeeId("");
      setImage(null);

      fetchImages();

    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this image?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/images/${id}`
      );

      fetchImages();

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
        Employee Images
      </h1>

      {/* Upload Form */}

      <form
        onSubmit={uploadImage}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
          marginBottom: "30px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >
        <input
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) =>
            setEmployeeId(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            borderRadius: "8px",
            border:
              "1px solid #CBD5E1",
            flex: 1
          }}
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
          style={{
            padding: "10px"
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
          Upload
        </button>
      </form>

      {/* Image Gallery */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px"
        }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "15px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)"
            }}
          >
            <h3>
              Employee ID:
              {img.employee_id}
            </h3>

            <img
              src={img.image_url}
              alt="Employee"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "10px",
                marginTop: "10px"
              }}
            />

            <button
              onClick={() =>
                deleteImage(
                  img.id
                )
              }
              style={{
                marginTop: "15px",
                width: "100%",
                background:
                  "#DC2626",
                color: "#fff",
                border: "none",
                padding: "10px",
                borderRadius:
                  "8px",
                cursor: "pointer"
              }}
            >
              Delete Image
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeImages;