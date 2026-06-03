import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function UploadPhoto() {
    const { user, setUser } = useAuth();
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!photo) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("photo", photo);

            const response = await api.post("/api/profile/photo", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const updatedUser = response.data.data || response.data;

            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setMessage("Photo uploaded successfully!");

        } catch (err) {
            setMessage("Upload failed. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "60px auto", padding: "30px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#5C3A1E" }}>Upload Profile Photo</h2>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img
                    src={preview || user?.photo || "https://via.placeholder.com/120"}
                    alt="Profile"
                    style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "3px solid #8B5E3C" }}
                />
            </div>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ width: "100%", marginBottom: "15px" }}
            />

            {message && (
                <p style={{ textAlign: "center", color: message.includes("success") ? "green" : "red", marginBottom: "10px" }}>
                    {message}
                </p>
            )}

            <button
                onClick={handleUpload}
                disabled={loading || !photo}
                style={{ width: "100%", padding: "12px", backgroundColor: "#8B5E3C", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", opacity: loading ? 0.7 : 1 }}
            >
                {loading ? "Uploading..." : "Upload Photo"}
            </button>
        </div>
    );
}

export default UploadPhoto;