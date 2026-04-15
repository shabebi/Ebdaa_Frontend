import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("digital");
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch images
  const fetchImages = async () => {
    try {
      const res = await fetch(`https://ebdaa-backend.onrender.com/images/${category}`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [category]);

  // ⬆️ Upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);
    formData.append("key", "Ebdaa@2026Admin!");

    try {
      setLoading(true);

      const res = await fetch("https://ebdaa-backend.onrender.com/upload", {
        method: "POST",
        body: formData
      });

      await res.json();

      alert("Uploaded successfully ✅");
      setFile(null);
      fetchImages(); // 🔥 refresh list
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this image?");
    if (!confirmDelete) return;

    try {
      await fetch(`https://ebdaa-backend.onrender.com/delete/${id}`, {
        method: "DELETE"
      });

      fetchImages(); // 🔥 refresh list
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1>EBDAA Admin Panel</h1>

        <label>Upload Image</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label>Select Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="digital">Digital</option>
          <option value="video">Video</option>
          <option value="motion">Motion</option>
        </select>

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>

        {/* 🔥 Image List */}
        <div className="admin-images">
          <h3>Existing Images</h3>

          {images.length === 0 && <p>No images yet</p>}

          <div className="admin-grid">
            {images.map((img) => (
              <div key={img.id} className="admin-image-card">
                <img src={img.url} alt="" />
                <button onClick={() => handleDelete(img.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;