import { useParams, useNavigate } from "react-router-dom";

function CraftsmanPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const craftsmen = [
    {
      id: 1,
      name: "محمد أحمد",
      job: "كهربائي",
      rating: 4.8,
      bio: "خبرة 5 سنوات في الأعمال الكهربائية المنزلية والصيانة.",
      services: ["تصليح أعطال كهربائية", "تركيب إنارة", "تمديد كهرباء"],
    },
    {
      id: 2,
      name: "أحمد علي",
      job: "نجار",
      rating: 4.5,
      bio: "متخصص في صناعة الأثاث الخشبي والتفصيل.",
      services: ["تفصيل خزائن", "تصليح أثاث", "تصميم مطابخ"],
    },
  ];

  const craftsman = craftsmen.find((c) => c.id == id);

  if (!craftsman) {
    return <h2 className="not-found">Craftsman not found</h2>;
  }

  return (
    <div className="craftsman-page">
      <div className="craftsman-container">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          ⬅ Back
        </button>

        {/* Card */}
        <div className="craftsman-card">

          {/* Header */}
          <div className="craftsman-header">
            <img
              src="https://via.placeholder.com/120"
              alt={craftsman.name}
            />
            <h2>{craftsman.name}</h2>
            <p className="craftsman-job">{craftsman.job}</p>
            <p className="craftsman-rating">⭐ {craftsman.rating}</p>
          </div>

          {/* About */}
          <div className="craftsman-section">
            <h3>About</h3>
            <p>{craftsman.bio}</p>
          </div>

          {/* Services */}
          <div className="craftsman-section">
            <h3>Services</h3>
            <ul className="craftsman-services">
              {craftsman.services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Button */}
          <button className="craftsman-btn">
            Request Service
          </button>

        </div>
      </div>
    </div>
  );
}

export default CraftsmanPage;