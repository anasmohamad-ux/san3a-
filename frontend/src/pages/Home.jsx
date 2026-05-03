import { Link } from "react-router-dom";

function Home() {
  const services = [
    { title: "Electrical Services", icon: "⚡" },
    { title: "Carpentry", icon: "🪚" },
    { title: "Plumbing", icon: "🔧" },
    { title: "Painting", icon: "🎨" },
    { title: "AC Services", icon: "❄️" },
    { title: "Metal Works", icon: "🛠️" },
  ];

  return (
    <div style={{ backgroundColor: "#F5F0E6" }}>
      <section
        style={{
          minHeight: "80vh",
          padding: "70px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "50px",
        }}
      >
        <div style={{ flex: 1 }}>
          <p style={{ color: "#A85D20", fontWeight: "bold" }}>
            Trusted craftsmen near you
          </p>

          <h1
            style={{
              fontSize: "58px",
              lineHeight: "1.1",
              color: "#3E2C23",
              marginBottom: "20px",
            }}
          >
            Your Project,
            <br />
            Our Craftsmen
          </h1>

          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.7",
              color: "#5c4a3f",
              maxWidth: "520px",
              marginBottom: "30px",
            }}
          >
            Find skilled professionals for any service you need. Quick, easy,
            and reliable.
          </p>

          <div style={{ display: "flex", gap: "15px", marginBottom: "35px" }}>
            <Link
              to="/register"
              style={{
                padding: "13px 28px",
                backgroundColor: "#A85D20",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Get Started
            </Link>

            <Link
              to="/craftsmen"
              style={{
                padding: "13px 28px",
                backgroundColor: "white",
                color: "#8B5E3C",
                textDecoration: "none",
                border: "1px solid #8B5E3C",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Browse Services
            </Link>
          </div>

          <div style={{ display: "flex", gap: "35px" }}>
            <div>
              <h2 style={{ margin: 0, color: "#3E2C23" }}>500+</h2>
              <p style={{ margin: 0, color: "#5c4a3f" }}>Craftsmen</p>
            </div>

            <div>
              <h2 style={{ margin: 0, color: "#3E2C23" }}>2K+</h2>
              <p style={{ margin: 0, color: "#5c4a3f" }}>Happy Customers</p>
            </div>

            <div>
              <h2 style={{ margin: 0, color: "#3E2C23" }}>10+</h2>
              <p style={{ margin: 0, color: "#5c4a3f" }}>Categories</p>
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: "420px",
            borderRadius: "26px",
            background:
              "linear-gradient(135deg, #3E2C23, #8B5E3C, #E67E22)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 15px 40px rgba(0,0,0,0.22)",
            color: "white",
            textAlign: "center",
            padding: "30px",
          }}
        >
          <div>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="craftsman"
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              borderRadius: "20px",
              marginBottom: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          />
            <h2 style={{ fontSize: "34px", marginBottom: "15px" }}>
              Professional Services
            </h2>
            <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
              Connect with trusted craftsmen and complete your project with
              confidence.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: "white",
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#A85D20", fontWeight: "bold" }}>OUR SERVICES</p>

        <h2 style={{ fontSize: "36px", color: "#3E2C23" }}>
          What can we help you with?
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "35px",
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                width: "155px",
                padding: "25px 15px",
                backgroundColor: "#FFFDF9",
                borderRadius: "16px",
                border: "1px solid #EADBC8",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>
                {service.icon}
              </div>
              <h3 style={{ color: "#3E2C23", fontSize: "16px" }}>
                {service.title}
              </h3>
            </div>
          ))}
        </div>

        <Link
          to="/craftsmen"
          style={{
            display: "inline-block",
            marginTop: "35px",
            padding: "12px 30px",
            backgroundColor: "#A85D20",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          View All Services
        </Link>
      </section>

      <section style={{ padding: "65px 40px", textAlign: "center" }}>
        <p style={{ color: "#A85D20", fontWeight: "bold" }}>
          WHY CHOOSE SAN3A?
        </p>

        <h2 style={{ fontSize: "36px", color: "#3E2C23" }}>
          We are here to help you
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
            marginTop: "35px",
          }}
        >
          {[
            {
              title: "Trusted Professionals",
              text: "We work with verified and experienced craftsmen.",
            },
            {
              title: "Fast & Reliable",
              text: "Get your service done quickly and on time.",
            },
            {
              title: "Quality Guaranteed",
              text: "We ensure the best quality for every job.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                width: "280px",
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "18px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ color: "#3E2C23" }}>{item.title}</h3>
              <p style={{ color: "#5c4a3f", lineHeight: "1.6" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;