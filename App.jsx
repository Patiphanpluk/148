import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { initializeApp } from "firebase/app";
import {
  getFirestore, doc, setDoc, getDoc, updateDoc, increment
} from "firebase/firestore";
import { nanoid } from "nanoid";
import "./styles.css";

// 🔥 ตั้งค่า Firebase ของคุณตรงนี้
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ------------------ หน้า Redirect เวลาแสกน ------------------
function RedirectPage() {
  const { id } = useParams();
  useEffect(() => {
    const go = async () => {
      const ref = doc(db, "qr_links", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        await updateDoc(ref, { scans: increment(1) });
        window.location.href = snap.data().targetUrl;
      } else alert("QR นี้ไม่พบแล้ว");
    };
    go();
  }, [id]);
  return <p style={{ textAlign: "center" }}>กำลังเปลี่ยนเส้นทาง...</p>;
}

// ------------------ หน้า QR Generator ------------------
function GeneratorPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [color, setColor] = useState("#000000");
  const [logo, setLogo] = useState("");

  const createQR = async () => {
    const id = nanoid(6);
    const ref = doc(db, "qr_links", id);
    await setDoc(ref, { targetUrl: url, scans: 0 });
    const link = `${window.location.origin}/#/r/${id}`;
    setShortUrl(link);
  };

  const downloadQR = () => {
    const canvas = document.getElementById("qrcode");
    const link = document.createElement("a");
    link.download = "qr.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="container">
      <h1>สร้าง Dynamic QR Code</h1>
      <input
        type="text"
        placeholder="ใส่ลิงก์ปลายทาง..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="options">
        <label>🎨 สี:</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <label>🖼 โลโก้ (URL):</label>
        <input
          type="text"
          placeholder="ใส่ลิงก์โลโก้"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />
      </div>
      <button onClick={createQR}>สร้าง QR</button>

      {shortUrl && (
        <div className="result">
          <p><b>ลิงก์ย่อ:</b> <a href={shortUrl}>{shortUrl}</a></p>
          <QRCodeCanvas
            id="qrcode"
            value={shortUrl}
            size={220}
            fgColor={color}
            imageSettings={{
              src: logo,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
          <button onClick={downloadQR}>ดาวน์โหลด QR</button>
        </div>
      )}
    </div>
  );
}

// ------------------ แอปหลัก ------------------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneratorPage />} />
        <Route path="/r/:id" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
