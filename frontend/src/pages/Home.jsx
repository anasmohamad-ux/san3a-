import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  if (user?.role === "client") {
    return (
      <div
        style={{
          background: "#F8F5EF",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        {/* HERO */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#8B5E3C,#A85D20)",
            borderRadius: "25px",
            padding: "50px",
            color: "white",
            marginBottom: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              marginBottom: "15px",
            }}
          >
            Welcome back, {user.name} 👋
          </h1>

          <p
            style={{
              fontSize: "20px",
              opacity: 0.95,
            }}
          >
            Find trusted craftsmen and manage your services easily.
          </p>
        </div>

        {/* QUICK ACTIONS */}
        <h2
          style={{
            color: "#3E2C23",
            marginBottom: "20px",
          }}
        >
          Quick Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          <Link
            to="/craftsmen"
            style={{ textDecoration: "none" }}
          >
            <div style={cardStyle}>
              <h2>🔍 Browse Craftsmen</h2>
              <p>Explore available craftsmen.</p>
            </div>
          </Link>

          <Link
            to="/client-requests"
            style={{ textDecoration: "none" }}
          >
            <div style={cardStyle}>
              <h2>📋 My Requests</h2>
              <p>Track all your requests.</p>
            </div>
          </Link>

          <Link
            to="/favorites"
            style={{ textDecoration: "none" }}
          >
            <div style={cardStyle}>
              <h2>❤️ Favorites</h2>
              <p>Manage favorite craftsmen.</p>
            </div>
          </Link>

          
        </div>

        {/* FEATURED */}
        <h2
          style={{
            color: "#3E2C23",
            marginBottom: "20px",
          }}
        >
          ⭐ Featured Categories
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          {[
  { icon: "⚡", name: "Electrician" },
  { icon: "🚰", name: "Plumber" },
  { icon: "🎨", name: "Painter" },
  { icon: "🪚", name: "Carpenter" },
  { icon: "❄️", name: "AC Technician" },
  { icon: "🛠", name: "Welder" },
].map((cat) => (
  <Link
    key={cat.name}
    to={`/craftsmen?specialty=${encodeURIComponent(cat.name)}`}
    style={{ textDecoration: "none" }}
  >
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "18px",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        fontWeight: "600",
        color: "#3E2C23",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          marginBottom: "10px",
        }}
      >
        {cat.icon}
      </div>

      {cat.name}
    </div>
  </Link>
))}
        </div>

        {/* STATS */}
        <h2
          style={{
            color: "#3E2C23",
            marginBottom: "20px",
          }}
        >
          📊 Platform Statistics
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          <div style={statCard}>
            <h1>500+</h1>
            <p>Craftsmen</p>
          </div>

          <div style={statCard}>
            <h1>2K+</h1>
            <p>Happy Customers</p>
          </div>

          <div style={statCard}>
            <h1>4.9</h1>
            <p>Average Rating</p>
          </div>
        </div>
      </div>
    );
  }

  if (user?.role === "craftsman") {
    return (
  <div
    style={{
      background: "#F8F5EF",
      minHeight: "100vh",
      padding: "40px",
    }}
  >
    {/* HERO */}
    <div
      style={{
        background:
          "linear-gradient(135deg,#8B5E3C,#A85D20)",
        borderRadius: "25px",
        padding: "50px",
        color: "white",
        marginBottom: "40px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "10px",
        }}
      >
        Welcome Back, {user.name} 👋
      </h1>

      <p
        style={{
          fontSize: "18px",
          opacity: 0.9,
        }}
      >
        Manage your profile, requests and clients easily.
      </p>
    </div>

    {/* STATS */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "50px",
      }}
    >
      <div style={statCard}>
        <h1>📩</h1>
        <h2>2</h2>
        <p>Pending Requests</p>
      </div>

      <div style={statCard}>
        <h1>⭐</h1>
        <h2>4.8</h2>
        <p>Average Rating</p>
      </div>

      <div style={statCard}>
        <h1>💬</h1>
        <h2>3</h2>
        <p>Messages</p>
      </div>
    </div>

    {/* LATEST REQUESTS */}
    <h2
      style={{
        color: "#3E2C23",
        marginBottom: "20px",
      }}
    >
      📋 Latest Requests
    </h2>

    <div style={cardStyle}>
      <h3>⚡ Electrical Repair</h3>
      <p>Client: Ahmad</p>
      <p>Status: Pending</p>
    </div>

    <div
      style={{
        ...cardStyle,
        marginTop: "15px",
      }}
    >
      <h3>🎨 Painting Service</h3>
      <p>Client: Omar</p>
      <p>Status: Accepted</p>
    </div>

    {/* REVIEWS */}
    <h2
      style={{
        color: "#3E2C23",
        marginTop: "50px",
        marginBottom: "20px",
      }}
    >
      ⭐ Latest Reviews
    </h2>

    <div style={cardStyle}>
      <h3>⭐⭐⭐⭐⭐</h3>
      <p>
        Great service and very professional.
      </p>
    </div>

    <div
      style={{
        ...cardStyle,
        marginTop: "15px",
      }}
    >
      <h3>⭐⭐⭐⭐</h3>
      <p>
        Fast response and fair pricing.
      </p>
    </div>

    {/* QUICK ACTIONS */}
    <h2
      style={{
        color: "#3E2C23",
        marginTop: "50px",
        marginBottom: "20px",
      }}
    >
      ⚡ Quick Actions
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
      }}
    >
      <Link
        to="/profile"
        style={{ textDecoration: "none" }}
      >
        <div style={cardStyle}>
          <h2>🧑‍🔧 My Profile</h2>
        </div>
      </Link>

      <Link
        to="/requests"
        style={{ textDecoration: "none" }}
      >
        <div style={cardStyle}>
          <h2>📩 Requests</h2>
        </div>
      </Link>

      <Link
        to="/ratings"
        style={{ textDecoration: "none" }}
      >
        <div style={cardStyle}>
          <h2>⭐ Ratings</h2>
        </div>
      </Link>
    </div>
  </div>
);
  }

 return (
  <div
    style={{
      minHeight: "100vh",
      background: "#F8F5EF",
      padding: "60px",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "50px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            color: "#A85D20",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Trusted craftsmen near you
        </p>

        <h1
          style={{
            fontSize: "60px",
            color: "#3E2C23",
            lineHeight: "1.1",
            marginBottom: "20px",
          }}
        >
          Your Project,
          <br />
          Our Craftsmen
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#666",
            maxWidth: "500px",
            marginBottom: "30px",
          }}
        >
          Find skilled professionals for any service you need.
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "40px",
          }}
        >
          <Link
            to="/register"
            style={{
              background: "#A85D20",
              color: "white",
              padding: "12px 25px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Get Started
          </Link>

          <Link
            to="/craftsmen"
            style={{
              border: "2px solid #A85D20",
              color: "#A85D20",
              padding: "12px 25px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Browse Services
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 style={{ color: "#A85D20" }}>500+</h3>
            <p>Skilled Workers</p>
          </div>

          <div>
            <h3 style={{ color: "#A85D20" }}>1K+</h3>
            <p>Happy Clients</p>
          </div>

          <div>
            <h3 style={{ color: "#A85D20" }}>100%</h3>
            <p>Trusted</p>
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(135deg,#8B5E3C,#A85D20)",
          padding: "25px",
          borderRadius: "25px",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.15)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Craftsmen"
          style={{
            width: "100%",
            borderRadius: "20px",
            marginBottom: "20px",
          }}
        />

        <h3
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Professional Services
        </h3>

        <p
          style={{
            color: "#f5f5f5",
            textAlign: "center",
          }}
        >
          Connect with trusted craftsmen and
          complete your project with confidence.
        </p>
        
        
      </div>
    </div>
    {/* OUR SERVICES */}

<div
  style={{
    marginTop: "80px",
    textAlign: "center",
  }}
>
  <p
    style={{
      color: "#A85D20",
      fontSize: "13px",
      fontWeight: "bold",
      letterSpacing: "1px",
      marginBottom: "10px",
    }}
  >
    OUR SERVICES
  </p>

  <h2
    style={{
      fontSize: "42px",
      color: "#3E2C23",
      marginBottom: "40px",
    }}
  >
    What can we help you with?
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
      gap: "20px",
      marginBottom: "40px",
    }}
  >
    {[
      {
        icon: "⚡",
        title: "Electrical Services",
        specialty: "Electrician",
      },
      {
        icon: "🪚",
        title: "Carpentry",
        specialty: "Carpenter",
      },
      {
        icon: "🔧",
        title: "Plumbing",
        specialty: "Plumber",
      },
      {
        icon: "🎨",
        title: "Painting",
        specialty: "Painter",
      },
      {
        icon: "❄️",
        title: "AC Services",
        specialty: "AC Technician",
      },
      {
        icon: "🛠",
        title: "Metal Works",
        specialty: "Welder",
      },
    ].map((service) => (
      <Link
        key={service.title}
        to={`/craftsmen?specialty=${encodeURIComponent(
          service.specialty
        )}`}
        style={{ textDecoration: "none" }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px 20px",
            border: "1px solid #eee",
            boxShadow: "0 5px 15px rgba(0,0,0,0.06)",
            transition: "0.3s",
            cursor: "pointer",
            color: "#3E2C23",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-8px)";
            e.currentTarget.style.boxShadow =
              "0 12px 25px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 5px 15px rgba(0,0,0,0.06)";
          }}
        >
          <div
            style={{
              fontSize: "28px",
              marginBottom: "15px",
            }}
          >
            {service.icon}
          </div>

          <div
            style={{
              fontWeight: "600",
            }}
          >
            {service.title}
          </div>
        </div>
      </Link>
    ))}
  </div>

  <Link
    to="/craftsmen"
    style={{
      background: "#A85D20",
      color: "white",
      padding: "14px 35px",
      borderRadius: "12px",
      textDecoration: "none",
      fontWeight: "bold",
      display: "inline-block",
    }}
  >
    View All Services
  </Link>
</div>
  </div>
  
);
}

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "20px",
  color: "#3E2C23",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "0.3s",
};

const statCard = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  color: "#3E2C23",
};

export default Home;