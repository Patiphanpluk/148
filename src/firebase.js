// ✅ นำเข้า Firebase SDK เวอร์ชันที่เหมาะกับเว็บ static (ไม่มี build)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// 🔥 ตั้งค่าด้วยค่าของคุณจาก Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDM86DKKFNuulKsKEAFqEM1F-XzosBuVx4",
  authDomain: "dynamic-qr-afbae.firebaseapp.com",
  projectId: "dynamic-qr-afbae",
  storageBucket: "dynamic-qr-afbae.firebasestorage.app",
  messagingSenderId: "589650390205",
  appId: "1:589650390205:web:c8eb14a74a34da34d99bd4",
  measurementId: "G-52KCB2KR05"
};

// ✅ เริ่มการเชื่อมต่อ Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ ส่งออกฐานข้อมูลให้ไฟล์อื่นใช้
export { db };
