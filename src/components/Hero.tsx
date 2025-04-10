import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slideImages = [
  { url: "/hero_banner_one.webp" },
  { url: "/hero_banner_two.webp" },
];

const Hero = () => {
  const properties = {
    duration: 4000,
    transitionDuration: 500,
    autoplay: true,
    infinite: true,
    easing: "ease",
    arrows: true,
    prevArrow: (
      <button className="ml-4 p-2 bg-white/60 rounded-full hover:bg-white">
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>
    ),
    nextArrow: (
      <button className="mr-4 p-2 bg-white/60 rounded-full hover:bg-white">
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
    ),
  };

  return (
    <div className="slide-container relative">
      <Slide {...properties}>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              className="w-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${slideImage.url})`,
                height: "100vh",
              }}
            >
              <style>{`
                @media (max-width: 767px) {
                  .slide-container div > div {
                    height: 40vh !important;
                  }
                }
              `}</style>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Hero;
