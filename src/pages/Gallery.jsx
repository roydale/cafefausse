import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Quote, Award, X } from "lucide-react";
import galleryInterior from "@/assets/gallery-interior.jpg";
import gallerySalmon from "@/assets/gallery-salmon.jpg";
import gallerySteak from "@/assets/gallery-steak.jpg";
import galleryDessert from "@/assets/gallery-dessert.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: galleryInterior, alt: "Elegant restaurant interior with burgundy decor" },
    { src: gallerySalmon, alt: "Grilled salmon with lemon butter sauce" },
    { src: gallerySteak, alt: "Perfectly cooked ribeye steak" },
    { src: galleryDessert, alt: "Classic Italian tiramisu" },
  ];

  const awards = [
    { title: "Culinary Excellence Award", year: "2022" },
    { title: "Restaurant of the Year", year: "2023" },
    { title: "Best Fine Dining Experience", subtitle: "Foodie Magazine", year: "2023" },
  ];

  const reviews = [
    {
      text: "Exceptional ambiance and unforgettable flavors.",
      source: "Gourmet Review",
    },
    {
      text: "A must-visit restaurant for food enthusiasts.",
      source: "The Daily Bite",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:6xl font-hedvig font-normal text-primary mb-4">Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the ambiance and artistry of Café Fausse through our curated collection
            </p>
          </div>

          {/* Image Gallery */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-hedvig font-normal text-primary mb-8">Our Space & Cuisine</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group shadow-soft hover:elegant transition-smooth"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Awards Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-hedvig font-normal text-primary mb-8 text-center">Awards & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <Card key={index} className="p-6 text-center shadow-soft hover:elegant transition-smooth">
                  <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                  {award.subtitle && <p className="text-sm text-muted-foreground mb-2">{award.subtitle}</p>}
                  <p className="text-accent font-semibold">{award.year}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-hedvig font-normal text-primary mb-8 text-center">What Critics Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <Card key={index} className="p-8 shadow-soft hover:elegant transition-smooth">
                  <Quote className="w-10 h-10 text-accent mb-4" />
                  <p className="text-lg mb-4 italic">{review.text}</p>
                  <p className="text-sm font-semibold text-muted-foreground">— {review.source}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
