import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import WorksHeader from "../pages/WorksHeader";
import "./Works.css";

const Motion = ({ setPage }) => {
  const [images, setImages] = useState([]);

  // 🔄 Fetch motion images
  useEffect(() => {
    fetch("https://ebdaa-backend.onrender.com/images/motion")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="motion-page">
      <WorksHeader
        onBack={() => setPage("home", { anchor: "ourwork" })}
        onLogoClick={() => setPage("home")}
      />

      {/* Top Image */}
      <div className="motion-top-image-container">
        <img
          src="تصميم موشن جرافيك.png"
          alt="Motion Graphics"
          className="motion-top-image"
        />
        <h1 className="motion-top-image-text">تصميم موشن جرافيك</h1>
      </div>

      {/* Header */}
      <div className="motion-header-line">
        <div className="motion-line right-line"></div>
        <h1>اعمالنا في تصميم الموشن جرافيك</h1>
        <div className="motion-line left-line"></div>
      </div>

      {/* ✅ Dynamic Section */}
      <div className="motion-section">
        <div className="motion-card-container">
          {images.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>
            
            </p>
          ) : (
            images.map((img) => (
              <div className="motion-card" key={img.id}>
                <img
                  src={img.url}
                  alt="work"
                  className="motion-card-image"
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="motion-bline"></div>
      <Footer />
    </div>
  );
};

export default Motion;