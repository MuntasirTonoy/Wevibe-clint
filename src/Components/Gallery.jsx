import React from "react";
import Marquee from "react-fast-marquee";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Beach cleanup",
  },
  {
    src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Food donation",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Tree planting",
  },
  {
    src: "https://images.unsplash.com/photo-1617450365226-9bf28c04e130?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Education volunteer",
  },
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Community garden",
  },
  {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2513&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Helping elderly",
  },
  {
    src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Library volunteer",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Habitat restoration",
  },
];

const Gallery = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Impact Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See the difference our volunteers are making in communities around
            the country.
          </p>
        </div>

        <Marquee
          gradient={false}
          speed={110}
          pauseOnHover={true}
          direction="left"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative w-64 h-40 md:w-80 md:h-52 mx-2 rounded-lg overflow-hidden flex-shrink-0"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Gallery;
