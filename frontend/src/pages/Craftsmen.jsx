import { Link } from "react-router-dom";

function Craftsmen() {
  const craftsmen = [
    {
      id: 1,
      name: "محمد أحمد",
      job: "كهربائي",
      rating: 4.8,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "أحمد علي",
      job: "نجار",
      rating: 4.5,
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="craftsmen-page">
      <h1 className="craftsmen-title">Craftsmen</h1>
      <p className="craftsmen-subtitle">Browse available craftsmen</p>

      {/* 👇 أهم سطر */}
      <div className="craftsmen-grid">
        {craftsmen.map((c) => (
          <div key={c.id} className="craftsmen-card">

            <img
              src={c.image}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
              alt="craftsman"
            />

            <h3>{c.name}</h3>
            <p className="craftsmen-job">{c.job}</p>
            <p className="craftsmen-rating">⭐ {c.rating}</p>

            <Link
              to={`/craftsman/${c.id}`}
              className="craftsmen-btn"
            >
              View Profile
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Craftsmen;