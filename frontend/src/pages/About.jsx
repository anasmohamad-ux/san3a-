function About() {
  return (
    <div
      style={{
        backgroundColor: "#F5F0E6",
        minHeight: "80vh",
        padding: "50px 40px",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto 50px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "#8B5E3C",
            marginBottom: "15px",
          }}
        >
          About San3a
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.7",
            color: "#333",
          }}
        >
          San3a is a platform designed to connect clients with trusted and
          skilled craftsmen in a simple, fast, and reliable way.
        </p>
      </section>

      {/* Images Section */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto 50px",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
          alt="Cleaning service"
          style={imageStyle}
        />

        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
          alt="Construction work"
          style={imageStyle}
        />

        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          alt="Professional service"
          style={imageStyle}
        />
      </section>

      {/* Info Cards */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto 50px",
        }}
      >
        <div style={cardStyle}>
          <h2>Our Mission</h2>
          <p>
            To make it easier for clients to find reliable craftsmen and request
            services without confusion or wasted time.
          </p>
        </div>

        <div style={cardStyle}>
          <h2>Our Vision</h2>
          <p>
            To become a trusted platform that supports local craftsmen and helps
            people get quality services faster.
          </p>
        </div>

        <div style={cardStyle}>
          <h2>Why San3a?</h2>
          <p>
            Because we bring clients and craftsmen together in one organized,
            simple, and user-friendly place.
          </p>
        </div>
      </section>

      {/* Support Section */}
      <section
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "#3E2C23",
          color: "white",
          padding: "30px",
          borderRadius: "16px",
          textAlign: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Technical Support</h2>

        <p style={{ margin: "8px 0" }}>Email: support@san3a.com</p>

        <p style={{ margin: "8px 0" }}>Phone: +962 7 9000 0000</p>
      </section>
    </div>
  );
}

const imageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "16px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  lineHeight: "1.6",
};

export default About;