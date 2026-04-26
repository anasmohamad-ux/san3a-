function Login() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        backgroundColor: "#F5F0E6",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "25px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#E67E22",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;