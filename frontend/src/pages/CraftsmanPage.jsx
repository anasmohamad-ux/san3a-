import { useParams } from "react-router-dom";

function CraftsmanPage() {
  const { id } = useParams();

  const craftsmen = [
    {
      id: 1,
      name: "محمد أحمد",
      job: "كهربائي",
      rating: 4.8,
      bio: "خبرة 5 سنوات في الأعمال الكهربائية المنزلية والصيانة.",
      services: [
        "تصليح أعطال كهربائية",
        "تركيب إنارة",
        "تمديد كهرباء",
      ],
    },
    {
      id: 2,
      name: "أحمد علي",
      job: "نجار",
      rating: 4.5,
      bio: "متخصص في صناعة الأثاث الخشبي والتفصيل.",
      services: [
        "تفصيل خزائن",
        "تصليح أثاث",
        "تصميم مطابخ",
      ],
    },
  ];

  const craftsman = craftsmen.find((c) => c.id == id);

  if (!craftsman) {
    return <h2 style={{ color: "white" }}>Craftsman not found</h2>;
  }

  return (
    <div style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
      
      <div
        style={{
          width: "600px",
          background: "#1e1e2f",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 0 15px rgba(0,0,0,0.5)",
          color: "white",
        }}
      >
        {/* صورة + اسم */}
        <div style={{ textAlign: "center" }}>
          <img
            src="https://via.placeholder.com/120"
            alt="craftsman"
            style={{
              borderRadius: "50%",
              marginBottom: "15px",
            }}
          />
          <h2>{craftsman.name}</h2>
          <p style={{ color: "#aaa" }}>{craftsman.job}</p>
          <p>⭐ {craftsman.rating}</p>
        </div>

        {/* About */}
        <div style={{ marginTop: "20px" }}>
          <h3>About</h3>
          <p style={{ color: "#ccc" }}>{craftsman.bio}</p>
        </div>

        {/* Services */}
        <div style={{ marginTop: "20px" }}>
          <h3>Services</h3>
          <ul style={{ paddingLeft: "20px" }}>
            {craftsman.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <button
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "12px",
            background: "#ff9800",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          اطلب خدمة
        </button>
      </div>
    </div>
  );
}

export default CraftsmanPage;