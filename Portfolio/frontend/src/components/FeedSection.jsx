import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Palette, X } from "lucide-react";


// Travel Detail Modal
const TravelModal = ({ spot, onClose }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const prevImg = () => setImgIndex((i) => (i - 1 + spot.images.length) % spot.images.length);
  const nextImg = () => setImgIndex((i) => (i + 1) % spot.images.length);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((i) => (i + 1) % spot.images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [spot.images.length]);

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          style={styles.closeBtn} className="closeBtn"
          onClick={onClose}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "none";
            e.target.style.transform = "scale(1)";
          }}
        >
          <X size={24} />
        </button>

        <div style={styles.modalBody} className="modal-body">
          <div style={styles.modalLeft} className="modal-left">
            <h2 style={{ fontSize: "2rem", marginBottom: "12px", color: "#38b2ac", fontWeight: "700" }} className="modal-title">{spot.title}</h2>
            <p style={styles.modalTag} className="modalTag">{spot.type} • {spot.people}</p>

            <div style={styles.modalContentScroll} className="modal-content-scroll">
              {spot.details.map((para, i) => (
                <p key={i} style={{ marginBottom: "18px", lineHeight: "1.7", color: "#b8c9d9", fontSize: "1rem" }} className="modal-paragraph">{para}</p>
              ))}

              {spot.itinerary && (
                <div style={styles.itinerarySection}>
                  <h3 style={{ color: "#38b2ac", marginBottom: "12px", fontSize: "1.1rem", fontWeight: "600" }}>📍 Itinerary</h3>
                  <a
                    href={spot.itinerary}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.itineraryLink}
                    onMouseEnter={(e) => e.target.style.color = "#2a9d8f"}
                    onMouseLeave={(e) => e.target.style.color = "#38b2ac"}
                  >
                    View Full Itinerary →
                  </a>
                </div>
              )}
            </div>
          </div>

          <div style={styles.modalRight} className="modal-right">
            <div style={styles.modalCarousel} className="modal-carousel">
              <button
                style={{ ...styles.carouselBtn, left: "10px" }}
                onClick={prevImg}
                onMouseEnter={(e) => e.target.style.background = "rgba(42, 157, 143, 0.8)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(0,0,0,0.5)"}
              >
                <ChevronLeft size={24} />
              </button>
              {/* console.log("Modal showing image:", spot.title, imgIndex, spot.images[imgIndex]); */}
              <img src={spot.images[imgIndex]} alt="travel moment" style={styles.modalCarouselImg} />
              <button
                style={{ ...styles.carouselBtn, right: "10px" }}
                onClick={nextImg}
                onMouseEnter={(e) => e.target.style.background = "rgba(42, 157, 143, 0.8)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(0,0,0,0.5)"}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div style={styles.carouselDots} className="carousel-dots">
              {spot.images.map((_, i) => (
                <div
                  key={i}
                  style={{ ...styles.dot, ...(i === imgIndex ? styles.dotActive : {}) }}
                  onClick={() => setImgIndex(i)}
                  onMouseEnter={(e) => {
                    if (i !== imgIndex) e.target.style.background = "rgba(56, 178, 172, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    if (i !== imgIndex) e.target.style.background = "rgba(255, 255, 255, 0.3)";
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to import and sort images numerical


// Auto-import all images from a folder
// const importAll = (r) => r.keys().map(r);
const importAll = (r) => r.keys().sort().map(r); 
// sort() keeps them in img1, img2, img3 order

const gokarnaImages = importAll(
  require.context("../assets/Travel/Gokarna", false, /\.(png|jpe?g|jpg|JPG|JPEG|heic|HEIC)$/)
);

const meghalayaImages = importAll(
  require.context("../assets/Travel/Meghalaya", false, /\.(png|jpe?g|jpg|JPG|JPEG|heic|HEIC)$/)
);

const sikkimImages = importAll(
  require.context("../assets/Travel/Sikkim", false, /\.(png|jpe?g|jpg|JPG|JPEG|heic|HEIC)$/)
);

const hampiImages = importAll(
  require.context("../assets/Travel/Hampi", false, /\.(png|jpe?g|jpg|JPG|JPEG|heic|HEIC)$/)
);

const mathuraImages = importAll(
  require.context("../assets/Travel/Mathura", false, /\.(png|jpe?g|jpg|JPG|JPEG|heic|HEIC)$/)
);

const goaImages = importAll(
  require.context("../assets/Travel/Goa", false, /\.(png|jpe?g|jpg|JPG|JPEG|heic|HEIC)$/)
);





// Travel Data
const travelSpots = [
  {
    title: "Sikkim – Himalayas Adventure",
    type: "Organized Trip",
    people: "Led a group of 15",
    itinerary: null,
    images: sikkimImages,
    details: [
      "Our journey to Sikkim was an unforgettable experience at extreme altitudes. Leading a group of 15 people through the majestic Himalayas required careful planning and coordination.",
      "We encountered breathtaking snow peaks, pristine mountain lakes, and lush valleys. The weather was challenging, but the team spirit kept everyone motivated throughout the trek.",
      "Managing accommodation in remote areas and ensuring everyone's safety was a priority. We trekked through multiple passes and witnessed the sunrise from one of the highest points.",
      "The locals shared their rich culture and traditions with us. We experienced authentic Sikkimese cuisine and learned about the region's unique biodiversity.",
      "This trip taught me the importance of leadership, quick decision-making, and how to inspire a group in challenging terrains. The memories of snow-capped peaks will remain forever."
    ]
  },
  {
    title: "Meghalaya – Abode of Clouds",
    type: "Organized Trip",
    people: "Led a group of 20",
    itinerary: "https://drive.google.com/file/d/1FQOJjSSzFRYTB0jJKMP-fH5CN55q1vEC/view?usp=sharing",
    images: meghalayaImages,
    details: [
      "Meghalaya, the wettest place on Earth, offered us stunning landscapes and thrilling adventures. With a group of 20 explorers, we ventured through mist-covered mountains and pristine forests.",
      "We explored the famous Mawsmai Caves with their unique stalagmites and stalactites formations. The underground rivers and chambers were a marvel of natural engineering.",
      "Cherrapunji and Sohra offered us breathtaking waterfall views. We stood under the cascading waters of Living Root Bridges, witnessing centuries-old natural structures.",
      "Safety coordination was crucial with such a large group. We had proper guides, safety equipment, and regular check-ins to ensure everyone enjoyed while staying secure.",
      "The trip concluded with a bonfire under the stars, where everyone shared their favorite moments. This experience reinforced my belief in sustainable tourism and group management."
    ]
  },
  {
    title: "Hampi – Historic Adventure",
    type: "Friends Trip",
    people: "Group of 6",
    itinerary: null,
    images: hampiImages,
    details: [
      "Hampi, a UNESCO World Heritage Site, took us back in time with its magnificent temple architecture. The Vijayanagara Empire's remnants were scattered across the landscape, each with a story.",
      "We explored the Krishna Temple, Achyutaraya Temple, and countless ruins spread across the rocky terrain. Our small group of 6 made it easy to explore at our own pace.",
      "The sunrise at Hemakuta Hills was magical, casting golden hues on the ancient stones. We spent hours capturing the beauty through photography and sketching.",
      "The local market offered us authentic South Indian cuisine and handicrafts. We interacted with villagers who shared fascinating stories about the historical significance of each monument.",
      "The boulder-strewn landscape and vibrant sunsets created unforgettable memories. This trip inspired a deep appreciation for India's historical heritage and architectural excellence."
    ]
  },
  {
    title: "Goa – Beach Escape",
    type: "Friends Trip",
    people: "Group of 7",
    itinerary: null,
    images: goaImages,
    details: [
      "Goa welcomed us with its golden beaches and vibrant culture. Our group of 7 friends was ready for adventure, relaxation, and unforgettable moments.",
      "We hopped between Baga, Anjuna, and Palolem beaches, each offering unique experiences. Water sports like parasailing and jet skiing added thrill to our days.",
      "The sunset sessions at the beach were therapeutic, with coconut drinks and conversations that lasted till the stars came out. We danced on the beach under moonlight.",
      "The Portuguese influence was evident in the architecture, cuisine, and culture. We savored delicious seafood and explored colonial-era forts like Aguada and Chapora.",
      "The vibrant nightlife, beach parties, and bonfire nights created memories that we still cherish. Goa truly lived up to its reputation as a paradise destination."
    ]
  },
  {
    title: "Mathura – Spiritual Journey",
    type: "Friends Trip",
    people: "Group of 5",
    itinerary: null,
    images: mathuraImages,
    details: [
      "Mathura, the birthplace of Lord Krishna, resonated with spiritual energy. Our group of 5 connected deeply with the sacred atmosphere and rich Hindu traditions.",
      "We visited the Krishna Janmasthan Temple and participated in the evening aarti at the ghats. The devotion and chanting created a transcendent experience.",
      "Vrindavan, just nearby, offered us enchanting temples and the serene Banke Bihari Temple. We walked through the lanes where Lord Krishna is believed to have spent his childhood.",
      "The Ras Leela performances and spiritual talks by monks deepened our understanding of Hindu philosophy and devotion. We spent hours in meditation by the Yamuna River.",
      "This spiritual journey changed our perspective and brought us closer as a group. We returned with inner peace and renewed faith in humanity."
    ]
  },
  {
    title: "Gokarna – Peaceful Coastal Side",
    type: "Friends Trip",
    people: "Group of 4",
    itinerary: null,
    images: gokarnaImages,
    details: [
      "Gokarna, a hidden gem on the Karnataka coast, offered us tranquility away from tourist crowds. Our intimate group of 4 felt connected to nature in this peaceful haven.",
      "We discovered hidden beaches accessible only by trekking through narrow forest paths. Each beach had its own charm and pristine beauty.",
      "The cliff-top views during sunset were breathtaking, with waves crashing against the rocks below. We spent evenings watching the sun melt into the ocean.",
      "The local shacks served us authentic coastal cuisine while we shared stories and philosophies. The simplicity of life here was refreshing and rejuvenating.",
      "This trip taught us the value of slowing down and appreciating small moments. Gokarna will always hold a special place in our hearts."
    ]
  }
];


//Artwork Carousel Component
// Auto-import all Art images (img1.jpg, img2.jpg, ...)
// const importArt = (r) => r.keys().map(r);
const importAndSort = (context) => {
  return context
    .keys()
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || 0);
      const numB = parseInt(b.match(/\d+/)?.[0] || 0);
      return numA - numB;
    })
    .map(context);
};


const artImages = importAndSort(require.context("../assets/Art", false, /\.(png|jpe?g|jpg)$/), "Art");




// Artwork Data
const artworks = artImages;


// Art Carousel
const ArtCarousel = ({ artworks }) => {
  const [index, setIndex] = useState(0);
  const itemsPerView = 6;
  const totalPages = Math.ceil(artworks.length / itemsPerView);

  const prev = () => setIndex((i) => (i - 1 + totalPages) % totalPages);
  const next = () => setIndex((i) => (i + 1) % totalPages);

  const startIdx = index * itemsPerView;
  const currentArtworks = artworks.slice(startIdx, startIdx + itemsPerView);

  return (
    <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
      <button
        style={styles.artLeftBtn} className="art-left-btn"
        onClick={prev}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(42, 157, 143, 0.8)";
          e.target.style.transform = "scale(1.15)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(56, 178, 172, 0.25)";
          e.target.style.transform = "scale(1)";
        }}
      >
        <ChevronLeft size={28} />
      </button>

      <div style={styles.artCarouselContainer} className="art-carousel-container">
        <div style={styles.artGrid} className="art-grid">
          {currentArtworks.slice(0, 3).map((art, i) => (
            <div
              key={i}
              style={styles.artCard} className="art-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0, 0, 0, 0.5), 0 6px 16px rgba(42, 157, 143, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0, 0, 0, 0.35), 0 3px 10px rgba(42, 157, 143, 0.2)";
              }}
            >
              <img
                src={art}
                alt=""
                style={{
                  width: "100%",                  
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
          ))}

        </div>

        <div style={styles.artGrid} className="art-grid">
          {currentArtworks.slice(3, 6).map((art, i) => (
            <div
              key={i}
              style={styles.artCard} className="art-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0, 0, 0, 0.5), 0 6px 16px rgba(42, 157, 143, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0, 0, 0, 0.35), 0 3px 10px rgba(42, 157, 143, 0.2)";
              }}
            >
              <img
                src={art}
                alt=""
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
          ))}

        </div>
      </div>

      <button
        style={styles.artRightBtn} className="art-right-btn"
        onClick={next}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(42, 157, 143, 0.8)";
          e.target.style.transform = "scale(1.15)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(56, 178, 172, 0.25)";
          e.target.style.transform = "scale(1)";
        }}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default function FeedSection() {
  const [selectedTravel, setSelectedTravel] = useState(null);

  return (
    <>
    <section style={styles.section } className="feed-section">
      <h2 style={styles.title} className="title">✨ My Feed</h2>
      <p style={styles.subtitle} className="subtitle">A glimpse into my journeys, adventures & artistic world.</p>

      <h3 style={styles.heading} className="heading">
        <MapPin size={22} style={{ marginRight: "10px" }} /> Travel Diaries
      </h3>

      <div style={styles.travelGrid} className="travel-grid">
        {travelSpots.map((spot, i) => (
          <div
            key={i}
            style={styles.travelCard}
            onClick={() => setSelectedTravel(spot)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.6), 0 8px 20px rgba(42, 157, 143, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(42, 157, 143, 0.3)";
            }}
          >
            <img
              src={spot.images[0]}
              alt={spot.title}
              style={{
                width: "100%",
                height: "170px",
                objectFit: "cover",
                borderRadius: "16px 16px 0 0"
              }}
            />

            <h3 style={styles.travelTitle} className="travel-title">{spot.title}</h3>
            {spot.type === "Organized Trip" && (
              <p style={styles.travelMeta} className="travel-meta">{spot.type} • {spot.people}</p>
            )}
          </div>
        ))}
      </div>

      <h3 style={styles.heading}>
        <Palette size={22} style={{ marginRight: "10px" }} /> My Artwork & Murals
      </h3>
      <ArtCarousel artworks={artworks} />

      {selectedTravel && (
        <TravelModal spot={selectedTravel} onClose={() => setSelectedTravel(null)} />
      )}
    </section>

    <style>
{`
  @media (max-width: 1024px) {
    .feed-section {
      padding: 60px 40px !important;
    }
    .travel-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 28px !important;
    }
  }

  @media (max-width: 768px) {
    .feed-section {
      padding: 50px 30px !important;
    }
    .travel-grid {
      grid-template-columns: 1fr !important;
      gap: 25px !important;
    }
    .art-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .modal-body {
      flex-direction: column !important;
    }
    .modal-carousel {
      height: 260px !important;
    }
  }

  @media (max-width: 480px) {
  /* Modal overall */
  .modal-content {
    height: 90vh !important;
    padding: 0 !important;
  }

  .modal-body {
    padding: 0 !important;
    margin: 0 !important;
    flex-direction: column !important;
  }

  /* LEFT SIDE (Text) */
  .modal-left {
    padding: 18px !important;    /* reduce big padding */
    max-height: 32vh !important; /* prevent it from overflowing */
  }

  .modal-left h2 {
    font-size: 1.2rem !important;
    line-height: 1.3;
    margin-bottom: 10px !important;
  }

  .modalTag {
    font-size: 0.8rem !important;
    margin-bottom: 12px !important;
  }

  .modalContentScroll p {
    font-size: 0.35rem !important;
    line-height: 1.4 !important;
    margin-bottom: 10px !important;
  }

  /* RIGHT SIDE (Carousel) */
  .modal-right {
    padding: 12px !important;
    width: 100% !important;
  }

  .modal-carousel {
    height: 220px !important; /* reduced from 400 / 320 etc */
    border-radius: 10px !important;
  }

  /* Carousel buttons */
  .carouselBtn, 
  .carousel-btn {
    height: 34px !important;
    width: 34px !important;
    padding: 4px !important;
  }

  /* Dots */
  .carousel-dots {
    margin-top: 10px !important;
    gap: 6px !important;
  }

  .dot {
    width: 6px !important;
    height: 6px !important;
  }

  .dotActive {
    width: 16px !important;
    height: 6px !important;
  }

  /* Close button */
  .closeBtn {
    top: 12px !important;
    right: 12px !important;
  }
    .art-carousel-container {
    max-width: 100% !important;
    gap: 14px !important;
  }

  /* 1 card per row for small screens */
  .art-grid {
    grid-template-columns: 1fr !important;
    gap: 14px !important;
    width: 100% !important;
  }

  /* Art card styling */
  .art-card {
    height: auto !important;
    border-radius: 12px !important;
    overflow: hidden !important;
  }

  /* Art images */
  .art-card img {
    height: 160px !important;
    object-fit: cover !important;
    border-radius: 10px !important;
  }

  /* Carousel arrows */
  .art-left-btn,
  .art-right-btn {
    height: 36px !important;
    width: 36px !important;
    padding: 6px !important;
    border-radius: 10px !important;
  }
}





`}
</style>
    </>
  );
}


