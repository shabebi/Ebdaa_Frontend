import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("digital");
  const [loading, setLoading] = useState(false);

  const API = "https://ebdaa-backend-lww2.onrender.com";

  // ================= LOGIN =================
  const handleLogin = () => {
    if (
      username === "admin" &&
      password === "Ebdaa@2026Admin!"
    ) {
      setLoggedIn(true);
    } else {
      alert("Wrong username or password");
    }
  };

  // ================= FETCH =================
  const fetchImages = async () => {
    try {
      const res = await fetch(`${API}/images/${category}`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchImages();
    }
  }, [category, loggedIn]);

  // ================= UPLOAD =================
  const handleUpload = async () => {
    if (!file) {
      alert("Please select image");
      return;
    }

    const formData = new FormData();

    formData.append("image", file);
    formData.append("category", category);
    formData.append("key", "Ebdaa@2026Admin!");

    try {
      setLoading(true);

      await fetch(`${API}/upload`, {
        method: "POST",
        body: formData
      });

      alert("Uploaded Successfully ✅");

      setFile(null);

      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Upload Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this image?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${API}/delete/${id}`, {
        method: "DELETE"
      });

      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ================= LOGIN PAGE =================
  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-left">
            <div>
              <h1>EBDAA</h1>
              <p>Creative Media Admin Dashboard</p>

              <div className="login-features">
                <div>• Upload portfolio images</div>
                <div>• Manage categories</div>
                <div>• Delete content instantly</div>
              </div>
            </div>
          </div>

          <div className="login-right">
            <div className="login-form">
              <h2>Admin Login</h2>

              <input
                type="text"
                placeholder="Admin username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= DASHBOARD =================
  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>EBDAA</h2>
        </div>

        <div className="sidebar-menu">
          <div className="sidebar-item active">
            Dashboard
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={() => setLoggedIn(false)}
        >
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        {/* TOPBAR */}
        <div className="topbar">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your portfolio content</p>
          </div>

          <div className="topbar-user">
            Admin
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{images.length}</h3>
            <p>Total Images</p>
          </div>

          <div className="stat-card">
            <h3>{category}</h3>
            <p>Current Category</p>
          </div>

          <div className="stat-card">
            <h3>EBDAA</h3>
            <p>Creative Studio</p>
          </div>
        </div>

        {/* UPLOAD CARD */}
        <div className="upload-card">
          <h2>Upload New Image</h2>

          <div className="upload-controls">
            <input
              type="file"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="digital">
                Digital
              </option>

              <option value="video">
                Video
              </option>

              <option value="motion">
                Motion
              </option>
            </select>

            <button
              onClick={handleUpload}
              disabled={loading}
            >
              {loading
                ? "Uploading..."
                : "Upload"}
            </button>
          </div>
        </div>

        {/* GALLERY */}
        <div className="gallery-section">
          <div className="section-header">
            <h2>Gallery</h2>
          </div>

          {images.length === 0 ? (
            <p className="empty-text">
              No images found
            </p>
          ) : (
            <div className="gallery-grid">
              {images.map((img) => (
                <div
                  className="gallery-card"
                  key={img.id}
                >
                  <img
                    src={img.url}
                    alt=""
                  />

                  <div className="gallery-overlay">
                    <button
                      onClick={() =>
                        handleDelete(img.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;