import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import WorksHeader from "../pages/WorksHeader";
import "./Works.css";

const Video = ({ setPage }) => {
  const [images, setImages] = useState([]);

  // 🔄 Fetch video images
  useEffect(() => {
    fetch("https://ebdaa-backend.onrender.com/images/video")
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
          src="تصوير إنتاج فيديو إعلاني.png"
          alt="Video Production"
          className="motion-top-image"
        />
        <h1 className="motion-top-image-text">تصوير وإنتاج فيديو إعلاني</h1>
      </div>

      {/* Header */}
      <div className="motion-header-line">
        <div className="motion-line right-line"></div>
        <h1>اعمالنا تصوير وإنتاج فيديو إعلاني</h1>
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

export default Video;