const styles = {
  section: {
    padding: "80px 120px",
    background: "linear-gradient(135deg, #0d1b2a 0%, #0d1b2a 50%, #1e3a3a 100%)",
    color: "#e0fbfc",
    fontFamily: "poppins, sans-serif",
    minHeight: "100vh"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "15px",
    color: "#38b2ac",
    textAlign: "center",
    letterSpacing: "0.5px"
  },
  subtitle: {
    fontSize: "1rem",
    color: "#a9bcd0",
    textAlign: "center",
    marginBottom: "60px",
    fontWeight: "400"
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: "700",
    marginTop: "70px",
    marginBottom: "35px",
    display: "flex",
    alignItems: "center",
    color: "#38b2ac",
    letterSpacing: "0.3px"
  },
  travelGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "35px",
    marginBottom: "60px"
  },
  travelCard: {
    background: "linear-gradient(135deg, rgba(42, 157, 143, 0.18) 0%, rgba(56, 178, 172, 0.12) 100%)",
    borderRadius: "16px",
    padding: "0",
    paddingBottom: "20px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(42, 157, 143, 0.4)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(42, 157, 143, 0.3)",
    cursor: "pointer"
  },
  travelTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    margin: "17px 20px 10px 20px",
    color: "#e0fbfc",
    letterSpacing: "0.3px"
  },
  travelMeta: {
    fontSize: "0.85rem",
    color: "#38b2ac",
    margin: "0 20px 0 20px",
    fontWeight: "500"
  },
  carousel: {
    position: "relative",
    width: "100%",
    height: "170px",
    borderRadius: "16px 16px 0 0",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    background: "#0d1b2a"
  },
  carouselImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  carouselBtn: {
    position: "absolute",
    background: "rgba(56, 178, 172, 0.25)",
    border: "1px solid rgba(56, 178, 172, 0.5)",
    color: "#e0fbfc",
    padding: "12px",
    cursor: "pointer",
    zIndex: 10,
    borderRadius: "12px",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    width: "50px",
    backdropFilter: "blur(10px)",
    top: "50%",
    transform: "translateY(-50%)"
  },
  artGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "19.2px",
    width: "100%"
  },
  artCarouselContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    maxWidth: "900px"
  },
  artCard: {
    borderRadius: "12px",
    overflow: "hidden",
    background: "linear-gradient(135deg, rgba(42, 157, 143, 0.15) 0%, rgba(56, 178, 172, 0.1) 100%)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid rgba(42, 157, 143, 0.3)",
    cursor: "pointer",
    backdropFilter: "blur(15px)",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(42, 157, 143, 0.2)"
  },
  artLeftBtn: {
    position: "relative",
    background: "rgba(56, 178, 172, 0.25)",
    border: "1px solid rgba(56, 178, 172, 0.5)",
    color: "#e0fbfc",
    padding: "12px",
    cursor: "pointer",
    zIndex: 10,
    borderRadius: "12px",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    width: "50px",
    backdropFilter: "blur(10px)",
    flexShrink: 0
  },
  artRightBtn: {
    position: "relative",
    background: "rgba(56, 178, 172, 0.25)",
    border: "1px solid rgba(56, 178, 172, 0.5)",
    color: "#e0fbfc",
    padding: "12px",
    cursor: "pointer",
    zIndex: 10,
    borderRadius: "12px",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    width: "50px",
    backdropFilter: "blur(10px)",
    flexShrink: 0
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    backdropFilter: "blur(8px)"
  },
  modalContent: {
    background: "linear-gradient(135deg, #0d1b2a 0%, #1e3a3a 100%)",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "1300px",
    height: "85vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    border: "1px solid rgba(42, 157, 143, 0.4)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)"
  },
  modalBody: {
    display: "flex",
    flex: 1,
    overflow: "hidden"
  },
  modalLeft: {
    flex: 1,
    padding: "40px",
    overflowY: "auto",
    borderRight: "1px solid rgba(42, 157, 143, 0.3)"
  },
  modalContentScroll: {
    marginTop: "25px"
  },
  modalRight: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  modalCarousel: {
    position: "relative",
    width: "100%",
    height: "400px",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)"
  },
  modalCarouselImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  carouselDots: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px"
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.3)",
    cursor: "pointer",
    transition: "all 0.3s"
  },
  dotActive: {
    background: "#38b2ac",
    width: "28px",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(56, 178, 172, 0.5)"
  },
  modalTag: {
    fontSize: "1rem",
    color: "#38b2ac",
    marginBottom: "25px",
    fontWeight: "600"
  },
  itinerarySection: {
    marginTop: "30px",
    padding: "20px",
    background: "rgba(42, 157, 143, 0.15)",
    borderRadius: "10px",
    border: "1px solid rgba(42, 157, 143, 0.3)",
    backdropFilter: "blur(10px)"
  },
  itineraryLink: {
    color: "#38b2ac",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "1.05rem",
    transition: "all 0.3s"
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "none",
    border: "none",
    color: "#e0fbfc",
    cursor: "pointer",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    borderRadius: "8px",
    transition: "all 0.3s"
  }
};

