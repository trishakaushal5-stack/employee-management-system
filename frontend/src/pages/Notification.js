import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const [form, setForm] = useState({
    user_id: "",
    title: "",
    message: ""
  });

  /* ================= FETCH ================= */
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notifications"
      );

      setNotifications(res.data || []);
    } catch (err) {
      console.log(err);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  /* ================= ADD ================= */
  const addNotification = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/notifications",
        form
      );

      alert("Notification Added ✅");

      setForm({
        user_id: "",
        title: "",
        message: ""
      });

      fetchNotifications();

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= MARK READ ================= */
  const markRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/notifications/${id}`
      );

      fetchNotifications();

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= DELETE ================= */
  const deleteNotification = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/notifications/${id}`
      );

      fetchNotifications();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>🔔 Notifications Dashboard</h2>
      </div>

      {/* FORM */}
      <div style={styles.card}>
        <h3>Add Notification</h3>

        <input
          placeholder="User ID"
          value={form.user_id}
          onChange={(e) =>
            setForm({ ...form, user_id: e.target.value })
          }
          style={styles.input}
        />

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          style={styles.input}
        />

        <input
          placeholder="Message"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          style={styles.input}
        />

        <button onClick={addNotification} style={styles.button}>
          Add Notification
        </button>
      </div>

      {/* COUNT */}
      <h3>Total Notifications: {notifications.length}</h3>

      {/* LIST */}
      {notifications.length > 0 ? (
        notifications.map((n) => (
          <div key={n.id} style={styles.notifCard}>

            <h4>{n.title}</h4>
            <p>{n.message}</p>

            <p>
              Status:{" "}
              <b style={{ color: n.is_read ? "green" : "red" }}>
                {n.is_read ? "Read ✅" : "Unread 🔔"}
              </b>
            </p>

            <div>
              {!n.is_read && (
                <button
                  onClick={() => markRead(n.id)}
                  style={styles.readBtn}
                >
                  Mark Read
                </button>
              )}

              <button
                onClick={() => deleteNotification(n.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>

          </div>
        ))
      ) : (
        <p>No Notifications Found</p>
      )}

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
    marginBottom: "15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  button: {
    background: "#2563eb",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  notifCard: {
    background: "white",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },

  readBtn: {
    background: "green",
    color: "white",
    padding: "6px",
    border: "none",
    marginRight: "10px",
    borderRadius: "5px"
  },

  deleteBtn: {
    background: "red",
    color: "white",
    padding: "6px",
    border: "none",
    borderRadius: "5px"
  }
};

export default Notifications;