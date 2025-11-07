import { db } from "./src/firebase.js";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  increment,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const input = document.getElementById("inputText");
const colorPicker = document.getElementById("colorPicker");
const generateBtn = document.getElementById("generateBtn");
const saveBtn = document.getElementById("saveBtn");
const saveDynamicBtn = document.getElementById("saveDynamicBtn");
const qrCanvas = document.getElementById("qrCanvas");
const logoInput = document.getElementById("logoInput");
const dynamicLink = document.getElementById("dynamicLink");

let qr;

// สร้าง QR
generateBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) {
    alert("กรุณากรอกลิงก์หรือข้อความ");
    return;
  }

  qr = new QRious({
    element: qrCanvas,
    value: text,
    size: 250,
    background: "white",
    foreground: colorPicker.value,
  });

  // ใส่โลโก้ถ้ามี
  const file = logoInput.files[0];
  if (file) {
    const img = new Image();
    img.onload = () => {
      const ctx = qrCanvas.getContext("2d");
      const size = 60;
      ctx.drawImage(
        img,
        (qrCanvas.width - size) / 2,
        (qrCanvas.height - size) / 2,
        size,
        size
      );
    };
    img.src = URL.createObjectURL(file);
  }
});

// ดาวน์โหลด QR
saveBtn.addEventListener("click", () => {
  if (!qr) return alert("ยังไม่ได้สร้าง QR");
  const link = document.createElement("a");
  link.download = "qr.png";
  link.href = qrCanvas.toDataURL();
  link.click();
});

// บันทึกเป็น Dynamic QR
saveDynamicBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return alert("กรุณากรอกลิงก์ก่อน");

  const docRef = await addDoc(collection(db, "qrcodes"), {
    url: text,
    scans: 0,
    created: new Date(),
  });

  const dynamicURL = `${window.location.origin}/redirect.html?id=${docRef.id}`;
  dynamicLink.innerHTML = `🔗 ลิงก์ Dynamic QR: <a href="${dynamicURL}" target="_blank">${dynamicURL}</a>`;
});
